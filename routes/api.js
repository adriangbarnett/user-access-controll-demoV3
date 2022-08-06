var express = require('express');
const router = express.Router();
module.exports = router;

const apiController = require ("../controllers/api.js");

// CREATE
router.post("/post_user", async (req, res) => {
    console.log("BODY: " + req.body);
    const ret = await apiController.post_user(req.body);
    return res.send(ret);
})

// GET one by id
router.get("/get_user_byId", async (req, res) => {
    const ret = await apiController.get_user_byId(req.query.id);
    return res.send(ret);
})

// GET all users
router.get("/get_users_all", async (req, res) => {
// TODO: We need to protect these routes 
    const ret = await apiController.get_users_all();
    return res.send(ret);
})

// GET all users
router.get("/get_user_byUsername", async (req, res) => {
        
    const ret = await apiController.get_user_byUsername(req.query.username);
    return res.send(ret);
})

router.patch("/patch_user_byId", async (req, res) => {
        
    const ret = await apiController.patch_user_byId(req.query.id, req.body);
    return res.send(ret);
})

// delete one by id
router.delete("/delete_user_byId", async (req, res) => {
        
    const ret = await apiController.delete_user_byId(req.query.id);
    return res.send(ret);
})

// delete all
router.delete("/delete_users_all", async (req, res) => {
        
    const ret = await apiController.delete_users_all();
    return res.send(ret);
})


