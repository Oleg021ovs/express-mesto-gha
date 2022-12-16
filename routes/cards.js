const cardsRouter = require('express').Router();
const {
  getInitialCard, createCard, deleteCard, changeLikeCard, changeDislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getInitialCard);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', changeLikeCard);
cardsRouter.delete('/:cardId/likes', changeDislikeCard);

module.exports = cardsRouter;
