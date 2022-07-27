const express = require('express');//importation d'express
const router = express.Router();// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application 
const userCtrl = require('../controllers/userControllers'); //the controller to associate the functions to the different routes

//Routers 
router.post('/signup',userCtrl.signup);
//router.post('/login', userCtrl.login);

router.post('/login', userCtrl.login)


module.exports = router;// on exporte le router
