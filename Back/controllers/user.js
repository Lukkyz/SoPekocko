let User = require("../models/user");
let bcrypt = require("bcryptjs");
let dotenv = require("dotenv").config();
let jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = new User({
    email,
    password,
  });
  user
    .save()
    .then((msg) =>
      res.status(201).json({ message: "L'utilisateur a bien été crée'" })
    )
    .catch((err) => {
      res.statusMessage = err.message;
      res.status(400).json({ err });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            }),
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
