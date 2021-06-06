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
  genre_ids:[{
    type: Number,
  }]
});

module.exports = model("profiles", ProfileSchema);
