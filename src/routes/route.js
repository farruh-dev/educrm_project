const errorHandler = require("../helpers/errorHandler")
const TeacherRouter = require("./teachers/TeacherRoute")
const UserRouter = require("./users/UserRoute")

module.exports = async function (app) {
    try{
        app.use("/users", UserRouter)
        app.use("/teachers", TeacherRouter)
        
    }finally{
        app.use(errorHandler);
    }
}