
const { CourseCreatePostController } = require("../../controllers/GroupController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const GroupRouter = require("express").Router();

GroupRouter.use([authMiddleware, permissionMiddleware])

GroupRouter.post("/", CourseCreatePostController)

module.exports = GroupRouter