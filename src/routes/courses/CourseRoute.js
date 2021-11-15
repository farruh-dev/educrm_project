
const { CourseCreatePostController } = require("../../controllers/CourseController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const CourseRouter = require("express").Router();

CourseRouter.use([authMiddleware, permissionMiddleware])

CourseRouter.post("/", CourseCreatePostController);


module.exports = CourseRouter