const express = require("express");

class Misconduct {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get("/", (req, res) => {
            res.send("<h2>Coming Soon 🚀</h2><p>We’re working hard to bring you something amazing. Our app is currently under development — stay tuned!</p>");
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
