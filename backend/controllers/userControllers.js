
const User = require('../models/user');
const bcrypt = require('bcrypt');//npm install bcrypt
const jwt = require('jsonwebtoken');//npm install jsonwebtoken


//Mettre en place le saltage en plus du hasage :
exports.signup = (req, res, next) =>  {
  const email= req.body.email
  //hash et sallage du MDP grace a Bcrypt
  bcrypt.genSalt(parseInt(process.env.SALT))
  .then(salt=>{
    bcrypt.hash(req.body.password,salt)
  
      .then(hash => {
  
      const user =new User({email, password:hash})
      user
          .save()
          .then(() => res.status(201).send({ message: "Utilisateur enregistré !" }))
          .catch(error => res.status(409).send({ message: "Utilisateur pas enregistré :" + error }))
      })
    })
  }

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
              process.env.TOKEN,
              // ou process.env.JWTPRIVATEKEY,              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

    };