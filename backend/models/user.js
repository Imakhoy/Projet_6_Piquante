const mongoose = require('mongoose')

//pour controller le mail, n'avoir qu'un seul mail dans la base de donnée, pas de doublon
const uniqueValidator = require('mongoose-unique-validator');

//Définition du modèle user
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

