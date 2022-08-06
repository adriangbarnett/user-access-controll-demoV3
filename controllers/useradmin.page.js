// user admin page controller
const api = require ("./api.js");
const { ROLE } = require("../config/roles.js");
const User = require("../models/user.model.js");
const passwordController = require("./password.js");

// Create: get
function user_admin_create_get(req, res) { 
    res.render("userAdminCreateGet", {username: "", email: "", message: "", errList: "", roles: ROLE, currentUser: req.user});
}


// Create user
async function user_admin_create_post(req, res) {

    try {

        //TODO Add Length validation

        // set user
        let user = req.body;

        // compare the ROLE assigned with roles names in DB, then put assigned role into array if they are valid
        let newRoles = [];

        // set role array, compatiable with api
        user.roles = createUpdateRoleCompare(req, res);

        // Add user
        const ret = await api.post_user(user)
        if (ret.code != 200) {
            if (ret.error) {
                return res.render("userAdminCreateGet", {username: user.username, email: user.email, message: ret.message, errList: ret.error, roles: ROLE, currentUser: req.user});
            }
            return res.render("userAdminCreateGet", {username: user.username, email: user.email, message: ret.message, errList: null, roles: ROLE, currentUser: req.user});
        }
        return res.redirect("/login");


    } catch (e) {
        console.log("EE:" + e.message)
        //return res.status(500).send("500 error, Oops" + e.message); 
        return res.render("userAdminCreateGet", {username: user.username, email: user.email, message: e.message, errList: null, roles: ROLE, currentUser: req.user});
    }
}

// Update: GET
async function user_admin_update_get(req, res) { 
    return res.send("user_admin_update_get");
}

// Update user: POST
async function user_admin_update_post(req, res) { 

    try {

        // set user
        let user = req.body;


        //TODO: Find a way to check validation input before we try to save and return an error!
        // check input
        // const inputValResult = passwordController.validateUserInput(user);
        // if (inputValResult !== null ){
        //     const errRet = user;
        //     errRet.errList = inputValResult
        //     return res.render("userAdminEditUser", {user: user, returnData: errRet, roles: ROLE, currentUser: req.user});
        // }
        //console.log("RESULT: " + inputValResult);
        //return res.send("ERROR: " + inputValResult.errList);

      

        // compare the ROLE assigned with roles names in DB, then put assigned role into array if they are valid
        user.roles = createUpdateRoleCompare(req, res);

        // TODO: add code here to check that ID has not been tampred with.
        // Update user, TODO: add code here to handle updated password
        var newUserData = new User({
            username: user.username,
            email: user.email,
            updatedOn: Date.now(),
            roles: user.roles
        })

        // Update
       

        // patch the user
        const ret = await api.patch_user_byId(user.id, newUserData)

        // set ID from _id to use on the form!
        ret.id = ret._id; 
        if (ret.code != 200) {
            if (ret.error) { // TODO: fgix this
                return res.render("userAdminEditUser", {user: user, returnData: ret, roles: ROLE, currentUser: req.user});
            }
            return res.render("userAdminEditUser", {user: user, returnData: ret, roles: ROLE, currentUser: req.user});
        }
        // Success
        //return res.render("userAdminEditUser", {user: user, message: ret.message, errList: null, roles: ROLE, currentUser: req.user});
        return res.render("userAdminEditUser", {user: user, returnData: ret, roles: ROLE, currentUser: req.user});


    } catch (e) {
        return res.status(500).send("500 error, Oops" + e.message);  
    }
    
}

// compare the ROLE assigned with roles names in DB, then put assigned role into array if they are valid
function createUpdateRoleCompare(req, res){

    let newRoles = [];
    strReqBody = JSON.stringify(req.body);

    // test if user is trying to set system role when they are not allowed to do so!
    if (strReqBody.includes("system") === true && req.user.roles.includes("system") !== true) {
        return res.render("permissionDenied", {message: "You do not have permission to set [system] role"}); 
    }

    // compare sent req.body.role name is valid with config
    for(r=0; r!=ROLE.length; r++) {
        if (strReqBody.includes("role." + ROLE[r].name) === true) {
            newRoles.push(ROLE[r].name);
        }
    }
    return newRoles;
}




// Read: GET list
async function user_admin_list_get(req, res) { 
    const list = await api.get_users_all();
    return res.render("userAdminListUsers" , {list: list});
}


// Read: GET one
async function user_admin_read_get(req, res) { 

    // error check
    if (req.query.id === null || req.query.id === undefined) { 
        return res.redirect("http://localhost:3000/admin/user_admin_list_get");
    }

    // find user and show it
    const user = await api.get_user_byId(req.query.id);
    return res.render("userAdminEditUser", {user: user, returnData: "", roles: ROLE, currentUser: req.user});
}



// Delete: get
// async function user_admin_delete_get(req, res) { 
//     res.send("nothing to see here");
// }

// Delete: post
async function user_admin_delete_post(req, res) { 
    
    const id = req.body.id;

    // error check
    if (id === null || id === undefined) { 
        return res.redirect("/admin/user_admin_list_get");
    }

    // check if current user not system admin and target user is system amdin
    const targetUser = await api.get_user_byId(id)

    if (req.user.roles.includes("system") === false && targetUser.roles.includes("system") === true) { 
        // get the target user from db and check its roles
        return res.render("permissionDenied", {message: "You do not have permission to delete user with [system] role"}); 
    }

    // find user and delete it
    const user = await api.delete_user_byId(id);
    return res.redirect("/admin/user_admin_list_get");

}


module.exports = {
    //
    user_admin_create_get,
    user_admin_create_post,
    //
    user_admin_read_get,
    user_admin_list_get,
    //
    user_admin_update_get,
    user_admin_update_post,
    //
    //user_admin_delete_get,
    user_admin_delete_post
}