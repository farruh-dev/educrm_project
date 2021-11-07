require("dotenv").config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DB_URL)

module.exports = async function() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log("DATABASE_ERROR", error);
    }
}