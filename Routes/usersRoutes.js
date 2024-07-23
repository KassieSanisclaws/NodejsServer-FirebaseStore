const express = require('express');
const { registerUser, loginUser, updateUser, deleteUserByID, getUserById, createNewUser, getAllUsers } = require('../Controllers/usersController');

const userRouter = express.Router();

userRouter.get("/read/:id", getUserById);
userRouter.get('/allRecords', getAllUsers);
userRouter.post('/register', registerUser);
userRouter.post('/create', createNewUser);
userRouter.post('/login', loginUser);
userRouter.put('/update', updateUser);
userRouter.delete('/delete/:id', deleteUserByID);

module.exports = userRouter;