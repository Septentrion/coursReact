# Styler des composants ReactJS

## Introduction

Il y a plusieurs manières d'appliquer des styles CSS à un composant :
- « _inline_ », avec un attribut `style`
- en important une feuille de style externe
- et en utilsant les modules CSS de ReactJS

## Feuiles de style externe

Le moyen le plus simple est d'utiliser des feuiles de style.

Si vous avez créé un dossier `styles/`à la racine de votre application, il suffit d’importer le fichier :
```js
import "./styles/app.css"
// Avec Vite, vous pouvez écrire :
// import "@/styles/app.css"
// avec la bonne configuration
```

Si vous définissez une classe :
```css
.form-container {
  display: flex;
  border-radius: calc(0.1 * 100px);
  box-shadow: 0px 4px 14px 0px rgba(70, 70, 70, 0.38);
  justify-content: space-around;
  background: #fff;
  font-size: 1rem;
}
```

Vous pouvez ensuite l'utiliser ainsi :
```js
return (
  <>
    <form onSubmit={handleSubmit} className="form-container">
    /* ... Code du formulaire ... */
    </form>
  </>
);
```

La différence est que l'attribut se nomme `className`, parce qu'évidemment tout cela est **contrôlé** par React et non par le navigateur. En conséquence, l'ttribut `class`ne marche pas.


## Styles « _inline_ »

Nous pouvons également utiliser l'attribut `style` (le même que HTML), mais sur un mode « objet ». Par exemple, en reprenant le code précédent :
1. Dans un premier, nous définissons les styles sous forme d'un objet JS
```css
cont formContainerStyle = {
  display: flex;
  border-radius: calc(0.1 * 100px);
  box-shadow: 0px 4px 14px 0px rgba(70, 70, 70, 0.38);
  justify-content: space-around;
  background: #fff;
  font-size: 1rem;
}
```
2. Et nous l'appliquons ensuite à l'élément :
```js
return (
  <>
    <form onSubmit={handleSubmit} style={formContainerStyle}>
    /* ... Code du formulaire ... */
    </form>
  </>
);
```

## Les modules CSS

Les modules CSS sont souvent utilisés les applications React. Cela nous permet d'écrire des feuilles de style CSS distinctes pour chaque composant et de nous assurer que les styles sont adaptés localement à un composant spécifique. Cette approche permet d'éliminer le risque de conflit de noms associé à la portée globale des styles.

Si nous attribuons des styles à un composant, nous pouvons réutiliser les noms de classe dans différents fichiers sans nous soucier des conflits avec les sélecteurs.

Nous utiliserons l'approche des modules CSS pour styliser les composants Header et TodoItem. Pour ce faire, nous allons créer des fichiers de module pour les composants en utilisant la convention de nommage [nom de fichier].module.css.

Dans le dossier `styles/`, créons les fichiers `Header.module.css` :
```css
.header h1 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1em;
  text-transform: lowercase;
  text-align: center;
}
```

Toutes les règles de style que nous avons définies dans les fichiers du module seront renvoyées sous la forme d'un objet, et nous pouvons référencer chaque sélecteur à l'aide de `styles.selector` ()`styles` est le nom que nous donnerons à l'objet retourné. Vous pouvez nommer l'objet comme vous le souhaitez).

Nous pouvons ensuite imporer les fichiers du module dans leurs composants respectifs. Dans le fichier components/Header.jsx, importez le module CSS en haut de la page comme suit :
```js
import styles from "@/styles/Header.module.css";
```
Puis décorer le code JSX :
```js
const Header = () => {
  // ...
  return (
    <header style={headerStyle} className={styles.header}>
      {/* ... */}
    </header>
  );
};
export default Header;
```

> **Note** Si nous avons un sélecteur CSS séparé par un trait d'union (par exemple .new-class), nous utiliserons la syntaxe de notation entre crochets pour accéder au sélecteur dans les fichiers de composants, comme suit : className={styles["new-class"]}. Si nous n'aimons pas cette syntaxe, nous pouvons utiliser une syntaxe en camelCase comme suit : className={styles.newClass}.

Notez aussi que, dans ce cas, React engendre des noms de classes uniques, qui aident à éviter les conflits de nommage.

## Utiliser SASS

Utiliser SASS est trivial. Il suffit d'installer le module :
```bash
npm install sass
```
Puis de renommer les fichiers `.css` en `.scss`.
(ainsi que dans le code du composant, naturellement)

Et voilà !
