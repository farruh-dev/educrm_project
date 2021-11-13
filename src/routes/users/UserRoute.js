const {
    CreateUserController,
    UserSignInController,
    GetAllUsersController
} = require("../../controllers/UserController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const UserRouter = require("express").Router();

UserRouter.get("/", [authMiddleware, permissionMiddleware], GetAllUsersController);
UserRouter.post("/sign_in", UserSignInController);
UserRouter.post("/account", [authMiddleware, permissionMiddleware], CreateUserController);

module.exports = UserRouter