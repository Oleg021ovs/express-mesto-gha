const Card = require('../models/card');

const {
  ERR_500,
  ERR_404,
  ERR_400,
  MESSAGE_500,
  MESSAGE_404,
  MESSAGE_400,

} = require('../error/error');

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      console.log(err);
      return res.status(ERR_500).json({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_400).send({ message: ERR_400 });
      } else {
        res.status(ERR_500).send({ message: MESSAGE_500 });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) res.send({ message: 'Карточка удалена' });

      else res.status(ERR_404).send({ message: MESSAGE_404 });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_400).send({ message: MESSAGE_400 });
      } else {
        res.status(ERR_500).send({ message: MESSAGE_500 });
      }
    });
};

module.exports.changeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send(card);

      else res.status(ERR_404).send({ message: MESSAGE_404 });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_400).send({ message: MESSAGE_400 });
      } else {
        res.status(ERR_500).send({ message: MESSAGE_500 });
      }
    });
};

module.exports.changeDislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send(card);

      else res.status(ERR_404).send({ message: MESSAGE_404 });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_400).send({ message: MESSAGE_400 });
      } else {
        res.status(ERR_500).send({ message: MESSAGE_500 });
      }
    });
};
