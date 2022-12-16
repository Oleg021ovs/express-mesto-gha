const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  ERR_404,
  MESSAGE_404,
// eslint-disable-next-line import/no-unresolved
} = require('./error/error');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '639c8f1b86fcfe5be9899cd6', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  res.status(ERR_404).send({ message: MESSAGE_404 });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT, () => {
  console.log(`App started ${PORT}`);
});