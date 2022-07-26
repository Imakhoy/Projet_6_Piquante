const Mongoose = require ('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

// Define your schema as normal.
const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type:String, required: true}
})

userSchema.plugin(muv)
module.exports = mongoose.module('User', userSchema);

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);