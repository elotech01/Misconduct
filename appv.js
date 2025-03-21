const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Fix view directory issue
app.set("views", path.join(__dirname, "view"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const route = require("./Router/router.js");

// Use routes
app.use("/", route);

// Authentication route for user-login, admin-login, staff-login
app.get("/authentication/:type?", (req, res) => {
    const subPage = ["staff", "admin"];
    let { Page } = req.params;

    if (!subPage.includes(Page)) {
        Page = path.join(__dirname,"/view/users/signin"); // Default page
    }

    res.render("layouts/pages", {Page });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
