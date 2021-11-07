const { UserSignUpController } = require("../../controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.post("/", UserSignUpController)

module.exports = UserRouter