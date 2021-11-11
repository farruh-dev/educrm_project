const {
    CreateUserController,
    UserSignInController
} = require("../../controllers/UserController");
const authMiddleware = require("../../middlewares/authMiddleware");

const UserRouter = require("express").Router();

UserRouter.post("/sign_in", UserSignInController);
UserRouter.post("/account", [authMiddleware], CreateUserController);

module.exports = UserRouter