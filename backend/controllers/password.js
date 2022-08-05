// importation de password validator, pour exiger la création de MDP sécurisés
const passwordValidator = require('password-validator');
// Création du schema pour un MDP valide
const passwordSchema = new passwordValidator();
// configuration du schéma du mot de passe (caractéristiques exigées)
passwordSchema
.is().min(6)
.is().max(100)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['1234', 'azeqsd','4321']);


// exportation de la fonction de validation du MDP créé par rapport au schema
module.exports = (req, res, next) => {
        // Vérification du mdp choisi par rapport au schema
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
            //affichage de la liste d'erreurs de format de mdp
        return res
        .status(400)
        .json({error: `Mot de passe invalide ${passwordSchema.validate(req.body.password, {list: true})}`})
    }
}