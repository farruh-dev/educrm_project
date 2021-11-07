const UserRouter = require("./users/UserRoute")

module.exports = async function (app) {
    app.use("/users", UserRouter)
}