const mysql2=require("mysql2");

const pool=mysql2.createPool({
    host:"172.18.3.166",
    user:"project",
    password:"manager",
    database:"project_db"

});
module.exports=pool;