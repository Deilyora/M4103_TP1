#Application Météo - M4103C
Sami BEN BRAHIM
Allan CABILLIC-GUINEBAULT
Groupe C

L'application est fonctionnelle et est basée sur un système *"one page"*. Il n'y a aucun rafraîchissement de page.

Quand on rentre une ville et que l'on appuie sur la touche 'Entrée' ou sur le bouton 'Rechercher', une carte apparaît en bas de l'écran avec tous les informations fournies par l'API OpenWeatherMap.

Quand on appuie sur le bouton 'Plus d'infos', des informations plus précises apparaît dans la carte. Il est possible de voir les données métérologiques de la ville recherchée en cliquant sur le lien dans le champs *'Coordonnées'*, cela ouvrira un lien vers le site d'OpenWeatherStation avec une carte centrée sur la ville recherchée.

Les cas d'erreurs sont gérés : Quand la requête HTTP renvoie une erreur, une alerte apparaît en bas de la barre de recherche.

L'application est responsive : l'affichage s'adapte en fonction des différents supports possibles, que ce soit sur un grand écran ou une plateforme mobile (portable, tablette, etc).

Seuls les navigateurs les plus connues peuvent afficher l'application.

L'application utilise les librairies CSS et JS de Bootstrap CDN pour l'affichage et les animations.
