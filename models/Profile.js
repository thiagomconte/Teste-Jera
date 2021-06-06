const { model, Schema } = require("mongoose");

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  genre_id:[{
    type: Schema.Types.ObjectId,
    ref: 'genres'
  }]
});

module.exports = model("profiles", ProfileSchema);
