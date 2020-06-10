var express = require("express");
var router = express.Router();
let sauceCtrl = require("../controllers/sauce");

let multer = require("../middleware/multer-config");
/* GET users listing. */
router.post("/", multer, sauceCtrl.create);
router.get("/:id", sauceCtrl.getOne);
router.get("/", sauceCtrl.getAll);

module.exports = router;
