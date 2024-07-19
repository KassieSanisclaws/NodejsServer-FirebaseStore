const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser } = require('../Controllers/usersController');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);
userRouter.put('/update', updateUser);
userRouter.delete('/delete', deleteUser);

module.exports = userRouter;