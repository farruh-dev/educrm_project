const joi = require("joi");

module.exports = class Validations{
    static async UserSignUpValidation(data){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/).error(new Error("Username is not valid")),
            name: joi.string().required().min(5).max(64).error(new Error("Name is not valid")),
            email: joi.string().error(new Error("Email is not valid")),
            password: joi.string().required().min(6).max(128).error(new Error("Password is not valid")),
            gender: joi.string.required().valid("male", "female").error(new Error("This option is not available"))
        }).validateAsync(data)
    }
    static async UserSignInValidation(data){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/).error(new Error("Username is not valid")),
            password: joi.string().required().min(6).max(128).error(new Error("Password is not valid")),
        }).validateAsync(data)
    }
}