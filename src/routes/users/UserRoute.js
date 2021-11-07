const { CreateUserController } = require("../../controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.post("/signup", CreateUserController)

module.exports = UserRouter