const permissionChecker = require("../helpers/permissionChecker")

module.exports = class TeacherController{
    static async CreateTeacherPostController(req, res, next){
        try {
            permissionChecker("admin", req.user_permissions, res.error)
        } catch (error) {
            next(error)
        }
    }
}