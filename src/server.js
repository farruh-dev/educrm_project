const express = require("express");
const morgan = require("morgan");
const route = require("./routes/route");

const app = express()

async function server(port, mode){
    try {
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        app.listen(port || 3536, () => { console.log("Server is ready")})

        if(mode == "dev"){
            app.use(morgan("dev"));
        }
        
    } catch (error) {
        console.log("SERVER_ERROR: ", error);
    }finally{
        route(app);
    }
}

module.exports = server;