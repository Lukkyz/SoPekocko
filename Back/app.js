var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mongoose = require("mongoose");
let dotenv = require("dotenv").config();
let cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion réussie"))
  .catch(() => console.log("Connexion echouée"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let sauceRouter = require("./routes/sauce");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());

app.use("/api/auth", usersRouter);
app.use("/api/sauces", sauceRouter);

module.exports = app;
