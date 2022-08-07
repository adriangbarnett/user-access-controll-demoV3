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

         // FIX THE ROLES !
        let newRoles = [];
        const strReqBody = JSON.stringify(req.body);

        // check not trying to hack system admin role
        if (strReqBody.includes("system") === true && req.user.roles.includes("system") !== true) {
            return res.render("permissionDenied", {message: "You do not have permission to set [system] role"}); 
        }

        // Add only assigned roles to the array
        for(r=0; r!=ROLE.length; r++) {
            if (strReqBody.includes("role." + ROLE[r].name) === true) {
                newRoles.push(ROLE[r].name);
            }
        }
        user.roles = newRoles;
        console.log("FIXED: " + newRoles);


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

         // FIX THE ROLES !
         let newRoles = [];
         const strReqBody = JSON.stringify(req.body);
         console.log("strReqBody: " + strReqBody);
 
         // check not trying to hack system admin role
         if (strReqBody.includes("system") === true && req.user.roles.includes("system") !== true) {
             return res.render("permissionDenied", {message: "You do not have permission to modify a [system] role"}); 
         }
         
         // Add only assigned roles to the array
         for(r=0; r!=ROLE.length; r++) {
             if (strReqBody.includes("role." + ROLE[r].name) === true) {
                 newRoles.push(ROLE[r].name);
             }
         }
         user.roles = newRoles;
         console.log("FIXED: " + newRoles);


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
async function createUpdateRoleCompare(req, res){

    let newRoles = [];
    strReqBody = JSON.stringify(req.body);

    // test if user is trying to set system role when they are not allowed to do so!
    if (strReqBody.includes("system") === true && req.user.roles.includes("system") !== true) {
        return res.render("permissionDenied", {message: "You do not have permission to set [system] role"}); 
    }
        // check if the target user does not already have system role
        // we need to do this so we dont accitandnly set back the systenm role as un-checked
        // if it was previously checked.
        
        //return res.render("permissionDenied", {message: "You do not have permission to set [system] role"}); 

        // const targetUser = await api.get_user_byId(req.body.id);
        // console.log("TARGET: " + targetUser);
        // if (targetUser.roles.includes("system") === false) {
           
        // }
   

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