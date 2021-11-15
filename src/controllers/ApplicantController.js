const permissionChecker = require("../helpers/permissionChecker");
const { AddApplicantValidation, UpdateApplicantValidation } = require("../modules/validations");

module.exports = class ApplicantController{
    static async ApplicantGetController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const limit = req.query.limit || 15;
            const offset = req.query.offset - 1 || 0;

            const applicants = await req.db.applicants.findAll({
                limit,
                offset: offset * 15,
                include: [
                    {
                        model: req.db.users,
                    },
                    {
                        model: req.db.courses,
                    },
                ],
            });

            res.json({
                ok: true,
                message: "OK",
                data: {
                    applicants,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    static async ApplicantPostController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: {
                    course_id,
                },
            });

            if (!course) {
                throw new res.error(404, "Course is not found");
            }

            const data = await AddApplicantValidation(req.body, res.error);

            const applicant = await req.db.applicants.create({
                applicant_name: data.name,
                applicant_gender: data.gender,
                applicant_birth_date: data.birth_date,
                applicant_description: data.description,
                applicant_phone: data.phone,
                applicant_source: data.source,
                applicant_status: "waiting",
                course_id: course_id,
                user_id: req.session.user_id,
            });

            console.log(applicant)

            res.status(201).json({
                ok: true,
                message: "Created successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    static async ApplicantPutController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const applicant_id = req.params.applicant_id;

            const applicant = await req.db.applicants.findOne({
                where: {
                    applicant_id,
                },
            });

            if (!applicant) {
                throw new res.error(404, "Applicant is not found");
            }

            const request = {
                name: req.body.name ? req.body.name : applicant.applicant_name,
                gender: req.body.gender ? req.body.gender : applicant.applicant_gender,
                birth_date: req.body.birth_date ? req.body.birth_date : applicant.applicant_birth_date,
                description: req.body.description ? req.body.description : applicant.applicant_description,
                phone: req.body.phone ? req.body.phone : applicant.applicant_phone,
                source: req.body.source ? req.body.source: applicant.applicant_source,
                status: req.body.status ? req.body.status : applicant.applicant_status
            }

            const data = await UpdateApplicantValidation(request, res.error);

            await req.db.applicants.update(
                {
                    applicant_name: data.name,
                    applicant_gender: data.gender,
                    applicant_birth_date: data.birth_date,
                    applicant_description: data.description,
                    applicant_phone: data.phone,
                    applicant_source: data.source,
                    applicant_status: data.status,
                },
                {
                    where: {
                        applicant_id,
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