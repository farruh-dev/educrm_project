const {
    UserSignUpValidation
} = require("../modules/validations")

module.exports = class UserController {
    static async UserSignUpController(req, res, next) {
        try {
            const data = await UserSignUpValidation(req.body, res.error)

            if (!data) throw new Error("Given data is not valid");

            console.log(data);

            res.status(200).json({
                ok: true,
                message: "Sign up success"
            })
        } catch (error) {
            next(error)
        }
    }
    static async UserSignInController(req, res, next) {
        try {
            const data = await UserSignUpValidation(req.body, res.error)

            if (!data) throw new Error("Given data is not valid");
        } catch (error) {
            next(error)
        }
    }
}