let Sauce = require("../models/sauce");

exports.getAll = (req, res, next) => {
  Sauce.find({}).then((sauces) => {
    res.status(201).json(sauces);
  });
};

exports.create = (req, res, next) => {
  let sauceObj = JSON.parse(req.body.sauce);
  let sauce = new Sauce({
    ...sauceObj,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((err) => res.status(400).json({ error }));
};

exports.getOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    res.status(201).json(sauce);
  });
};
