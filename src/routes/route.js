const errorHandler = require("../helpers/errorHandler")
const TeacherRouter = require("./teachers/TeacherRoute")
const UserRouter = require("./users/UserRoute")
const CourseRouter = require("./courses/CourseRoute")

module.exports = async function (app) {
    try{
        app.use("/users", UserRouter)
        app.use("/teachers", TeacherRouter)
        app.use("/courses", CourseRouter)
        
    }finally{
        app.use(errorHandler);
    }
}