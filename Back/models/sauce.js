let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let regex = /^[\s\w-àäéèëêç,'\.ïî]{3,200}$/;
let errMsg = (props) => {
  console.log(props);
  return `Le champ ${props.path} est invalide`;
};

let sauceSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return regex.test(value);
      },
      message: (props) => errMsg(props),
    },
  },
  manufacturer: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return regex.test(value);
      },
      message: (props) => errMsg(props),
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[\s\w-éàëêâ,!.]{3,500}$/.test(value);
      },
      message: (props) => errMsg(props),
    },
  },
  mainPepper: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return regex.test(value);
      },
      message: (props) => errMsg(props),
    },
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  usersDisliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

sauceSchema.pre("updateOne", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Sauce", sauceSchema);
