module.exports = async function PermissionModel(sequelize, Sequelize){
    return await sequelize.define(
        "permissions",
        {
            permission_name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                lowercase: true
            }
        }
    )
}