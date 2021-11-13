const permissionChecker = require("../helpers/permissionChecker")

module.exports = class TeacherController{
    static async CreateTeacherPostController(req, res, next){
        try {
            permissionChecker("admin", req.user_permissions, res.error)

            console.log("HEllo");

            res.status(200).json({
                ok: true,
                message: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
}