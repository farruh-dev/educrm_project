const errorHandler = require("../helpers/errorHandler")
const TeacherRouter = require("./teachers/TeacherRoute")
const UserRouter = require("./users/UserRoute")
const CourseRouter = require("./courses/CourseRoute")
const ApplicantRouter = require("./applicants/ApplicantRoute")
const GroupRouter = require("./groups/GroupRoute")

module.exports = async function (app) {
    try{
        app.use("/users", UserRouter)
        app.use("/teachers", TeacherRouter)
        app.use("/courses", CourseRouter)
        app.use("/applicants", ApplicantRouter)
        app.use("/groups", GroupRouter)
        
    }finally{
        app.use(errorHandler);
    }
}