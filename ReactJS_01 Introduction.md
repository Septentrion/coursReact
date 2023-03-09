# Introduction

## Notion de composant

La notion de composant web fait maintenant partie intégrante des API de HTML, à l'instar du **DOM fantôme** (_shadow DOM_) des _templates_ et des _slots_.

[Référence](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

Les composant permettent de créer ses propres éléments étendant HTML 5.

Les points importants d'un composant web sont :
1. Le nouveau composant hérite d'un élément HTML déjà existant
2. Il doit implémenter un constructeur
3. Ce constructeur doit faire appel au constructeur du parent
4. La structure du composant sera sauvegardée dans un DOM fantôme
5. Il faut définir le nom de l'élément correspondant au composant

Admettons que nous voulions définir un élément `Hello`, qui affiche "**Hello !**".
Ce nouvel élément hérite de l'objet générique `HTMLElement`.

```js
class Hello extends HTMLElement
{
  constructor()
  {
    // 1. En premier lieu, appeler le constructeur de l'objet parent
    super();

    // 2. Création d'un DOM fantôme
    const shadow = this.attachShadow({mode: 'open'});

    // 3. Création de la structure HTML à afficher
    const div = document.createElement('div');
    div.innerHTML = "Hello";
    const style = document.createElement('style');

    // 4. Attacher la structure au DOM fantôme
    shadow.appendChild(style);
    shadow.appendChild(div);
  }
}
```
Nous devons ensuite déclarer le nouvel élément :
```js
customElements.define('app-hello', Hello);
```
Puis l'utiliser dans une page HTML :
```html
<header>
  <app-hello />
</header>
```
Tous les éléments HTML peuvent être utilisés. Ici, par exemple, nous utilisons un élément `style` pour créer une des styles internes. Cependant, nous pourrions tout aussi bien utiliser `link` pour importer une feuille de style externe, depuis un URL connu.

### Attributs

Naturellement, nous pouvons appliquer toutes les méthodes disponibles pour les éléments HTML. Nous pourrions par exemple personnaliser le salut :
```js
/* ... */
// 3. Création de la structure HTML à afficher
const div = document.createElement('div');
let name = (this.hasAttribute('name')) ? this.getAttribute('name') : 'boy';
div.innerHTML = `Hello`;
const style = document.createElement('style');
/* ... */
```
Et maintenant :
```html
<header>
  <app-hello name="Arthur" />
</header>
```

### Cycle de vie

Un élément à un cycle de vie qui comporte quatre étapes, qui correspondent à quatre méthodes :

|  |  |
|---|---|
| 1. S'attacher au DOM | `connectCallback` |
| 2. Voir ses attributs changer | `attributeChangedCallback` |
| 3. Se déplacer dans un autre document | `adoptedCallback` |
| 4. Se détacher du DOM | `disconnectCallback` |

Ces méthodes sont en particulier exécutées en relation avec des événements JS. `connectCallback` n'est pas exécutée si l'élément est présent dans la page au chargement.

#### attributeChangedCallback

Le composant a besoin d'une liste des attributs à surveiller pour que la méthode fonctionne. Dans le cas de notre composant `Hello`, si nous voulions actualiser l'affichage en cas de changement du nom, nous devrions ajouter dans la classe :
```js
static get observedAttributes() {
  return ['name'];
}

attributeChangedCallback(name, oldValue, newValue) {
  console.log('Custom square element attributes changed.');
  this.updateName(newValue);
}

updateName(value) {
  let shadow = this.shadowRoot;
  let element = shadow.querySelector('div');
  element.innerHTML = value;
}
```

## Etendre un élément HTML5

Admettons que nous voulions créer un élément étendant un paragraphe (`<p>`) pour compter les mots d'un texte contenu dans un autre élément :

```javascript
// On crée une class pour le nouvel élément
class WordCount extends HTMLParagraphElement {
  constructor() {

    // Appel de la classe mère
    super();

    // Une fonction utilitaire pour compter les mots d'un texte
    // (un paragraphe HTML par exemple)
    function countWords(node){
      const text = node.innerText || node.textContent;
      return text.trim().split(/\s+/g).filter(a => a.trim().length > 0).length;
    }

    // Comptage des mots de l'élément parent
    const wcParent = this.parentNode;

    // Création d'un DOM fantôme
    const shadow = this.attachShadow({mode: 'open'});

    // Création de la structure HTML à afficher
    const text = document.createElement('span');
    text.textContent =  `Words: ${countWords(wcParent)}`;

    // Enregistrement dans le DOM fantôme
    shadow.appendChild(text);
  }
}

// Définition du nouvel élément
customElements.define('word-count', WordCount, { extends: 'p' });

// Utilisation
<article>
  <p>Longtemps, je me suis couché de bonne heure</p>
  <p is='word-count'></p>
</article>
```
