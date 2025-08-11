const express = require("express");
const connectiondb = require("../../dbconfig/config");

class SuperClass {
    constructor() {
        this.xRouter = express.Router();
        this.setupRoutes();
    }

    // Calling the process that handles the login function.
    setupRoutes() {
        this.xRouter.post("/loginAuth", (req, res) => {
            const { username_x, password_x } = req.body;

            if (!username_x || !password_x) {
                return res.status(400).json({
                    error: "Username or Password is missing and cannot be empty."
                });
            }

            const sqlQuery = "SELECT email, role FROM users WHERE email = ? AND password_hash = ? AND active = ?";
            const active_default = 1;
            const encode_password = Buffer.from(password_x, "utf8").toString("base64");

            connectiondb.query(sqlQuery, [username_x, encode_password, active_default], (error, result) => {
                if (error) {
                    return res.status(500).json({ error: "Database query error! Please reconnect." });
                }

                if (result.length === 0) {
                    return res.status(401).json({ error: "Invalid credentials or inactive account." });
                }

                const role_x = result[0].role;
                if (req.session) {
                    req.session.role = role_x;
                    req.session.email = result[0].email;
                }

                res.status(200).json({
                    message: "Login successful.",
                    success: "Yes",
                    role: role_x
                });
            });
        });
    }

    getRoutesReturn() {
        return this.xRouter;
    }
}

module.exports = new SuperClass().getRoutesReturn();
