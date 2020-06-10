let jwt = require("jsonwebtoken");
let dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    let userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "L'id d'utilisateur est invalide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Requête non authorisée",
    });
  }
};
