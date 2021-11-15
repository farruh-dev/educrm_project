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
    static async CourseCreateValidation(data, CustomError) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(8)
                    .max(128)
                    .required()
                    .error(new CustomError(400, "Name is invalid")),
                description: joi
                    .string()
                    .required()
                    .error(new CustomError(400, "Description is invalid"))
                    .min(64),
                price: joi
                    .number()
                    .min(0)
                    .error(new CustomError(400, "Price is invalid"))
                    .required(),
            })
            .validateAsync(data);
    }static async GroupCreateValidation(data, CustomError) {
        return await joi
            .object({
                time: joi
                    .string()
                    .min(5)
                    .required()
                    .error(new CustomError(400, "Time is invalid")),
                status: joi
                    .string()
                    .required()
                    .valid("waiting", "studying", "finished", "closed")
                    .error(new CustomError(400, "Status option is not available")),
                schedule: joi
                    .string()
                    .error(new CustomError(400, "Schedule is invalid"))
                    .required(),
                lesson_duration: joi
                    .number()
                    .min(60)
                    .error(new CustomError(400, "Duration is invalid"))
                    .required(),
                course_duration: joi
                    .number()
                    .min(1)
                    .error(new CustomError(400, "Course duration is invalid"))
                    .required(),
            })
            .validateAsync(data);
    }
    static async AddApplicantValidation(data, CustomError) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(8)
                    .max(64)
                    .required()
                    .error(new CustomError(400, "Name is invalid")),
                description: joi
                    .string()
                    .error(new CustomError(400, "Description is invalid"))
                    .min(64),
                birth_date: joi
                    .date()
                    .error(new CustomError(400, "Date is invalid"))
                    .required(),
                phone: joi
                    .string()
                    .required()
                    .error(new CustomError(400, "Phone is invalid"))
                    .regex(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/),
                gender: joi
                    .string()
                    .required()
                    .valid("male", "female")
                    .error(new Error("This option isn't available")),
                source: joi
                    .string()
                    .required()
                    .error(new Error("Source is invalid")),
            })
            .validateAsync(data);
    }

    static async UpdateApplicantValidation(data, CustomError) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(8)
                    .max(64)
                    .error(new CustomError(400, "Name is invalid")),
                description: joi
                    .string()
                    .error(new CustomError(400, "Description is invalid"))
                    .min(64),
                birth_date: joi
                    .date()
                    .error(new CustomError(400, "Date is invalid")),
                phone: joi
                    .string()
                    .error(new CustomError(400, "Phone is invalid"))
                    .regex(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/),
                gender: joi
                    .string()
                    .valid("male", "female")
                    .error(new Error("This option isn't available")),
                status: joi
                    .string()
                    .valid("active", "waiting", "cancelled")
                    .error(new Error("This option isn't available")),
                source: joi.string().error(new Error("Source is invalid")),
            })
            .validateAsync(data);
    }
}