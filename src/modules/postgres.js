require("dotenv").config()
const { Sequelize } = require("sequelize");
const UserModel = require("../models/UserModel");

const sequelize = new Sequelize(process.env.DB_URL, {logging: false})

module.exports = async function() {
    try {
        await sequelize.authenticate();

        const db = {}

        db.users = await UserModel(sequelize, Sequelize)

        await sequelize.sync()

        return db;

    } catch (error) {
        console.log("DATABASE_ERROR", error);
    }
}