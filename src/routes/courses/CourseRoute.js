
const { CourseCreatePostController,CourseGetController,CourseUpdatePutController, CourseGetOneController } = require("../../controllers/CourseController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const CourseRouter = require("express").Router();

CourseRouter.use([authMiddleware, permissionMiddleware])

CourseRouter.get("/", CourseGetController);
CourseRouter.post("/", CourseCreatePostController);
CourseRouter.put("/:course_id", CourseUpdatePutController);

CourseRouter.get("/:course_id", CourseGetOneController);

module.exports = CourseRouter