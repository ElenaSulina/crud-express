const express = require('express');
const userController = require('./userController.js');
const userRouter = express.Router()

// List of users
userRouter.get('/', userController.listOfUsers)

// Create user
userRouter.post('/', userController.createUser)

//Get user
userRouter.get('/:id', userController.getUser)

// Update user
userRouter.put('/:id', userController.updateUser)

// Delete user
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter;