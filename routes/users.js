const userRouter = require('express').Router();
const {
  getProfile, createProfile, getProfileId, editProfile, editAvatar,
} = require('../controllers/users');

userRouter.get('/', getProfile);
userRouter.get('/:userId', getProfileId);
userRouter.post('/', createProfile);
userRouter.patch('/me', editProfile);
userRouter.patch('/me/avatar', editAvatar);

module.exports = userRouter;
