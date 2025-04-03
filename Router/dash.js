const { render } = require("ejs");
const expressp = require("express");

class Dashboards {
    constructor() {
        this.adminRoutes = expressp.Router();
        this.dashboardsSetup();
    }

    dashboardsSetup() {
        this.adminRoutes.get("/dash-app", async (req, res) => {
            const dashPage = ["create-report", "investigations","appeals","actions","users"];

            let m = req.query.pg ? Buffer.from(req.query.pg, 'base64').toString('utf-8') : "main"; // Fixed destructuring issue

            if (!dashPage.includes(m)) {
                m = "main";
            }

            res.render("dashboard", { m });
        });

        
    }

    getTemplateReturn() {
        return this.adminRoutes;
    }
}

module.exports = Dashboards;
