const { generateCrypt } = require("../bcrypt");

async function init(db){
    const count = await db.users.count();

    if(count === 0){
        try {
            const initial_user = await db.users.create({
                user_username: "admin",
                user_name: "admin",
                user_password: await generateCrypt("admin"),
                user_gender: "male"
            })
    
        } catch (error) {
            console.log("INIT_ERROR", error);
        }
    } 
}

module.exports = init