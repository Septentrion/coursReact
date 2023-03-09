# React JSX

JSX est une syntaxe facilitant l'écriture du code des composants, il sécurise également l'affichage des valeurs en échappant tous les caractères spéciaux (attaque XSS).

On utilise la casse **camelCase** en JSX.

```jsx
const el = <div className="main">Main</div>;
```

## Exemple de JSX

En JSX on écrit :

```jsx
const el = (
  <h1 className="main">
    Hello, world!
  </h1>
);
```

En JS pur on écrirait :

```js
const el = React.createElement(
  'h1',
  { className: 'main' },
  'Hello, world!'
);
```

Tous les développements par la suite se feront en JSX dans ce cours.

La syntaxe JSX nécessite un compilateur (ici, nous choisiron **[Babel](https://babeljs.io/)**) que nous importons directement dans le fichier `index.html` pour compiler le code JSX en JS compréhensible par votre navigateur.

Avec les navigateurs modernes le code JSX sera théoriquement correctement compilé.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Hello React</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- babel => compilation du JSX -->
    <script src="https://unpkg.com/babel-standalone@latest/babel.min.js"></script>
    <style>
        .heading{
            color: purple;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // Component
        const Hello = (props) => {
            return (
                <div className="heading" >
                    <h1>{props.message}</h1>
                    <p>{props.subtitle}</p>
                </div>
            )
        }

        // Rendu dans le DOM
        ReactDOM.createRoot(document.getElementById('root')).render(
            <Hello message="Hello React" subtitle="Enjoy !" />
        );
    </script>
</body>
</html>
```

Une autre manière en version classe et non fonctionnelle comme ci-dessus

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Hello React</title>
    <!-- Library -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>

    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- babel => compilation du JSX -->
    <script src="https://unpkg.com/babel-standalone@latest/babel.min.js"></script>
    <style>
        .heading {
            color: purple;
        }
    </style>
</head>

<body>
    <div id="root"></div>

    <script type="text/babel">
        // Création de composant en créant des classes
        class Hello extends React.Component {
            render() {
                // lecture seule pour les props
               // this.props.message = "Hello Angular";
                
                return (
                    <div className="heading" >
                        <h1>{this.props.message}</h1>
                        <p>{this.props.subtitle}</p>
                    </div>
                )
            }
        }

        // Rendu dans le DOM
        ReactDOM.createRoot(document.getElementById('root')).render(
            <Hello message="Hello React" subtitle="Enjoy !" />
        );
    </script>
</body>

</html>
```

## Attributs

Ils s'écrivent soit dans des cotes simples ou doubles lorsqu'on a des chaîne de caractères comme valeur ou bien des accolades lorsqu'on a une expression en JS :

```jsx
const el1 = <div className="main">Main</div>;

const myClass = { backgroundColor : 'red', color : 'blue', marginTop: 5 };

const el2 = <div style={myClass}>Main</div>;
```

## Les balises enfants

Attention vous devez toujours mettre un div wrapper pour déclarer des éléments enfants, il faut se rappeler que la syntaxe JSX est du JS. Nous verrons ultérieurement que ces div parfois inutiles seront remplacées par du code React que l'on appelle des fragments.

```jsx
const el3 = (
  <div>
    <h1>Bonjour !</h1>
    <h2>Le Monde.</h2>
  </div>
);
```

## Attaque XSS

La syntaxe JSX permet de se protéger des injections XSS, les caractères spéciaux seront échapés. Voyez l'exemple ci-dessous :

```jsx
const content = <script>alert('xss')</script>;
// Ceci est sans risque :
const el4 = <h1>{content}</h1>;
```

## Parcourir un tableau JS

Pour parcourir un tableau JS dans le rendu de votre composant vous ne pourrez utiliser que la méthode map sur celui-ci. De plus chaque élément a besoin d'une clé unique pour être identifié par React dans le DOM. La clé key est donc un mot réservé dans la librairie React, elle ne peut être récupérée :

```jsx

 // Component
const Hello = () => {
    const elems = ['a', 'b', 'c', 'd' ];
    return (
        <div className="heading" >
            {elems.map((elem, i) => {
                return (
                    <p key={i}>{elem}</p>
                )
            })}
        </div>
    )
}
```

## 01 Exercice

Créez deux composants :
1. Le premier est un conteneur qui structure l'affichage.
2. Le deuxième composant affichera les nombres suivants élevés à la puissance 3.
    
> Pour rappel, l'opérateur de puissance en JavaScript est le `**`
> **Exemple :**
> ```js
> const n = 15;
> const n3 = n ** 3; // 3375
> ```

Voyez la structure des composants ci-dessous dans le schéma.

```text
Wrapper
├── Number : devra afficher "256" (4**3)
├── Number : devra afficher "27" (3**3)
└── Number : devra afficher "823543" (7**7)
```

Récupérez le tableau numbers ci-après :

```js
// Valeurs à élever à la puissance 3 
const numbers = [ 4, 3, 7 ];
```

> **Note** : Reprenez le fichier `index.html` vu précédemment comme base pour réaliser cet exercice.

## React dépend de deux structures de données importantes

React dépend des collections **Map** et **Set** en JS. Ces collections sont basées sur un système de clé/valeur, elles sont utilisées pour des questions d'accès à des valeurs et d'optimisation. Un Set n'a pas de doublon possible par exemple. Et une Map est une structure de données construite avec un système de clé/valeur.
