const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, getUsers, getUserById, createNewUser } = require('../Controllers/usersController');

const userRouter = express.Router();

userRouter.get("/:userId", getUserById);
userRouter.post('/register', registerUser);
userRouter.post('/create', createNewUser);
// userRouter.post('/login', loginUser);
userRouter.put('/update', updateUser);
userRouter.delete('/delete', deleteUser);

module.exports = userRouter;