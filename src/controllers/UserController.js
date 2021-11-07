const { UserSignUpValidation } = require("../modules/validations")

module.exports = class UserController{
    static async UserSignUpController(req, res, next){
        const data = await UserSignUpValidation(req.body)

        if(!data) throw new Error("Given data is not valid");

    }
    static async UserSignInController(req, res, next){
        const data = await UserSignUpValidation(req.body)

        if(!data) throw new Error("Given data is not valid");
        
    }
}