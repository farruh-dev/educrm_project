
const { CreateTeacherPostController, TeacherUpdatePutController } = require("../../controllers/TeacherController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const TeacherRouter = require("express").Router();

TeacherRouter.use([authMiddleware, permissionMiddleware])

TeacherRouter.post("/", CreateTeacherPostController);
TeacherRouter.put("/:teacher_id", TeacherUpdatePutController);

module.exports = TeacherRouter