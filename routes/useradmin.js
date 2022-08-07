const express = require('express');
const router = express.Router();
module.exports = router;

passportController = require("../controllers/passport.js");
useradminPageController = require("../controllers/useradmin.page.js");
permissionController = require("../controllers/permission.js");



// Create
router.get("/createUser", passportController.isAuth, permissionController.authPerm(["user_admin_create"]), useradminPageController.createUser_get);
router.post("/createUser", passportController.isAuth, permissionController.authPerm(["user_admin_create"]), useradminPageController.createUser_post);

// Read
router.get("/userList", passportController.isAuth, permissionController.authPerm(["user_admin_read"]), useradminPageController.userList_get);

// Get one user
router.get("/editUser", passportController.isAuth, permissionController.authPerm(["user_admin_read"]), useradminPageController.editUser_get);

// Update
router.get("/updateUser", passportController.isAuth, permissionController.authPerm(["user_admin_update"]), useradminPageController.updateUser_get);
router.post("/updateUser", passportController.isAuth, permissionController.authPerm(["user_admin_update"]), useradminPageController.updateUser_post);

// Delete
router.get("/deleteUser", passportController.isAuth, permissionController.authPerm(["user_admin_delete"]), useradminPageController.deleteUser_get);

