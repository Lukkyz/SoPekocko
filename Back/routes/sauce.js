var express = require("express");
var router = express.Router();
let sauceCtrl = require("../controllers/sauce");

let multer = require("../middleware/multer-config");

router.post("/", multer, sauceCtrl.create);
router.get("/:id", sauceCtrl.getOne);
router.post("/:id/like", sauceCtrl.manageLike);
router.get("/", sauceCtrl.getAll);

module.exports = router;
