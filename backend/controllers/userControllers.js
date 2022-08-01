
const User = require('../models/user');
const bcrypt = require('bcrypt');//npm install bcrypt
const jwt = require('jsonwebtoken');//npm install jsonwebtoken
const dotenv = require("dotenv");
dotenv.config();

//Controllers pour créer un compte
//Mettre en place le saltage en plus du hasage :
exports.signup = (req, res, next) => {
  bcrypt.genSalt(parseInt(process.env.SALT))
  .then(salt=>{
    bcrypt.hash(req.body.password, salt)// salt = 10 ( nombre de fois ou sera exécuté l'algorithme de hashage )
      .then(hash => {
        // ce qui v a être enregistré dans mangoDB
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // envoyer le user dans la base de données 
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  })
};

  //Controllers pour se connecter au site
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_TOKEN,
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

    };
