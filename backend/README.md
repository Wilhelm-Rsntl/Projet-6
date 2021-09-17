Description du projet:

Le but de ce projet est de construire l'API d'un réseau social et de mettre en place une base de donées MongoDB Atlas.

Si vous avez téléchargé ce dossier en .zip via Openclassrooms:
Le serveur frontend est fourni séparément par openclassrooms.

Si vous avez téléchargé ce dosiser via le dépôt Github:
Le serveur frontend est fourni dans le dossier frontend. 
------------------------------------------------------------------------------

Installation (dossier .zip):

Si vous avez reçue l'application en format .zip pour évaluation:
Dézippez simplement le fichier Zip dans un nouveau dossier.
--------------------------------------------------------------------------------

Installation (Github):

Si vous avez téléchargée l'application depuis le repo github.
L'API a besoin de plusieurs modules pour fonctionner correctement, elle est basée sur un server node et utilise le framework Express pour gérer le serveur et Mongoose pour gérer la Base de données. 

Dans le dossier backend, depuis le terminal:

1) Installer node.js et npm:
npm install

2) installer toutes les dépendances présentes dans ./package.json

3) Créer une Base de donnée MongoDB Atlas et récupérer sont string de connection

3) créer un fichier nommé ".env" à la racine du dossier qui contient les variables:

    DB_STRING = #string de connection à la BDD (remplacer <password> par le mot de passe de la BDD)
    PORT = #Port du serveur backend (3000 par défaut)
    SECRET_KEY = #Une clé secrète et aléatoire propre à l'environnement pour crypter les tokens
    MAX_REQUESTS = #nombre max de requêtes autorisées par adresses IP 100 par défauts sur un serveur de développement (sur une période de 15min)
    TOKEN_VALIDITY = "24h" #validité des tokens d'identification (24h par défaut)

------------------------------------------------------------------------------

Lancer le serveur: depuis le terminal dans le dossier backend:

node server

Si le serveur fonctionne le terminal doit afficher
"Listening on port 3000"

-----------------------------------------------------------------------------

Lancer et installer le serveur frontend depuis le dossier correspondant:

- Suivre le processus d'installation contenu dans readme.md du dossier
- Lancer le serveur frontend avec npm start