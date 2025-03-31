const { render } = require("ejs");
const expressp = require("express");

class dashboards{
 constructor(){
    this.adminRoutes = expressp.Router();
    this.dashboardsSetup();
 }

dashboardsSetup(){

    this.adminRoutes.get("/dash-app",async (req,res)=>{
    
        const dashPage = ["report","investigations"];

        let {m} = req.query;
        
        if(!dashPage.includes(m)){
            m="main"
        }

        res.render("dashboard",{m});



    });


}

getTemplateReturn(){
    return this.adminRoutes;
}

}



module.exports = dashboards;