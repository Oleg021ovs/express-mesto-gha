const User = require('../models/user');

const {
  OK_201,
  ERR_500,
  ERR_404,
  ERR_400,
  MESSAGE_500,
  MESSAGE_404,
  MESSAGE_400,
} = require('../error/error');

module.exports.getProfile = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(ERR_500).json({ message: MESSAGE_500 });
    });
};

module.exports.getProfileId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send({ data: user });
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

module.exports.createProfile = (req, res) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.status(OK_201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_400).send({ message: MESSAGE_400 });
      } else {
        res.status(ERR_500).send({ message: MESSAGE_500 });
      }
    });
};

module.exports.editProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    })).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_400).send({ message: MESSAGE_400 });
        // eslint-disable-next-line no-undef
        next(new ValidationError('400'));
        return;
      }
      next(err);
    });
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
  )
    .then((user) => {
      if (user) res.send({ avatar });
      else {
        res.status(ERR_404).send({ message: MESSAGE_404 });
      }
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(ERR_400).send({ message: MESSAGE_400 });
      } else {
        res.status(ERR_500).send({ message: MESSAGE_500 });
      }
    });
};
