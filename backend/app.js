// Importer Express
const express = require('express');
// Importer Mongoose
const mongoose = require('mongoose');
// Importer path
const path = require('path');

// Importer les routeurs
// const userRoutes = require('./routes/user');
// const sauceRoutes = require('./routes/sauce');

// Créer application Express
const app = express();

// Connecter Mongoose avec route MongoDB
mongoose.connect("mongodb+srv://dbHeba:Mar_4569129@cluster0.zbkll.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
});

// Parser
app.use(express.json());

// Rendre dossier images static
app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrer les routeurs
// app.use('/api/auth', userRoutes);
// app.use('/api/sauces', sauceRoutes);

// Exporter application (accès depuis les autres fichiers)
module.exports = app;