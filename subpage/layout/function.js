const express = require("express");
const nrouter = express.Router();
const connectiondb = require("../../dbconfig/config");

//
//SELECT email, role FROM `users` WHERE email='' and password_hash='' and 
//Calling the process that handles the login function."

nrouter.post("/loginAuth",(req,res)=>{
const {username_x, password_x} = req.body;
const sqlQuery = "SELECT email, role FROM users WHERE email = ? AND password_hash = ? AND active = ?";
 
//
if(!username_x || !password_x){
    return res.status(400).json({error:"Username OR Password are missing and cannot be empty"});
}
const active_default = 1;
const decode_password = Buffer.from(password_x,"utf8").toString("base64");
connectiondb.query(sqlQuery,[username_x,decode_password,active_default],(error,result)=>{

    if(error){
        return result.status(500).json({error:"Database query Error! Reconnect"});
    }

    if(result.length===0){
 return res.status(401).json({ error: "Invalid credentials or inactive account." });
    }

const role_x = result[1].role;
req.session.role = role_x;
req.session.email = result[0].email;

res.status(200).json({messagok:"Login successful.",success:"Yes",role_x:role_x});
    
});



});