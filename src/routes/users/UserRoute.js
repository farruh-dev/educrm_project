const { UserSignUpController } = require("../../controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.post("/signup", UserSignUpController)

module.exports = UserRouter