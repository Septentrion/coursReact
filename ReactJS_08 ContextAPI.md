# Context API

## Introduction

Utiliser un état pour avoir accès à des données persistantes est très pratique, mais cela se révèle vite limité qi l'application a un grand nombre de composants sous forme d'un arbre riche.

Noous avons vu que la variable détat doit être défini sur un nœud commun à tous les composants qui ont besoin d'accéder à cette variable. Rapidement, nous sentons que la solution optimale serait de définir un état global à  la racine de l'application, de manière à parer à toutes les éventualités.

Mais ! En faisant cela, nous allons nous contraindre à percoler toutes les variables le longdes branches de l'arbre, ce qui va devenir très vite fastidieux.

Voilà pourquoi ont été introduits des « **dépôts de données** » (ou `store`) qui vont simplifier le partage des variables d'état.

Il existe deux sortes de dépôts, que nous verrons successivement :
- **Context API**, qui est la solution intégrée à `React`
- **Redux**, quiest une bibliothèque externe, plus puissante et plus généralement adoptée dans les applications.

Primo... Context API.

## Utilisation de Context API

Admettons que nous voulions gérer une liste de tâches.

### Création du dépôt de données

Premièrement, nous allons créer les « _contexte_ » :

```js
import { createContext } from 'react';

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
  return (
    <TodosContext.Provider value={'todos data'}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext };
```

Nous avons commencé par importer l'API `createContext` de `React` en lui passant une valeur de contexte par défaut comme argument. Cette API renvoie un objet que nous avons assigné à `TodosContext`. Cet objet expose un `Provider` qui permet aux composants consommateurs d'avoir accès aux données du contexte. Tout composant descendant de ce fournisseur aura accès aux données de contexte.

La propriété des enfants utilisée dans le composant `TodosProvider` sera le JSX/composants que nous passons entre les balises `<TodosProvider></TodosProvider>.` Nous reviendrons en détail sur la propriété des enfants plus tard dans la série. Tous les composants qui seront des descendants du `<TodosProvider></TodosProvider> `auront accès à ce que nous assignons à l'attribut `value`.

Chaque fois que la valeur prop changera, tous les composants qui consomment les données seront mis à jour. Cela ne pose pas de problème si nous transmettons une valeur primitive telle qu'une chaîne de caractères, un nombre ou un booléen. Cependant, la transmission d'objets ou de tableaux peut entraîner des rendus inutiles dans l'arbre, car lorsqu'une partie de cet objet est modifiée, tous les composants consommateurs effectuent un nouveau rendu, même si ces modifications ne les affectent pas. C'est pourquoi nous devons suivre rigoureusement les étapes mentionnées ci-dessus.

### Détermination du composant racine accédant au contexte

Comme mentionné précédemment, nous devons encapsuler les composants de l'application avec le `Provider` afin qu'ils puissent accéder aux données de contexte. Nous pouvons encapsuler le composant racine avec le `TodosProvider`, ce qui devrait suffire. Cependant, c'est une bonne pratique d'encapsuler seulement les composants qui ont besoin des données. Cette pratique permet également d'éviter de créer plusieurs instances d'un contexte.

Ouvrons le fichier `components/TodosLogic.jsx` et enveloppons les composants avec le provider comme suit :
```js
// ...
import { TodosProvider } from '@/context/TodosContext';

const TodosLogic = () => {
  // ...
  return (
    <TodosProvider>
      <InputTodo addTodoItem={addTodoItem} />
      <TodosList
        todosProps={todos}
        handleChange={handleChange}
        delTodo={delTodo}
        setUpdate={setUpdate}
      />
    </TodosProvider>
  );
};

export default TodosLogic;
```

Les composants `TodosList` et `InputTodo` correspondent maintenant aux `children` du `TodosProvider`. Eux seuls auront accès au dépôt. D'autres composants, dans des branches collatérales de l'arbre n'y auront pas accès.

### Utilisation de 'useContext'

Pour lire/consommer les données du dépôt, nous alons avoir recours à un nouveau « _mousqueton_ » : `useContext`.

Prenons le composant `TodosList`, nous allons importer ce dont nous avons besoin :

```js
import { useContext } from 'react';
import { TodosContext } from '@/context/TodosContext';

const context = useContext(TodosContext);

/* ... */
```

Ainsi, nous avons assigné à la variable `context` le contenu de l'attrinut `value` du `Provider`. Pour le moment, la chaîne de caractères 'todos data'.

Au passage,nous puvons optimiser un peu le code :

1. Dans le `Provider`, nous exportons directement une fonction se référant à `useContext`
```js
import { createContext, useContext } from 'react';

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
  return (
    <TodosContext.Provider value={'todos data'}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
```

2. Dans le composant enfant :
```js
import { useTodosContext } from '@/context/TodosContext';

const context = useTodosContext();

/* ... */
```

### Compléter le dépôt

Comment faire pour gérer de « _vraies_ » données ?

Il suffit d'implémenter la logique dans `TodosProvider` :

```js
import {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
  // ...
  return (
    <TodosContext.Provider
      value={{
        todos,
        handleChange,
        delTodo,
        addTodoItem,
        setUpdate,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
```

Nous voyons vlue est devenu un objet beaucoup plus volumineux, qui intègre toutes les fonctions de rappel utiles à la gestion des données.

Les tâches elles-mêmes pourraient être conservées dans un tableau, mais, dans une optique plus réaliste, nous voudrions sans doute utiliser le `localStorage` du navigateur, avecl le _hook_ `useEffect` :
```js
useEffect(() => {
    // Sauvegarder la liste des tâches
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

```
