var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mongoose = require("mongoose");
let dotenv = require("dotenv").config();
let cors = require("cors");
let helmet = require("helmet");
let rateLimit = require("express-rate-limit");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connexion réussie"))
  .catch(() => console.log("Connexion echouée"));

let limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
});

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
app.use(limiter);
app.use(helmet());

app.use("/api/auth", usersRouter);
app.use("/api/sauces", sauceRouter);

module.exports = app;
