const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const NotFoundError = require('./error/notFoundErr');
const { linkValidate } = require('./constans/constans');
// const userRouter = require('./routes/users');
// const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createProfile, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
// req.user = {
// _id: '639c8f1b86fcfe5be9899cd6', // вставьте сюда _id созданного в предыдущем пункте пользователя
// };

// next();
// });

// app.post('/signin', login);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
// app.post('/signup', createProfile);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkValidate),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createProfile);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('/', auth);
app.use('*', NotFoundError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT, () => {
  console.log(`App started ${PORT}`);
});
