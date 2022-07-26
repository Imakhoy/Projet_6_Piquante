const express = require("express"); //importation d'express
const router = express.Router(); // La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const SauceCtrl = require("../controllers/sauceControllers"); // Déclaration et importation du controller sauceControllers et sa logique métier
const multer = require("../middleware/multer-config");// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const auth = require('../middleware/auth');// Déclaration et importation du middleware auth qui protège les routes sélectionnées et vérifiera que l'utilisateur est authentifié par token avant d'autoriser l'envoi de ses requêtes
const likeCtrl = require("../controllers/like");// Déclaration et importation du controller like et sa logique métier

//Routers

router.post("/", auth, multer, SauceCtrl.createSauce); // route post pour envoyer une nouvelle sauce
router.put("/:id", auth, multer, SauceCtrl.updateSauce); // route pour modifier une sauce
router.get("/", auth, SauceCtrl.getAllSauces); //route get implementer afin qu'elle renvoie tous les sauces dans la base de données
router.get("/:id", auth, SauceCtrl.getOneSauce);// route get implementer afin de recuperer une sauce specifique
router.delete("/:id", auth,  SauceCtrl.deleteSauce);//route pour supprimer une sauce
router.post("/:id/like", auth, likeCtrl.likeSauce);//Les routes POST pour la gestion des likes


//exportation du router
module.exports = router;

