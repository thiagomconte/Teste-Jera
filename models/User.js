const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dtNascimento:{
    type: String,
    required: true,
  },
  facebookId:{
    type: Number,
    unique: true
  }
});

module.exports = model("users", UserSchema);
