const { CreateUserController, UserSignInController } = require("../../controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.post("/sign_in", UserSignInController);
UserRouter.post("/account", CreateUserController);

module.exports = UserRouter