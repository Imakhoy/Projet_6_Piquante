
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();
const helmet = require('helmet');

// Importer les routeurs
const userRoutes = require('./routes/userRoute');
const sauceRoutes = require('./routes/sauceRoute');

//DATABASE
// Connecter Mongoose avec route MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS ==> Cross Origin Ressource Sharing
//Importer du middleware 
app.use((req, res, next) => {
  //qui permet d'accéder à l'API avec les méthodes pour envoyer les requêtes
  res.setHeader('Access-Control-Allow-Origin', '*');
  //quels header sont authoriser 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  // quels methodes sont possible 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next();
});

// Sécurise les headers
app.use(helmet());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } },
{ crossOriginOpenerPolicy: { policy: "cross-origin" } }))


// Parser
app.use(express.json()); // express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req
app.use(bodyParser.json()); // Middleware pour gérer les posts venant du front end


// Rendre dossier images static
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);

//Route générale "./routes/userRoute" pour l'authentification et création utilisateur
app.use('/api/auth', userRoutes);


// Exporter application (accès depuis les autres fichiers)
module.exports = app;

