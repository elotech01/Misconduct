const express = require("express");

class Misconduct {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get("/app", (req, res) => {
            res.send("<h1>Welcome to app page</h1>");
        });

        this.router.get("/authentication/:page?", async (req, res) => {
            const subPage = ["student", "admin"]; // Valid templates
            let { page } = req.params;

            if (!subPage.includes(page)) {
                page = "signin"; // Default EJS file
            }

          //  console.log("Rendering page:", page); // Debugging

            res.render("layout/pages", { page }); // Pass only relative path
        });

        //setting up admin
       
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = Misconduct;
