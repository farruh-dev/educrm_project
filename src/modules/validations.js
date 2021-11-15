const joi = require("joi");

module.exports = class Validations{
    static async UserSignUpValidation(data, CustomError){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/).error(new CustomError(400, "Username is not valid")),
            name: joi.string().required().min(5).max(64).error(new CustomError(400, "Name is not valid")),
            email: joi.string().error(new CustomError(400, "Email is not valid")),
            password: joi.string().required().min(5).max(128).error(new CustomError(400, "Password is not valid")),
            gender: joi.string().required().valid("male", "female").error(new CustomError(400, "Given gender option is not available"))
        }).validateAsync(data)
    }
    static async UserSignInValidation(data, CustomError){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/).error(new CustomError(400, "Username is not valid")),
            password: joi.string().required().min(5).max(128).error(new CustomError(400, "Password is not valid")),
        }).validateAsync(data)
    }
    static async AddTeacherValidation(data, CustomError){
        return await joi.object({
            user_id: joi.string().required().error(new CustomError(400, "User id is not valid")),
            phone: joi.string().required().regex(/^998(9[0123456789]|6[125679]|7[01234569])[0-9]{7}$/).error(new CustomError(400, "Phone number is not valid")),
            skills: joi.array().required().error(new CustomError(400, "Skills are not valid"))
        }).validateAsync(data)
    }
    static async UpdateTeacherValidation(data, CustomError){
        return await joi.object({
            phone: joi.string().required().regex(/^998(9[0123456789]|6[125679]|7[01234569])[0-9]{7}$/).error(new CustomError(400, "Phone number is not valid")),
            skills: joi.array().required().error(new CustomError(400, "Skills are not valid"))
        }).validateAsync(data)
    }
}