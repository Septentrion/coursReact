# Les hooks de ReactJS

## Introduction

Les « _hooks_ » (que l'on choisira de traduire par **mousqueton** plutôt que littéralement par « crochet ») on été introduits lorsque React est passé d'une représentation objet à une représentation fonctionnelle.

Un _mousqueton_ est un outil servant à manipuler les états des composants React ainsi que d'autre fonctionnalités.

Les _mousquetons_ les pllus couramment utiilisés sont :
- `useState`, pour manipuler les états de React ;
- `useEffect`, qui permet de gérer des « _effets de bord_ » inévitables dans le rendu de React ;
- `useContext`, pour récupérer des des valeurs « _de contexte_ », c'est-à-dire définies plus haut dans l'arbre des composants.

Il existe par ailleurs d'autres _mousquetons_, dont vous pouvez trouver la liste [dans la documentation](https://reactjs.org/docs/hooks-reference.html).

## useState

Le mousqueton `useState` va nous permettre de gérer efficacement les états. c'est-à-dire les déclarer et se donner les moyens de les modifier.

Pour cela, on importe `useState` depuis `React`, puis on définit une variable d'état :
```js
// import de `useState`
import {useState} from 'React';
// définition de la variable d'état `product`
// on remarque qu'elle est accompagnée d'un mutateur, qui permettra de modifier la valeur de cette variable
// par ailleurs, nous verrons que `useState` peu accepter un argument qui sera la veur initiale de la variable.
const [products, setProducts] = useState();
```
Admettons que nous voulions un menu déroulant, qui s'afsfiche ou se masque alternativement au clic. Nous pourrions écrire :
```js
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <nav>
      <ul>
        {/* other items here*/}
        <li>
          <!-- l’événement click provoque la modification de l’état -->
          <button onClick={() => setDropdown((prev) => !prev)}>
            Services <span>&#8595;</span>
          </button>
          <!-- Lors du rendu, la valeur de `dropdown` est testée pour savoir s’il faut afficher ou masque le sous-menu -->
          {dropdown && (
            <ul>
              <li>Design</li>
              <li>Development</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  )
}
```

> **Note** Les mutateurs sont la seule manière de modfier les varaibles d'état de React. Toute autre méthode conduirait à des erreurs. Ceci est dû au fait que les _mousquetons_ servent à prévenir React des changements en déclenchant des événements. Sans eux, des valeurs modifiées ne seront pas répercutées lors du rendu (rappelons que React entretient un algorithme qui cherche à minimiser les modifications du DOM réel pour des gains de perfonrmance).

## useEffect

Le mousqueton `useEffect`, comme son nom l'indique, nous permet d'effectuer des effets de bord dans les composants des fonctions.

Si nous revenons à la base, la programmation fonctionnelle nous a appris à construire des programmes en écrivant des fonctions pures. Ces fonctions doivent recevoir un argument, calculer une sortie en fonction de cet argument et ne rien affecter en dehors d'elles-mêmes.

Cela rend les fonctions réutilisables ; ainsi, React embrasse le concept de programmation fonctionnelle dans sa mise en œuvre. Bien que nous ne le sachions peut-être pas, nous avons utilisé ce concept dans cette série sur React. Nous avons créé des composants qui reçoivent des propriétés de leurs parents et rendent le `JSX` basé sur celles-ci. Ces types de composants sont appelés **composants purs**.

Cependant, les composants peuvent effectuer des calculs qui modifient certains états en dehors de leur portée. Ces calculs sont des effets de bord et sont inévitables lors de la construction d'applications React. Les exemples incluent la manipulation du DOM, les abonnements et la récupération de données.

Encore une fois, `useEffect` permet à React d'intégrer l'effet de bord dans son cycle d'exécution. C'est pour cela qu'il est essentiel de passer par cette méthode.

Un exemple simple pourrait être un bouton dont l'interaction doit modifier le titre de la page. Quelque chose comme :
```js
import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Vous avez cliqué ${count} fois`;
  }, [count]);
  return (
    <button onClick=(() => setCount((count) => count + 1))>{count}</button>
  );
};
```
Notre compteur crée uneffetde bord car il modifie un élément de la page **en dehors de la portée** du composant lui-même.

Nous avons importé `useEffect` dans le code et placé les effets de bord dans le corps de la fonction. Nous voyons que le _mousqueton_ accepte deux arguments :
- une fonction de rappel exécutée après chaque rendu complet (c'est-à-dire au premier rendu de composant et après avoir détecté un changement d'état ou de propriété dans le tableau des dépendances)
- un tableau optionnel des dépendances qui définissent quand ré-exécuter la fonction de rappel.

Si nous laissons le tableau de dépendances vide, React ignorera toute forme de rendu et n'exécutera les effets qu'une seule fois. Nous ne devons vider le tableau que si l'effet n'utilise pas de valeurs provenant de la portée rendue. En d'autres termes, si l'effet n'utilise pas de valeurs à l'intérieur du composant. Si l'effet utilise des valeurs du composant comme des propriétés, des variables d'état, ou même des fonctions, nous devons les inclure comme dépendances dans le tableau.

## useRef

Un autre _mousqueton_ utile est `useRef`. Esentiellement; il permet de définir des variables qui ne sont pas impliquées dans le processus de rendu.

```js
import { useRef} from "react";

const value = useRef(0);
/*... */
```

`value` est un objet qui ne possède qu'une seule propriété (au sens POO) : `current`. Cette propriété est accessible en lecture et en écriture.

Un cas particuler est la déclaration `useRef(null)` (ou simplement `useRef()`), auquel cas la variable contient une référence à un élément du DOM. Par exemple :
```js
import { useRef} from "react";

const nodeRef = useRef(null);

return (
  <>
    <input ref={nodeRef} />
    <button onClick=(() => inputRef.current.value = "Gotcha !")>Fais quelque chose</button>
  </>
)
```
Dans l'exemple ci-dessus, le nœud du DOM associé à `nodeRef` prend sa valeur lorsque cette référence est injectée dans l'élément `input`. Par la suite, lorsque nouos cliquetons sur le bouton, c'est la valeur de ce champ qui sera modifiée.

Quelques remarques à props des références :

- Vous pouvez modifier la propriété `ref.current`. Contrairement aux variables d'état, elle est mutable. Cependant, si elle contient un objet utilisé pour le rendu (par exemple, un morceau de votre état), vous ne devez pas muter cet objet.
- Lorsque vous modifiez la propriété `ref.current`, React ne procède pas à un nouveau rendu de votre composant. React n'est pas « conscient » du moment où vous la modifiez car un `ref` est un simple objet JavaScript.
- N'écrivez pas ou ne lisez pas `ref.current` pendant le rendu, sauf pour l'initialisation. Cela rend le comportement de votre composant imprévisible.
- En mode strict, React appellera deux fois la fonction de votre composant afin de vous aider à trouver des impuretés accidentelles. Il s'agit d'un comportement réservé au développement et qui n'affecte pas la production. Cela signifie que chaque objet `ref` sera créé deux fois, et qu'une des versions sera rejetée. Si la fonction de votre composant est pure (comme elle devrait l'être), cela ne devrait pas affecter la logique de votre composant.

## useReducer

En utilisant le mousqueton `useState` pour gérer un état non trivial, comme une liste d'éléments, où vous avez besoin d'ajouter, de mettre à jour et de supprimer des éléments dans l'état, on remarque que la logique de gestion de l'état prend une bonne partie du corps du composant.

C'est un problème parce que le composant React devrait par nature contenir la logique qui calcule la sortie. Mais la logique de gestion de l'état est une responsabilité séparée, elle devrait dons e trouver ailleurs. Sinon, le code devient difficile à lire, à maintenir et à tester !

Pour nous aider à séparer les responsabilités (rendu et gestion de l'état), React fournit le hook `useReducer`. Ce mousqueton extrait la gestion de l'état du composant.

La structure d'un composant est la suivante :
```javascript
// 1. Import du hook ùseReducer`
import { useReducer } from 'react';

function MyComponent() {
  // 2. Définition d'un état
  const [state, dispatch] = useReducer(reducer, initialState);

  // 3. Défintion des actions
  const action = {
    type: 'modify'
  };
  
  return (
    // 4 . Modification de l'état
    <button onClick={() => dispatch(action)}>
      Click me
    </button>
  );
}

// 5. Implémentation de la logique de gestion de l'état
function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'modify':
      newState = { /* code */ };
      break;
    default:
      throw new Error();
  }
  return newState;
}
```

1. En premier lieu, on importe le hook `useReducer`
2. Nous devons définir ensuite le contexte de l'état
  - useReducer admet deux argumznts : une fonction et une valeur initialState
  - le hook produit à la foir une variable d'état (ici `state`) et une fonction (ici `dispatch`)
3. Nous devons ensuite définir un répertoire d'actions possible ; chaque action est désignée par une étiquette avec la propriété `type`
4. Si nous voulons modifier l'état, il suffit d'appeler la fonction `dispatch` en précisant quelle action mettre en œuvre (p. ex. `dispatch(ActionType)`)
5. Il reste à implémenter la fonction `reducer`, pour modifier, en fonction d'un événement l'état du composant.

Naturellement, nous devrions également définir la variable `initialState`, qui précise l'état du composant au départ.
