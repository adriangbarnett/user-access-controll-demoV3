const express = require('express');
const router = express.Router();
module.exports = router;
apiController = require ("../controllers/api.js");
passportController = require("../controllers/passport.js");

//
router.get("/", passportController.isNotAuth, (req, res) => {
    return res.redirect("/login");
})


// login
router.get("/login", passportController.isNotAuth, (req, res) => {
    return res.render("login", {error: req.query.error, resetpwd: req.query.resetpwd});
})

// dashboard
router.get("/dashboard", passportController.isAuth, (req, res) => {
    if(!req.user.username) {
        return res.render("dashboard", {username: "CODE DEFECT - USER NAME IS NOT SET!"});
    }
    return res.render("dashboard", {user: req.user});
})

// Reset Password
router.get("/resetpwd", passportController.isNotAuth, (req, res) => {
    return res.render("resetpwd");
})

// Reset Password
router.post("/resetpwd", passportController.isNotAuth, (req, res) => {
    return res.redirect("/login?resetpwd=true");
})


// Register
router.get("/register", passportController.isNotAuth, (req, res) => {
    return res.render("register", {username: "", password: "", email: "", password: "", message: "", error: ""});
})


// Register
router.post("/register", async (req, res) => {
    try {

        console.log("Post: register");
        const user = req.body;
        const ret = await apiController.post_user(user)
        if (ret.code != 200) {
            if (ret.error) {
                return res.render("register", {username: user.username, password: user.password, email: user.email, message: ret.message, errList: ret.error});
            }
            return res.render("register", {username: user.username, password: user.password, email: user.email, message: ret.message, errList: null});
        }
        return res.redirect("/login");

    } catch (e) {
        console.log("EE:" + e.message)
        return res.render("register", {username: user.username, password: user.password, email: user.email, message: e.message, errList: null});
    }
})
