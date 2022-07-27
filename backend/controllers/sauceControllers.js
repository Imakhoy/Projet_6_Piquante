
const Sauce = require('../models/sauce');
const fs = require('fs'); //module fs pour “File System”.Package pour accéder et interagir avec le système de fichiers

//Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersdisLiked: [" "],
  });
  //enregister la sauce dans la base de donnée en appelant la méthode save
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

/// Controllers pour modifier une sauce
exports.modifySauces = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
  // Met a jour la base de données avec les nouveaux éléments 
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};
// Controllers por effacer une sauce grâce a l'ID
exports.deleteSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
    
};
// Controllers pour afficher une sauce grâce a l'ID
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};
// Controllers pour afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
}

///api/sauces/:id/like
//like and dislike 
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;
  if(like === 1){
      Sauce.updateOne({ _id: sauceId } ,{ $inc: { likes: 1 }, $push: { usersLiked: userId }})
          .then( () => res.status(200).json({ message: 'Like ajouté !' }))
          .catch(error => res.status(400).json({ error }));
  }else if(like === -1){
      Sauce.updateOne({ _id: sauceId } ,{ $inc: { dislikes: 1 }, $push: { usersDisliked: userId }})
          .then( () => res.status(200).json({ message: 'Dislike ajouté !' }))
          .catch(error => res.status(400).json({ error }));
  }else{
      Sauce.findOne({ _id: sauceId })
          .then(sauce => {
              if (sauce.usersLiked.includes(userId)) {
                  Sauce.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
                      .then(() => { res.status(200).json({ message: 'Like supprimé !' }) })
                      .catch(error => res.status(400).json({ error }))
              } else if (sauce.usersDisliked.includes(userId)) {
                  Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
                      .then(() => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                      .catch(error => res.status(400).json({ error }))
              }
          })
          .catch(error => res.status(400).json({ error }))
  }

}