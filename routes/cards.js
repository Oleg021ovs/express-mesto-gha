const cardsRouter = require('express').Router();
const {
  getCard, createCard, deleteCard, changeLikeCard, changeDislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCard);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', changeLikeCard);
cardsRouter.delete('/:cardId/likes', changeDislikeCard);

module.exports = cardsRouter;
