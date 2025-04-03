const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const Misconducts = require("./Router/router.js");
const Dashboards = require("./Router/dash.js");
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Fix view directory issue
app.set("views", [
    path.join(__dirname, "subpage"),
    path.join(__dirname, "admin/pages")
]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes

//
const MisconductRoutes = new Misconducts();
const dashboardRoute = new Dashboards();

// Use routes
app.use("/", MisconductRoutes.getRoutes());
app.use("/",dashboardRoute.getTemplateReturn());


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port localhost:${PORT}`);
});
