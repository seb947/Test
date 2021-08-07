Pour lancer l'application:

-1) créer dossier front end et backend.
-2) cloner le repository git suivant dans le dossier front et suivre les instructions d'installation: https://github.com/OpenClassrooms-Student-Center/dwj-projet6
-3) cloner ce repository dans le dossier backend
(optionnel: installer nodemon server -> npm install -g nodemon)

-4) installer les packages suivants:

  express -> npm install --save express
  
  body-parser -> npm install --save body-parser
  
  mongoose -> npm install --save mongoose
  
  mongoose unique validator -> npm install --save mongoose-unique-validator
  
  bcrypt -> npm install --save bcrypt
  
  jsonwebtoken -> npm install --save jsonwebtoken
  
  multer -> npm install --save multer
  
  helmet -> npm install helmet --save
  
  password-validator -> npm install password-validator
  
  dotenv -> npm install dotenv

-5) créer un fichier ".env" dans lequel: 

  DB_CREDENTIALS = votre string de connexion mongoDB (sur le site de MongoDB dans Databases, selectionnez votre cluster, cliquez sur connect puis connect your application)
  
  DB_USER_TOKEN = votre token de connexion jsonwebtoken

-> A Noter, le front end n'affichant pas les erreurs de mot de passe, consulter le middleware password-validator.js pour plus d'informations.

