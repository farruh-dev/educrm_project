require("dotenv").config()
const { Sequelize } = require("sequelize");
const PermissionModel = require("../../models/PermissionModel");
const SessionModel = require("../../models/SessionModel");
const TeacherModel = require("../../models/TeacherModel");
const UserModel = require("../../models/UserModel");
const UserPermissionsModel = require("../../models/UserPermissionsModel");
const CourseModel = require("../../models/CourseModel");
const init = require("./init");
const relations = require("./relations");

const sequelize = new Sequelize(process.env.DB_URL, {logging: false})

module.exports = async function() {
    try {
        await sequelize.authenticate();

        const db = {}

        db.users = await UserModel(sequelize, Sequelize)
        db.sessions = await SessionModel(sequelize, Sequelize)
        db.permissions = await PermissionModel(sequelize, Sequelize)
        db.user_permissions = await UserPermissionsModel(sequelize, Sequelize)
        db.teachers = await TeacherModel(sequelize, Sequelize)
        db.courses = await CourseModel(sequelize, Sequelize)

        await relations(db)
        
        
        await sequelize.sync({force: false})
        
        await init(db);

        return db;

    } catch (error) {
        console.log("DATABASE_ERROR", error);
    }
}