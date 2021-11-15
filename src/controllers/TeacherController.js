const permissionChecker = require("../helpers/permissionChecker");
const { AddTeacherValidation, UpdateTeacherValidation } = require("../modules/validations");

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

            permissionChecker("admin", req.user_permissions, res.error);

            const teacher_id = req.params.teacher_id;

            const teacher = await req.db.teachers.findOne({
                where: {
                    teacher_id,
                },
                raw: true
            });

            console.log(teacher)

            if (!teacher) throw new res.error(404, "Teacher not found");

            const request = {
                phone: req.body.phone ? req.body.phone : teacher.teacher_phone,
                skills: req.body.skills ? req.body.skills : teacher.teacher_skills
            }

            const data = await UpdateTeacherValidation(
                request,
                res.error
            );

            await req.db.teachers.update(
                {
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

    static async TeacherGetController(req, res, next) {
        try {

            permissionChecker("admin", req.user_permissions, res.error);

            const limit = req.query.limit || 15;
            const offset = req.query.offset - 1 || 0;

            const teachers = await req.db.teachers.findAll({
                raw: true,
                include: [
                    {
                        model: req.db.users,
                        attributes: {
                            exclude: ["user_password"],
                        },
                    },
                ],
                limit,
                offset: offset * limit,
            });

            res.json({
                ok: true,
                message: "Teachers",
                data: teachers,
            });
        } catch (error) {
            next(error);
        }
    }
}