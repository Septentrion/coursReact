# Jeu de pendu

Le jeu  du pendu consiste à deviner un mot caché en proposant des lettres.

Au départ, un mot est choisi par l'ordinateur dans un répertoire et affiché et ses lettres affichées à l'écran sous forme de blocs vides (ou avec un symbole générique, genre `?`).

Pour l'exercice, on disposed'un petit formulaire avec des boutons radio pour choisir une lettre et un bouton pour confirmer le choix (soumettre le formulaire).

Chaque fois que le joueur trouve une lettre du mot, celle-ci s'affiche dans le (ou les) bloc(s) correspondant(s).

En plus du mot à trouver et du formulaire, nous souhaitons avoir dans la page la trace de toutes les lettres déjà essayées, sous forme de petite grille. Chaque succès est représsenté par un fond vert pour la lettre en question, chaque échec par un fond rouge.

Nous devrons également afficher (sous une forme que vos choisirez) le nombre d'échecs encore autorisés.

De plus, nous souhaitons avoir une page qui affiche l'historique des jeux, avec les échecs et les succès. Ainsi que la proportion de uccès par rapport au nombre total de jeux.

Enfin, nous voudrions unetroisième page qui permette de configurer le jeu :
- Le joueur peut donner un pseudonyme
- Il peut préciser une taille minimale et une taille maximale pour les mots que l'ordinateur peut choisir
- Il peut choisir une difficulté, c'est-à-dire le nombre d'échecs autorisé par jeu.
