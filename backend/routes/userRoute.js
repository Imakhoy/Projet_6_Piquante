const express = require('express');//importation d'express
const router = express.Router();// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application 
const userCtrl = require('../controllers/userControllers'); //the controller to associate the functions to the different routes
const limit = require("../middleware/limit");
const email = require("../middleware/email");
const password = require("../middleware/password");


//Routers
router.post('/login', limit.limiter, userCtrl.login);
router.post('/signup', email, password, userCtrl.signup);

module.exports = router;// on exporte le router


