const joi = require("joi");

module.exports = class Validations{
    static async UserSignUpValidation(data){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/),
            name: joi.string().required().min(5).max(64),
            email: joi.string(),
            password: joi.string().required().min(6).max(128),
            gender: joi.string.required().valid("male", "female")
        }).validateAsync(data)
    }
    static async UserSignInValidation(data){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/),
            password: joi.string().required().min(6).max(128),
        }).validateAsync(data)
    }
}