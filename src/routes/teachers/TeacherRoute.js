
const { CreateTeacherPostController } = require("../../controllers/TeacherController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const TeacherRouter = require("express").Router();

TeacherRouter.use([authMiddleware, permissionMiddleware])

TeacherRouter.post("/", CreateTeacherPostController);

module.exports = TeacherRouter