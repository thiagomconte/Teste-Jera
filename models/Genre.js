const { model, Schema } = require("mongoose");

const GenreSchema = new Schema({
  name: String,
  id: Number,
});

module.exports = model("genres", GenreSchema);
