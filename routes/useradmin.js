const express = require('express');
const router = express.Router();
module.exports = router;

passportController = require("../controllers/passport.js");
useradminPageController = require("../controllers/useradmin.page.js");
permissionController = require("../controllers/permission.js");

// User Admin

// Create
router.get("/user_admin_create_get", passportController.isAuth, permissionController.authPerm(["user_admin_create"]), useradminPageController.user_admin_create_get);
router.post("/user_admin_create_post", passportController.isAuth, permissionController.authPerm(["user_admin_create"]), useradminPageController.user_admin_create_post);

// Read
router.get("/user_admin_list_get", passportController.isAuth, permissionController.authPerm(["user_admin_read"]), useradminPageController.user_admin_list_get);
router.get("/user_admin_read_get", passportController.isAuth, permissionController.authPerm(["user_admin_read"]), useradminPageController.user_admin_read_get);

// Update
router.get("/user_admin_update_get", passportController.isAuth, permissionController.authPerm(["user_admin_update"]), useradminPageController.user_admin_update_get);
router.post("/user_admin_update_post", passportController.isAuth, permissionController.authPerm(["user_admin_update"]), useradminPageController.user_admin_update_post);

// Delete
//router.get("/user_admin_delete_get", passportController.isAuth, permissionController.authPerm(["user_admin_delete"]), useradminPageController.user_admin_delete_get);
router.post("/user_admin_delete_post", passportController.isAuth, permissionController.authPerm(["user_admin_delete"]), useradminPageController.user_admin_delete_post);

