# Le routeur

## Introduction

ReactJS ne s'occupe que des composants. Pour créer une application web du type SPA, il faut installer un module qui s'occupera de la navigation. C'est `react-router-dom` :
```bash
npm install react-router-dom
```

## Initialisation

Ce module nous peret d'utliser le composant `BrowserRouter`, qui va encapsuler toute notre application :
```js
// ...
import { BrowserRouter as Router } from "react-router-dom"

const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer);
root.render(
  <React.StrictMode>
    <Router>
      <TodoApp />
    </Router>
  </React.StrictMode>
);
```

L'avantage de `BrowserRouter` est d'autoriser l'écriture d'URL « classiques », conformes à la spécification.

On trouve d'autres routeurs qui utilisent le `#` (hash) pour distinguer la route.

## Définir des routes

Le rôle du routeur est de mettre en correspondance un URL, qui est la requête de l'utilisateur avec une réponse. Dans un mode client-serveur classique, on a souvent un **contrôleur** qui se charge de superviser la production de cette réponse.

Dans les SPA, le mécanisme est un peu différent puisque les cmposants contiennent toute la logique, même si celle-ci est fragmentée entre divers composants. Une route React se présente donc ainsi :
```js
<Route path="about" element="<About />" />
```

Nous voyons que c'est assez simple car :
- `path` correspond à un URL (ou un schéma d'URL)
- `element` estle composant à afficher lorsque l'URL est reconnue par le routeur.

Nous allons donc généralement avoir un composant qui ressemblera à cela :
```js
import { Routes, Route } from 'react-router-dom';

import Home from '@/routes/Home';
import About from '@/routes/About';
import Login from '@/routes/Login';
import Profile from '@/routes/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;
```
Les routes sont imbriquées dans un composant global `Routes`.

nous voyons également que la dernière route contient un « joker » (`*`) qui reconnaît n'importe quel URL, à condition qu'il n'ait pas été reconnu par un autre schéma antérieur dans la liste.
