# HOT TAKES #

#Description du projet:

Le but de ce projet est de construire l'API d'un réseau social et de mettre en place une base de donées MongoDB Atlas.

--------------------------------------------------------------------------------

##Installation du backend :


L'API a besoin de plusieurs modules pour fonctionner correctement, elle est basée sur un server node et utilise le framework Express pour gérer le serveur et Mongoose pour gérer la Base de données.

1) Ouvrir un terminal dans le répertoire `backend` et exécuter la commande :
>npm install

2) Créer une Base de donnée MongoDB Atlas et récupérer sont url de connection


3) créer un fichier nommé ".env" à la racine du dossier qui contient les variables:

   `MONGO_URI` = Url de connection à la BDD
   
    `PORT` = Port du serveur backend (3000 par défaut)

    `SECRET_KEY` = Clé aléatoire propre à l'environnement pour crypter les tokens


4) Lancer le serveur: depuis le terminal dans le dossier backend:

>node server

Si le serveur fonctionne le terminal doit afficher
"Listening on port 3000"

##Installation du frontend :

1) Ouvrir un terminal dans le répertoire `frontend` et exécuter la commande :
>npm install

2) Exécuter ensuite la commande :
>npm start