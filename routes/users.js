const userRouter = require('express').Router();

const {
  getProfile, getPosts, getProfileId, editProfile, editAvatar,
} = require('../controllers/users');

userRouter.get('/', getProfile);
userRouter.get('/users/me', getPosts);
userRouter.get('/:userId', getProfileId);
userRouter.patch('/me', editProfile);
userRouter.patch('/me/avatar', editAvatar);

module.exports = userRouter;
