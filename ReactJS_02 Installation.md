# Création d'un projet React

## Introduction

React (parfois appelé ReactJS) est une bibliothèque JavaScript créée par Facebook pour construire des interfaces utilisateur interactives. Elle permet aux développeurs de créer des applications Web de grande envergure ou des interfaces utilisateur complexes en intégrant un petit extrait de code isolé.

React js, dans certains milieux, est souvent appelé un « _framework_ » (ou plate-forme de développement) en raison de son comportement et de ses capacités à construire des applications à part entière. Cependant, il s'agit techniquement d'une bibliothèque ; elle nécessite d'autres bibliothèques pour former des solutions complexes. Par exemple, nous aurons besoin de bibliothèques supplémentaires pour répondre aux exigences d'une application standard comme le routage, la récupération de données, etc. Par opposition, les « _frameworks_ » JavaScript comme AngularJS, Vue.js et Ember.js sont livrés avec presque tout ce qu'il faut pour construire une application complète.

##  Méthodes

Il existe plusieurs manières de crér un projet React.
- Ne rien faire (simplement utiliser la bibliothèque) ;
- Utiliser la commande `create-react-app` ;
- Utiliser `Vite` ;
- Procéder àune installation manelle avec `Webpack`.


### Nu

La manière la plus simpliste de travailler avec React est d'importer dans un fichier HTML les bibliothèques nécessaires. Globalement, nous aurons principalemnt besoin de React :
```html
<script
  src="https://unpkg.com/react@18/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  crossorigin
></script>
```
Dans la pratique, nous aurons également besoin de `Babel` pour faire la transpilation du lanagage de rendu spécifique à React : `JSX` :
```html
<!-- babel => compilation du JSX -->
<script src="https://unpkg.com/babel-standalone@latest/babel.min.js"></script>
```

Et c'est tout !

Notre page esst maintenant prête à interpréter le code JS qui gérera les composant web.

NAturellement, si vous suivez cette option, vous ne bénéficierez pas de outils de préparation des ressources web, comme les pré-processeurs CSS, la minification de code, etc.

### Avec npx

Il existe une commande de `npx` pour créerun squelette d'application React : `create-react-app`. Elle s'applique tout simplement :
```bash
npx create-react-app my-project
```
Cela crée toute la structure d'un projet, avec un dossier `public` pour les pages HTML et les ressources web, et un dossier `src` pour les sources JS.

En regardant dans le fichier `package.json`, on voit quelles sont les commandes disponibles pour piolter l'application :
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```
En particulier :
```bash
npm run start
```
lance un serveur HTTP qui écoute sur le port `3000`.

### avec Vite

`Vite` fait partie d'une nouvelle génération d'outils de compilation JS, qui est au-delà de la portée de ce cours. Néanmoins, lorsque l'on veut créer un projet assisté par `Vite`, l'installeur nous propose différentes options :
```bash
npm create vite@latest my-project
```
On vous demande alors en particulier quel outil vous voulez utiliser, dnt React.

De la même manière que précédemment, mais sous une forme un peu différente, vous allez retouver le squelette d'une application. Ici le fichier `index.html` et le script principal `main.js` sont à la racine de l'application.

Comme pour `react-create-app`, il existe des scripts en ligne de commande :
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
},
```
D'où :
```bash
npm run dev
```
pour démarrer un serveur HTTP sur le port `5173` par défaut.

Un avantage de `Vite` est qu'il est automatiquement en mode « _watch_ » et que toute modification que vous ferz sur le code sera aussitôt recompilée et affichée dans le navigateur.

### Manuellement

Pour créer un project React sans assistance, on revient à `Webpack`. Mais auparavant, nous devrons :

1. Créer un dossier pour le projet

```bash
mkdir my-project && cd $_
```

2. Initialiser le projet avec `npm`

```bash
npm init -y
```

3. Installer React

```bash
npm install react react-dom
```

4. Installer les autres dépendances

```bash
# Webpack
npm install --save-dev webpack webpack-cli webpack-dev-server
# Babel pour JSX
npm install --save-dev @babel/core babel-loader @babel/preset-react @babel/preset-env
# Utilitaire Webpack pour faire la fusion avec les fichiers HTML
npm install --save-dev html-webpack-plugin
# Utilitaire Webpack pour gérer les environnement d'exécution (dev, prodd, etc.)
npm install --save-dev webpack-merge
```

#### Configuration

Dans le fichier `webpack.common.js` :

```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
};
```

Pour l'environnement de développement, `webpack.dev.js` :

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3001,
    open: true,
    hot: true,
    compress: true,
  },
});
```
Et pour l'environnement de production, au besoin, `webpack.prod.js` :

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
});
```

Nous devons également ajouter quelques règles pour `Babel` dans le fichier `.babelrc` :

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", {
      "runtime" : "automatic"
    }]
  ]
}
```

Et enfin définir quelques scripts utilitaires dans `package.json` :

```json
"scripts": {
  "start": "webpack serve --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js"
},
```

##### Ressources web

En option, pour gérer les ressources web de l'application, il va falloir ajouter des règles `Webpack`, dans le fichier `webpack.common.js`.

1. Pour des images

```js
module: {
  rules: [
    // ...
    {
      test: /\.(png|svg|jpg|gif)$/i,
      type: 'asset/resource',
    },
  ],
},
```

2. Pour les feuilles de styles

C'est un peu plus compliqué, car nous allons devoir utiliser un plugin `Webpack` :

```bash
npm install --save-dev mini-css-extract-plugin css-loader
```

puis l'importer dans le fichier `webpack.common.js`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```
le déclarer comme plugin
```js
plugins: [
  // ...
  new MiniCssExtractPlugin({
    filename: 'styles.css',
  }),
],
```
et enfin ajouter la règle correspondante :
```js
module: {
  rules: [
    // ...
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
  ],
},
```

Bien évidemment, vous pouvez ajouter tous les autres plugins que vous voulez.

#### Exécution

Une fois tout ceci en place, il ne reste qu'à écrire le point d'entree HTML `src/index.html` :
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>React application</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
et le script principal JS `src/index.js` :
```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(<h1>Hello from React application</h1>);
```

Dans ce script minimal, nous voyons le mécanisme qui permet à React de fonctionner :

- la méthode `createRoot` qui associe le « DOM virtuel » de React à un élément de la page HTML ;
- la méthode `render` qui procède au rendu des composants (ici un fragment `JSX`).
