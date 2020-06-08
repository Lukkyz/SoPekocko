let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let sauceScheme = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  beat: { type: Number, required: true },
  usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  usersDisliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
