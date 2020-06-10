var express = require("express");
var router = express.Router();
let sauceCtrl = require("../controllers/sauce");

let multer = require("../middleware/multer-config");
let auth = require("../middleware/auth");

router.use(auth);
router.post("/", multer, sauceCtrl.create);
router.get("/:id", sauceCtrl.getOne);
router.post("/:id/like", sauceCtrl.manageLike);
router.get("/", sauceCtrl.getAll);
router.put("/:id", multer, sauceCtrl.modify);
router.delete("/:id", sauceCtrl.delete);

module.exports = router;
