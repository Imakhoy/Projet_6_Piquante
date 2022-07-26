// Importer Express
const express = require('express');

// Importer path
const path = require('path');

const User = require('./models/user');

// Importer les routeurs
// const userRoutes = require('./routes/user');
// const sauceRoutes = require('./routes/sauce');

// Créer application Express
const app = express();



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

