// Importer Express
const express = require('express');

// Importer path
const path = require('path');

const User = require('./models/user');

// Importer les routeurs
const userRoutes = require('./routes/userRoute');
const sauceRoutes = require('./routes/sauceRoute');

// Créer application Express
const app = express();



// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
});

// Importer Mongoose
const mongoose = require('mongoose');

// Connecter Mongoose avec route MongoDB
mongoose.connect("mongodb+srv://dbHeba:Mar_4569129@cluster0.zbkll.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Parser
// express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req
app.use(express.json());

// Enregistrer les routeurs
// Rendre dossier images static
app.use('/images', express.static(path.join(__dirname, 'images')));


//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
app.use('/api/sauces', sauceRoutes);

//Route générale "./routes/userRoute" pour l'authentification et création utilisateur
app.use('/api/auth', userRoutes);


//Exportation
// Exporter application (accès depuis les autres fichiers)
module.exports = app;