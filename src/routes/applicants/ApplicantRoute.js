
const { ApplicantGetController, ApplicantPostController } = require("../../controllers/ApplicantController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const ApplicantRouter = require("express").Router();

ApplicantRouter.use([authMiddleware, permissionMiddleware])

ApplicantRouter.get("/", ApplicantGetController);
ApplicantRouter.post("/", ApplicantPostController);


module.exports = ApplicantRouter