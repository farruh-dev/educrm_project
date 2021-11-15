
const { ApplicantGetController, ApplicantPostController, ApplicantPutController } = require("../../controllers/ApplicantController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const ApplicantRouter = require("express").Router();

ApplicantRouter.use([authMiddleware, permissionMiddleware])

ApplicantRouter.get("/", ApplicantGetController);
ApplicantRouter.post("/:course_id", ApplicantPostController);
ApplicantRouter.put("/:applicant_id", ApplicantPutController);


module.exports = ApplicantRouter