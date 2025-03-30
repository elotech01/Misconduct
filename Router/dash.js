const expressp = require("express");

class dashboards{
 constructor(){
    this.adminRoutes = expressp.Router();
    this.dashboardsSetup();
 }

dashboardsSetup(){

    this.adminRoutes.get("/dash-app",async (req,res)=>{
        res.send("the app is working fine");
    })


}

}



module.exports = dashboards;