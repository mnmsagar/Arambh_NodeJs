const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: Number },
});

exports.User = mongoose.model('Users',userSchema); 
