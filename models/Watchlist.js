const { model, Schema } = require("mongoose");

const WatchlistSchema = new Schema({
  movie_id: Number,
  profile_id: {
    type: Schema.Types.ObjectId,
    ref: "profiles",
  },
});

module.exports = model("watchlists", WatchlistSchema);
