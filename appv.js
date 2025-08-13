require('dotenv').config({ path: './dbconfig/.env' });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const express_sessions = require("express-session");
const Misconducts = require("./Router/router.js");
const Dashboards = require("./Router/dash.js");
const session = require("express-session");
const superclass = require("./subpage/layout/function.js");

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

//session
app.use(session({
secret:process.env.SESSION_SECRET,
resave:false,
saveUninitialized:true,
cookie:{secure:true}
}));


// Import Routes

//
const MisconductRoutes = new Misconducts();
const dashboardRoute = new Dashboards();

//SuperClass


// Use routes
app.use("/", MisconductRoutes.getRoutes());
app.use("/",dashboardRoute.getTemplateReturn());

///loginAuth
app.use("/", superclass);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port localhost:${PORT}`);
    
});

//what is next now 