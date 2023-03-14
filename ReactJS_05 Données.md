# Les données dans les composants ReactJS

## Introduction

Il est essentiel de comprendre comment les données circulent pour créer des applications `React`. Chaque composant a tendance à recevoir et à transmettre des informations à d'autres composants de l'arbre.

Par exemple, un composant peut recevoir des données de son parent ou, dans certains cas, des utilisateurs. Pour comprendre le modèle de données, nous allons aborder les concepts de `props` et de `state` dans `React`.

### Les propriétés React

Les `props`, également appelés **propriétés**, peuvent être considérés comme des attributs dans un élément HTML. Par exemple, les attributs type et value de l'élément input ci-dessous sont des props :

```html
<input type="submit" value="Submit" />
```

Nous pouvons utiliser ces propriétés pour transmettre des informations qui modifient le comportement de l'élément `input`. Par exemple, le fait de remplacer l'attribut type par type="text" modifie l'apparence de l'entrée.

Dans `React`, les données circulent du parent vers les enfants dans l'arbre des composants. La principale façon de transmettre des données vers le bas est par l'intermédiaire des accessoires. Les propriétés React, comme les attributs HTML, peuvent être utilisés pour modifier la sortie d'un composant. Lorsqu'un composant enfant reçoit un props du parent, **cette valeur devient immuable** et ne peut pas être modifiée par le composant récepteur.

Pour cette raison, nous obtiendrons toujours la même sortie lorsque nous fournissons la même valeur de propriété à un composant, ce qui rend le composant réutilisable dans l'interface utilisateur sans crainte d'incertitude.

Transposons la logique HTML en React. Admettons que nous ayons dans notre application des objets représentant des produits :
```js
const product_1 = {
  id: 52,
  name: "Soupe de poissons",
  price: 7.5,
  nutriScire "B"
}
```

Nous voudrions créer un composant pour afficher de manière uniforme tous les produits. Npus pourrions l'écrire :
```html
<Product instance={product_1} />
```

 > **Note** Nous oremarquons que les variables sont encapsulées entre des accolades. Celles-ci permettent d'ailleurs d'injecter du code JS arbittraire danss les vcomposants

Les propriétés seront ensuite considérées comme arguments de la fonction définissant le composant.
```js
function Product ( props )
{
  return (
    <article>
      <h1>{props.instance.name}</h1>
      <p>Prix unitaire : {props.instance.price}€</p>
    </article>
  )
}
```

> **Note** Comme on le voit, le composant n'admet qu'un seul paramètre, appelé ici `props`. C'est un objet qui contient lui-même tous les attributs du composant. Traditionnellement, on utilise la **déstructuration d'objet** pour simplifier l'emploi de l'objet `props`.

Il est très important de comprendre que le comosant est autonome et indépendant du contexte. Si nous avions une liste de produits à afficher dans un tableau `products` nous pourrions écrire :
```js
<section>
  products.map((p) => <Product instance={p}) />
</section>
```
et généralement avoir recours à un autre composant :
```js
function ProductList()
{
  return (
    <section>
      {
        products.map( (p) => <Product instance={p} ) />}
      }
    </section>
  )
}
```

> **Note** Remarquez les deux niveau d'accolades, correspondant aux deux niveaux de composants.

**Exercice 03**

### L'état React

Un état peut être considéré comme le « _moteur_ » qui fait avancer une application `React`. Nous déclarons un état dans un composant si les données changent au fil du temps, généralement par l'interaction de l'utilisateur. Par exemple, si le composant doit effectuer des interactions avec l'utilisateur, comme la mise à jour d'un champ de saisie, ou se souvenir d'événements antérieurs, comme l'activation d'un bouton.

Contrairement aux propriétés, un état React est local et spécifique au composant où il est défini. Il n'est pas accessible aux autres composants de l'arbre, sauf si le détenteur décide de le transmettre au composant enfant. Lorsque des données d'état sont transmises à un composant enfant, elles sont transmises en tant que propriétés et automatiquement traitées comme telles dans le composant récepteur.

#### Identification du composant dans lequel placer les données d'état

Lorsque différents composants ont besoin de connaître un élément de données d'état, nous pouvons placer l'état dans le parent commun le plus proche.

Dans une application de liste de tâches, par exemple, plusieurs composants prendront en charge les tâches :
- `InputTodo` pour ajouter de nouvelles tâches ;
- `TodosList` pour afficher la liste des tâches ;
- `TodoItem` affichera une tâche individuelle ainsi que quelques wifgets d'interaction.

Puisque ces composants ont tous besoin d'accéder à l'état, nous placerons l'état dans un composant englobant `TodosLogic`, qui sera leur parent. De cette façon, le parent peut transmettre les données aux enfants qui en ont besoin en utilisant les accessoires. Ce processus est appelé « **percolation de propriétés** » (ou « prop drilling » en anglais).

Nous verrons par la suite qu'il existe des moyens plus simples pour gérer les informations, comme l'API `Context` ou `Redux`.

**Exercice 04**
