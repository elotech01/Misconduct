require('dotenv').config({ path: './dbconfig/.env' });

//const encoded = Buffer.from("password","utf8").toString("base64");
const test = process.env.SESSION_SECRET;

console.log(test);