# Base des composants ReactJS

> **Note** Nous su^pposerons maintenant que nous avons installé notre application avec `Vite`

## Inspection du code par défaut

Lorsque nous regardons le squelette de code installé par défaut par `Vite`, nous voyons plusieurs choses :

1. Le fichier HTML ne contient aucune mention spéciale à une bibliothèque JS, hormis le cript principal `src/main.jsx`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

2. Le script fait tout le travail

```js
// Import de ReactJS
import React from 'react'
// Import de ReactDOM
import ReactDOM from 'react-dom/client'
// Import d'un composant web personnel
import App from './App'
// IMport d'une feuille de styles
import './index.css'

// Rendu de la structure du composant
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

> **Note** Nous passerons pour le moment sur `StrictMode` qui est l'équivalent dr `use strict` pour React.

3. Nous définissons un composant pour afficher du contenu

```js
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App()
{
  /* ... */
}
```
Pour ce qui nous intéresse à ce stade, nous voyons que `App.jsx` est un module, qui importe des ressources et définit une fonction `App`. Celle-ci englobe toute la logique du composant comme nous allons le voir.

> **Note** Il existe deux manières de définir de composants :
> - sous forme de classe
> - sous forme de fonction
>
> Néanmoins, la forme moderne est d'utiliser des fonctions.

Admettons que nous voulions afficher une simple page avec un message de bienvenue. Nous pourrions l'écrire de la manière suivante :
```js
const Hello = () => {
  return (
    <div>
      <h1>Hello !</h1>
      <p>Bienvenue sur cette page écrite disposée dans un composant React</p>
    </div>
  );
};

export default Hello;
```

Nous n'importons pas de ressources pour le moment, le module exporte donc simplement la fonction `Hello` (notez la convention d'écriture des composants).

> **Note** Nous voyons que la fonction rend un fragement de JSX. En apparence, nous voyons du code qui est indiscernable d'un code HTML standard, _mais il ne s'agit pas de HTML, mais bien de code JSX_

 Cette fonction ne peut rendre qu'**un seul élément**. Il y a donc deux solutions (de base) :
 - encapsuler lles différents éléments dans un élément racine (comme le `<div>` dans l'exemple)
 - utiliser un nœud vide (ou « _blank node_ ») : `<>`

### Exercice 01

Simplifiez le code par défaut (`main.jsx` + `App.jsx`) pour afficher une page comprenant :
- un entête (avec un titre)
- un corps avec un message de bienvenue
- un pied de page avec la mention légale de l'auteur
- une barre latérale avec un titre et trois blocs ayant chacun leur titre

### Imports avec `Vite`

Si vous voulez simplifier les chemins d'import des fichiers et des ressources, vous pouvez enrichir l aconfiguration de `Vite`.

Dans `vite.config.js`
```js
// ...
import path from 'path';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
```
Puis dans un nouveau fichier `jsconfig.json`  (pour l'IDE)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
}
```
On peut utiliser maintenant l'alias :
```js
import Hello from '@/Hello'
```

## Multiples composants

L'objectif, bien entendu, et de modulariser le plus possible des composants, de manière à recréer les pratiques connues avec HTML.

De ce point de vue, `JSX` se comporte comme les langages de balisage HTML ou XML, il suffit d'enchâsser les composants les uns dans les autres.

## Exercice 02

Reprendre l'exercice 01 et décomposer la structure de la page en divers composants indépendants.
