module.exports = async function TeacherModel(sequelize, Sequelize){
    return await sequelize.define(
        "teachers", 
        {
            teacher_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4(),
                allowNull: false,
                primaryKey: true
            },
            teacher_phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            teacher_skills: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
                allowNull: false
            }
        }
    )
}