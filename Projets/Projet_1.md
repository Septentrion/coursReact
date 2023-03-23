# API Piscicole

On souhaite faire une petite application qui interroge l'API publique de l'état piscicole des rivières. Cette API peut être trouvée à cette adresse :

- [API Poisson](https://hubeau.eaufrance.fr/page/api-poisson)
- [Documentation(https://api.gouv.fr/documentation/api_hubeau_poissons)]

Nous voulons donner la possibilité aux utilisateurs de chercher les endroits où ont éé repérésdes espèces de poissons. L'API nous permet de le faire grâce au paramètre `nom_commun_taxon`.

L'application se compose donc de plusieurs pages :

1. Une page d'accueil qqui présente un exte d'introduction et explique le fonctionnement de l'API
2. Une page de recherche, qui permet de donner un nom de poisson et de récupérer l'ensemble des réponses
  - Les réponses peuvent être très nombreuses, dns ce cas on se limitera à quelques centaines, pour la démonstration
  - Il y a beaucoup de données dans la réponse, on ne conservera que celles qui nous sont utiles :
      - "libelle_commune": "DAVENESCOURT",
      - "code_commune": 80250
      - "code_departement": "80",
      - "libelle_departement": "Somme",
      - "code_region": "32",
      - "libelle_region": "HAUTS-DE-FRANCE",
      - "code_bassin": "01",
      - "libelle_bassin": "ARTOIS-PICARDIE",
      - "effectif_lot": 1,
      - "code_taxon": "2038",
      - "code_alternatif_taxon": "ANG",
      - "nom_commun_taxon": "Anguille d'Europe",
      - "nom_latin_taxon": "Anguilla anguilla",
      - "uri_taxon": "http://id.eaufrance.fr/apt/2038",
      - "latitude": 49.7071226017854,
      - "longitude": 2.59812380300006,
      - "poids_lot_mesure": 649,
      - "poids_lot_estime": null,
      - "methode_estimation_poids_lot": null,
      - "code_individu": 19821630,
      - "taille_individu": 723,
      "date_operation": "2022-04-13T14:30:00Z"
  - On voudra aussi conserver le nombre de réponses total
  - Les résultats de la recherche seront sauvegardés dans la mémoire du navigateur
  - Si la recherche à déjà até effectuée, on chargera les données du cache et non celles issues de l'API
 3. Une page présentant la liste (synthétique) des poissons contenus dans le cache (déjà recherchés)
     - Cette liste présentera, pour chaque poisson, son nom, le nombre de mesures effectuées et un lien vers une page spécifique
4. Une page présentant de manière synthétique les donnéees d'un poisson :
    - les informations sur l'espèce
    - la liste des communes où il a été repéré
    - la moyenne de la taille
    - un lien vers la fiche descriptive
    - un lien vers la fiche Wikipedia, si celle-ci existe (généralement à partir du nom latin)
    - _bonus : pour les plus avancés, vous pouvez éventuellement intégrer une carte Leaflet des prélèvements_

## Remarques:

1. L'application présentera un menu pour naviguer entre les pages
2. Une feuille de styles, sous forme de module CSS, assurera la mise en page de l'application
3. Pour les requêtes AJAX, vous pourrez utiliser soit `fetch` (le plus natif), soit la bibliothèque `axios` très utilisée d'une manière générale.
