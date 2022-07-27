const mongoose = require("mongoose");
// créer un schema de données qui contient les champs souhaités pour chaque Sauce 
//en utilisant la méthode schéma de Mongoose
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
  });
  
// on export ce schéma en tant que modèle mongoose
module.exports = mongoose.model("Sauce", sauceSchema);