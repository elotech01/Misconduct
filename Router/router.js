const express = require("express");
const router  = express.Router();


//const PORT  = process.env.PORT || 3000;



router.get("/",(req,res)=>{
    res.send("welcome here now now");
});



router.get("/signin",(req,res)=>{
    res.send("this is signin page now");
});



module.exports = router;