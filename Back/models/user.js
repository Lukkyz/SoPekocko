let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let uniqueValidator = require("mongoose-unique-validator");

let userSchema = mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\w{3,}@\w{3,}\.\w{2,3}$/.test(value);
      },
      message: (props) => `${props.value} n'est pas une adresse e-mail valide`,
    },
    required: true,
    index: { unique: true, message: "Cet email est déjà utilisé" },
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/.test(value);
      },
      message: (props) =>
        `Le mot de passe doit faire au moins 6 caractères. Doit contenir au moins un chiffre, un caractères en majuscules.`,
    },
    required: true,
  },
});

userSchema.plugin(uniqueValidator, { message: "L'email est déjà utilisé'" });
userSchema.pre("save", async function (error, doc, next) {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
