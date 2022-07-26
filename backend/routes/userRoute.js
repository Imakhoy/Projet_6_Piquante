const express = require('express');//importation d'express
const router = express.Router();// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const userCtrl = require('../controllers/userControllers');// le controller pour associer les fonctions aux différentes routes


const password = require('../middleware/password'); // Déclaration et importation du middleware password pour le contrôle mot de passe utilisateur


const mail = require("../middleware/email");// Déclaration et importation du middleware email pour le contrôle de la validité de l'adresse mail




//Routers 
router.post('/signup', mail, password, userCtrl.signup);
router.post('/login', userCtrl.login);

// on exporte le router
module.exports = router;