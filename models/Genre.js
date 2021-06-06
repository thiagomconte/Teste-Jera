const { model, Schema } = require("mongoose");

const GenreSchema = new Schema({
  name: String,
  genre_id: Number,
});

module.exports = model("genres", GenreSchema);
