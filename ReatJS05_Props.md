# Les props

Que l'on définisse un composant avec une classe ou une fonction, les props sont en **lecture seule**.

La philosophie des développeurs de Facebook a imposée cette rigueur au niveau de ces valeurs. Les props s'écoulent du haut vers le bas et une fois entrées dans un composant depuis un parent ne peuvent être changées par l'enfant. C'est pour cela qu'on dit qu'une props est en **LECTURE SEULE** dans un composant donné.

![props top/down](./images/props.png)

Les props peuvent se définir dans les attributs des composants sous forme de clés/valeurs :

```jsx
<Hello name="Alan" />
```

Elles seront récupérées dans les arguments de la fonction du composant :

```jsx
const Hello = (props) => {
  props.name = "Mutation"; // ❌ Erreur: Lecture seule !

  return <h1>Hello, {props.name}</h1>;
}
```

> **Note**
> Vous pouvez également définir un composant avec une classe ES6. La classe devra étendre `React.Component`. Le nom de la classe est le nom du composant. Là encore les props sont en **lecture seule**
> ```jsx
> class HelloReact extends React.Component {
>   // on récupère la props en lecture depuis l'objet (composant) HelloReact
>   // ❌ ON NE PEUT TOUJOURS PAS MODIFIER LA PROPS this.props.name = "Sophie" 
>   render() {
>       return (
>          <p>{this.props.name}</p>
>       );
>   }
> }
> 
> ReactDOM.createRoot(document.getElementById('root')).render(
>     // attribut cle/valeur == props
>     <HelloReact name="Hello React" />
> );
> ```

Par la suite nous utiliserons plutôt des **fonctions** pour créer des composants.

## 01 Exercice message

Définissez une constante `messages` dans le composant App, qui contiendra des messages, puis créez un composant `<Messages />` (au pluriel) et un autre composant `<Message />` (au singulier) qui affichera les messages se trouvant dans la constante.

Récupérez les messages dans la constante suivantes :

```js
const MESSAGES = [
    { message : "React JS" },
    { message : "React Native" },
    { message : "Angular" },
    { message : "Symfony" },
    { message : "MongoDB" },
];
```

Vous pouvez en effet avoir un composant dans un composant. Les composants de React sont déclaratifs comme les balises HTML.

### Hiérarchie des compostans

```jsx
<App />
└── <Messages />
    ├── <Message />
    ├── <Message />
    └── <Message />
```

**Indications** : créez trois fonctions de composant dans le même fichier.
Utilisez la base du chapitre précédent pour commencer.
Et n'oubliez pas d'utiliser `.map()` pour parcourir les messages et les afficher.

## 02 Exercice average

Faites cet exercice dans un fichier `index_students_avg.html`

Soient les données suivantes :

```js
const students = [
  { notes: [12, 11, 10], name: "Alan" },
  { notes: [18, 10, 19], name: "Alice" },
  { notes: [10, 9, 11], name: "Bernard" },
  { notes: [11, 17, 19], name: "Sophie" },
];
```

Créez deux composants et affichez pour chaque étudiant son nom et sa moyenne dans une liste ul/li.

### Hiérarchie des compostans

```jsx
<App />
├── <Student />
├── <Student />
├── <Student />
└── <Student />
```

## 03 Data fruits

Faites cet exercice dans un fichier `index_fruits.html`

Soient les données suivantes :

```js
const products = [
  { prices: [1.2, 1.1, 1.0], name: "apples" },
  { prices: [1.8, 1.0, 1.9], name: "oranges" },
  { prices: [1.0, 0.9, 1.1], name: "bananas" },
];
```

1. Affichez l'ensemble des prix de chaque fruit.

2. Faites la moyenne des prix des fruits, arrondi à une décimale après la virgule.

Structure du résultat souhaité :

```txt
apples
  prices :
    1.2
    1.1
    1.0
  average : 1.1

oranges
  prices :
    1.8
    1.0
    1.9
  average :  1.6

…
```

## 04 Exercice Clock

Faites cet exercice dans un fichier `index_horloge_clock.html`

Définir un composant `<Clock />` et essayez d'implémenter une horologe. Faites en sorte que dans le DOM l'horloge se mette à jour et affiche les secondes, minutes et heures qui passent.

Remarques : vous pouvez utiliser un `setInterval` JavaScript pour re-lancer le rendu manuellement. Exemple :

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));

// React va re-render le composant <Clock /> dans #root toute les secondes
setInterval(() => root.render(<Clock />) , 1000);
```

Résultat souhaité (avec un affichage dynamique) :

```txt
  10h 25m 30s
```
