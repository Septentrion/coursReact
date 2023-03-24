# Galerie d'images FLickr

Réaliser un clone d'affichage d'images Flickr

L'accès à l'API est l'URL suivant :
[API FLickr](https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1)
```

Normalement, vous devriez pouvoir utiliser cette clef d'API : `636e1481b4f3c446d26b8eb6ebfe7127`.

L'application est très simple ; il s'agit d'un moteur de recherche qui interroge la base de données de Flickr surdes mots-clefs (ou des expressions-clefs).

Nous voulons afficher les résultats de la requête sous forme de grille. Si aucun résultat n'est trouvé un message spécifique doit s'afficher dans la fenêtre.

Chaque image sera associée à un petit bouton qui permet à l'utilisateur de mémoriser l'image (son URL, en fait) dans une liste de favori(te)s.

L'application doit donc comporter une seconde page qui affiche toutes les images favorites (en option, chaque image pourrait être supprimée).

Nous voudrions aussi pouvoir conserver un historique des expressions recherchées et afficher les dix dernières dans un bloc particulier. Cet historique est naturellement actif, c'est-à-dire que l'utilisateur peut cliquer pour relancer la recherche.
