const permissionChecker = require("../helpers/permissionChecker");
const { AddTeacherValidation } = require("../modules/validations");

module.exports = class TeacherController{
    static async CreateTeacherPostController(req, res, next){
        try {
            permissionChecker("admin", req.user_permissions, res.error)

            const data = await AddTeacherValidation(req.body, res.error)

            const teacher = await req.db.teachers.create({
                user_id: data.user_id,
                teacher_phone: data.phone,
                teacher_skills: data.skills
            })

            console.log(teacher);

            res.status(201).json({
                ok: true,
                message: "Teacher added successfully"
            })
        } catch (error) {

            if(error.message == "Validation error"){
                error.errorCode = 400
                error.message = "This user has been already assigned as a teacher"
            }
            next(error)
        }
    }

    static async TeacherUpdatePutController(req, res, next) {
        try {
            console.log(req.params)
            permissionChecker("admin", req.user_permissions, res.error);

            const teacher_id = req.params.teacher_id;

            const teacher = await req.db.teachers.findOne({
                where: {
                    teacher_id,
                },
            });

            if (!teacher) throw new res.error(404, "Teacher not found");

            const data = await AddTeacherValidation(
                req.body,
                res.error
            );

            await req.db.teachers.update(
                {
                    user_id: data.user_id,
                    teacher_phone: data.phone,
                    teacher_skills: data.skills,
                },
                {
                    where: {
                        teacher_id,
                    },
                }
            );

            res.status(200).json({
                ok: true,
                message: "Updated successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}