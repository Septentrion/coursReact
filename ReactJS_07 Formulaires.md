# Les formulaires avec React

## Introduction

Les éléments de formulaire dans `JSX` sont gérés différemment par rapport à HTML. En HTML, les entrées de formulaire conservent leur état interne et sont gérées par le **DOM** du navigateur. Ce DOM est la « _source de vérité_ », et toutes les données transmises au champ du formulaire seront disponibles à l'intérieur de celui-ci (c'est-à-dire le DOM).

React propose cependant une approche différente pour travailler avec les éléments de formulaire. Les entrées de formulaire dans React peuvent être contrôlées ou non contrôlées.

## Formulaire non contrôlé

Ce type de comportement est similaire à celui des champs HTML, car c'est le le `DOM` qui gère les données.

```js
const Form = () => {
  return (
    <>
      <h1>React Form Handling</h1>
      <form>
        <label>
          First Name: <input type="text" />
        </label>
      </form>
    </>
  );
};
export default Form;
```

Si nous ajoutons temporairement un attribut `value` etquaque nous attribuons une chaîne vide, le champ de formulaire devient immédiatement _en lecture seule_ :

```html
<input type="text" value="" />
```

En effet, l'attribut `value` remplace la valeur dans le DOM.
Dans une **implémentation non contrôlée**, nous ne spécifions pas cet attribut Si nous devons spécifier une valeur initiale, nous pouvons utiliser `defaultValue` à la place.

### Obtenir des données de du champ

Pour obtenir des données de formulaire à partir d'un champ non contrôlé, `React` nous permet d'utiliser une référence pour accéder à l'élément du DOM.

```js
import { useRef } from "react";

const UncontrolledForm = () => {

  // Référence à l'élément HTML
  const ref = useRef();

  // Fonction de rappel d'exemple pour le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(ref.current.value);
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          //  Lien entre HTML et React par le biaisde la référecne
          First Name: <input type="text" ref={ref} />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};

export default UncontrolledForm;
```

1. Nous avons commencé par transmettre la référence au champ HTML pour accéder à sa valeur.
2. Ensuite, nous avons contrôlé l'action de soumission en ajoutant un gestionnaire d'événements sur l'élément `form`.
3. La soumission de formulaire déclenchera la fonction de rappel `handleSubmit` et affichera la valeur.

## Champ de formulaire contrôlé

Avec un champ contrôlé, nous traitons les données d'entrée dans un composant `React` (pas le DOM du navigateur).

- Un état (`state`) est nécessaire pour servir de source de vérité au lieu de DOM.
- Les éléments d'entrée écoutent l'état du composant en prenant un attribut `checked` pour les cases à cocher ou un attribut `value` pour d'autres éléments d'entrée.
- Un gestionnaire d'événements est nécessaire pour obtenir la valeur du champ pour chaque mise à jour de l'état.

Réagir le champ d'entrée de texte
Dans un composant de formulaire , nous allons créer un état pour gérer l'entrée de l'utilisateur. Nous transmettrons ensuite l'état actuel en tant que valeur aux entrées value attribut:

```js
import { useState } from "react";

const Form = () => {
  // 1. Création de l'état (sa valeur initiale est vide)
  const [fname, setFname] = useState("")

  // 5. Fonction de rappel pour traiter les modifications du champ > cette fonction moidifie l'état et non le DOM
  const handleChange = (e) => {
    setFname(e.target.value);
  };

  return (
    <>
      <h1>Controlled Form</h1>
      <form>
        <label>
          // 2. La valeur initiale est ransime au composant
          // 4. Ajout d'un écouteur d'événements pour la modification
          First Name: <input type="text" value={fname} onchange={handleChange} />
        </label>
      </form>
      // 3. La valeur du chmap est affichée
      <h5>First name: {fname}</h5>
    </>
  );
};

export default Form;
```

En ajoutant la valeur d'état à l'attribut `value` du champ, l'élément **n'écoute désormais que l'état**. Étant donné que la valeur d'état initiale est une chaîne vide, le champ de saisie sera également vide sur le rendu DOM initial. Grâce à cela cela, nous laissons React contrôler toute modification du champ.

Pour modifier la valeur, nous avons néanmoins besoin d'un de passer par un événement `onChange` qui surveillera les modifications.

Avec cela, nous pouvons faire beaucoup de choses, comme la validation instantanée du champ. C'est impossible avec une entrée non contrôlée, où nous ne pouvons obtenir des valeurs d'entrée du DOM qu'après la soumission du formulaire.

## Différents types de champs

### Champs texte multiples

Que se passe-t-il si nous avons plusieurs champs `text` ?

Nous pouvons configurer un autre état pour le nom de famille et attribuer la valeur d'état à l'hélice de valeur de l'entrée. Cependant, cette approche nécessite de définir une autre fonction de gestionnaire pour mettre à jour l'état d'entrée.

C'est correct si nous avons seulement peu de champs. Cependant, cela peut être fastidieux à grande échelle. Nous voudrions gérer tous les états d'entrée avec un seul `useState` et une fonction de rappel unique.

Pour ce faire, nous changerons la valeur d'état d'une chaîne en un objet contenant toutes les données d'état associées. Nous mettrons à jour le Form composant, nous avons donc les éléments suivants:

```js
import { useState } from "react";

const Form = () => {
  const [state, setState] = useState({
    fname: "",
    lname: ""
  });

  return (
      //
  );
};

export default Form;
```

Les prénoms et noms de famille seront désormais disponibles via le state.fname et state.lname respectivement.

Ensuite, dans le code `JSX` :

```js
return (
  <>
    <h1>Controlled Form</h1>
    <form>
      <label>
        First Name:{" "}
        <input name="fname" type="text" value={state.fname} onChange={handleChange} />
      </label>
      <label>
        Last Name:{" "}
        <input name="lname" type="text" value={state.lname} onChange={handleChange} />
      </label>
    </form>
    <h5>
      Name: {state.fname} {state.lname}
    </h5>
  </>
);
```
Remarquons que les attributs `name` portentle même nom que la propritété de l'état.

Enfin :
```js
const handleChange = (e) => {
  setState(state => {
    ...state,
    [e.target.name]: e.target.value
  });
};
```
> **Note** Que se passe-t-il dans le handleChange?
> Ce gestionnaire, comme mentionné précédemment, est appelé chaque fois qu'un champ de saisie se met à jour, et il invoquera `setState` pour mettre à jour l'état. Comme nous le voyons `setState` ne modifie pas `state`, en réalité`, crée un nouvel objet qui en est un clone. Rappelons que les objets React sont immuables.

> **Note** La syntaxe [e.target.name] utilisé dans la fonction nous permet de mettre à jour dynamiquement la clé de l'objet d'état correspondant au champ actif.

### Champ de texte multiligne

Une zone de texte est un champ de saisie de texte multiligne. Contrairement à HTML, le `textarea` de `JSX` est un élément à fermeture automatique similaire.

Pour ajouter une zone de texte à notre projet, nous commencerons par ajouter une variable d'état pour l'entrée de l'utilisateur. Appelons ça un message.

```js
const [state, setState] = useState({
  //
  message: ""
});

return (
  <>
    <form>
      {/* ... */}
      <label>
        Your Message:
        <textarea
          name="message"
          value={state.message}
          onChange={handleChange}
        />
      </label>
    </form>
    <h5>{/* ... */}</h5>
    <p>Message: {state.message}</p>
  </>
);
```

### Listes déroulantes

L'élément `select` Admettons que nous voulions fournir aux utilisateurs une liste de choix pour un voyage. Nous commencerons par ajouter une propriété d'état pour cette liste.

```js
const [state, setState] = useState({
  // ...
  city: "",
});

const cities = ["Paris", "Toulouse", "Strasbourg", "Lille", "Nantes"];
```
Ensuite, nous allons devoir construire les options du sélecteur :

```js
const citiesOptions = cities.map((city, key) => (
  <option value={city} key={key}>
    {city}
  </option>
));

return (
  <>
    <form>
      {/* ... */}
      <label>
        Destinations :
        <select name="city" value={state.city} onChange={handleChange} >
          <option value={""} disabled>
            --Choisissez une destination--
          </option>
          {citiesOptions}
        </select>
      </label>
    </form>
    {/* ... */}
    <h5>Favorite car brand: {state.city}</h5>
  </>
);
```

## Cases à cocher

Contrairement aux autres champs discutés ci-dessus, les case à cocher utilisent un attribut `checked` qui prend une valeur vraie ou fausse booléenne. Commençons par ajouter une nouvelle propriété pour une case à cocher, puis autoriser le rendu :

```js
const [state, setState] = useState({
  // ...
  isChecked: false,
});

return (
  <>
    <form>
      {/* ... */}
      <label>
        <input
          type="checkbox"
          name="isChecked"
          checked={state.isChecked}
          onChange={handleChange}
        />
        Is Checked?
      </label>
    </form>
    {/* ... */}
    <h5>Is it checked? : {state.isChecked ? "Yes" : "No"}</h5>
  </>
);
```

Ensuite, nous mettrons à jour `handleChange` pour recueillir les valeurs des cases à cocher.

```js

const handleChange = (e) => {
  const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  setState((state) => ({
    ...state,
    [e.target.name]: value
  }));
};
```

### Boutons radio

Commençons par ajouter un état pour le sexe des utilisateurs:

```js
const [state, setState] = useState({
  // ...
  gender: "",
})

return (
  <>
    <form>
      {/* ... */}
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={state.gender === "male"}
          onChange={handleChange}
        />{" "}
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={state.gender === "female"}
          onChange={handleChange}
        />{" "}
        Female
      </label>
    </form>
    {/* ...  */}
    <h5>Gender : {state.gender}</h5>
  </>
);
```

Pour ce type de champ permettant une seule sélection, l'attribut `name` doit être le même et égal à la clé que nous avons spécifiée dans l'état. L'attribut `value` se voit attribuer une valeur statique qui identifie de manière unique le bouton radio sélectionné. Le checked attribut nous permet de sélectionner un bouton si la condition attribuée renvoie true.


### Champs de type 'range'

Nous utilisons ce type d'entrée pour filtrer une liste d'éléments en fonction des valeurs numériques. Dans notre projet, nous mettrons en place un contrôle qui affiche des prix dynamiques entre 0 et 50 euros.

Comme prévu, nous mettrons à jour l'état pour inclure une propriété à prix comme celle-ci;

```js
const [state, setState] = useState({
  // ...
  price: 0
});

return (
  <>
    <form>
      {/* ... */}
      <label>
        Price (between 0 and 50):
        <input
          type="range"
          name="price"
          min="0"
          max="50"
          value={state.price}
          onChange={handleChange}
        />
      </label>
    </form>
    {/* ... */}
    <h5>Price : ${state.price}</h5>
  </>
);
```

### Soumettre le formulaire

Soumettre un formulaire est identique que celui-ci soit contrôlé ou non :

```js
const Form = () => {
  const [state, setState] = useState({
    // ...
  });
  // ...
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit}>
        {/* ... */}
        <button>Submit</button>
      </form>
      {/* ... */}
    </>
  );
};

export default Form;
```
