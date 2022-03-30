const mongoose = require("mongoose");
const crypto = require("crypto");

// creating user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});

// method to set salt and hash the password for a user
userSchema.methods.setPassword = function (password) {
  //create a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // hashing users salt and password with 1000 iterations
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// method to check the entered password is correct or not
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

// Exporting the user schema to allow it to use in other files
const User = (module.exports = mongoose.model("User", userSchema));
