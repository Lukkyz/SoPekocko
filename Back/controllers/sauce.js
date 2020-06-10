let Sauce = require("../models/sauce");

exports.getAll = (req, res, next) => {
  Sauce.find({}).then((sauces) => {
    res.status(201).json(sauces);
  });
};

exports.getOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(201).json(sauce);
    })
    .catch((err) => res.status(404).json({ err }));
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

exports.manageLike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    switch (req.body.like) {
      case -1:
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => {
            res
              .status(202)
              .json({ message: "Votre dislike a bien été pris en compte" });
          })
          .catch((err) => {
            res.status(422).json({ err });
          });
        break;
      case 0:
        if (sauce.usersLiked.includes(req.body.userId)) {
          console.log("WHE");
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            }
          )
            .then(() => {
              res
                .status(202)
                .json({ message: "Votre like a bien été annulé !" });
            })
            .catch((err) => {
              res.status(422).json({ error: err });
            });
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
          )
            .then(() => {
              res
                .status(202)
                .json({ message: "Votre dislike a bien été annulé" });
            })
            .catch((err) => {
              res.status(422).json({ err });
            });
        }
        break;
      case 1:
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $push: { usersLiked: req.body.userId },
            $inc: { likes: 1 },
          }
        )
          .then(() => {
            res
              .status(202)
              .json({ message: "Votre like a bien été pris en compte !" });
          })
          .catch((err) => {
            res.status(422).json({ err });
          });
        break;
    }
  });
};
