require('dotenv').config(); //Import du package dotenv

const express = require('express');// Importer Express
const mongoose = require('mongoose');// Importer Mongoose
const bodyParser = require('body-parser');
const path = require('path');// Importer path
const app = express();// Créer application Express

const userRoutes = require('./routes/userRoute');// Importer les routeurs
const sauceRoutes = require('./routes/sauceRoute');// Importer les routeurs

const helmet = require('helmet');

//DATABASE
// Connecter Mongoose avec route MongoDB
mongoose.connect("mongodb+srv://dbHeba:Mar_4569129@cluster0.zbkll.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS ==> Cross Origin Ressource Sharing
//Import du middleware qui permet d'accéder à l'API avec les méthodes pour envoyer les requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next();
});

// Sécurise les headers
app.use(helmet());

// Parser
app.use(express.json()); // express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req
app.use(bodyParser.json()); // Middleware pour gérer les posts venant du front end

// Rendre dossier images static
app.use('/', express.static(path.join(__dirname, 'images')));

//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
app.use('/api/sauces', sauceRoutes);

//Route générale "./routes/userRoute" pour l'authentification et création utilisateur
app.use('/api/auth', userRoutes);


// Exporter application (accès depuis les autres fichiers)
module.exports = app;