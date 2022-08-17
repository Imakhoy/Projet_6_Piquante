//Importer password-validator
const passwordValidator = require('password-validator');
//Schema un MDP valide
const passwordSchema = new passwordValidator();
// configuration du schéma du mot de passe (caractéristiques exigées)
passwordSchema
.is().min(6)
.is().max(80)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['Password123','1234', 'azeqsd','4321', 'aqwzsx']);


module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res
        .status(400)
        .json({error: `Mot de passe invalide ${passwordSchema.validate(req.body.password, {list: true})}`})
    }
}