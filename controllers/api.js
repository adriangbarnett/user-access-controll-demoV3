
// API: User CRUD
const { ROLE } = require("../config/roles.js");
const User = require("../models/user.model.js");
const passwordController = require("./password.js");

// create user
async function post_user(user){
    
    try {

        

        try {
            if (user.username == null || user.username.length == 0) {
                return {code: 400, message: "Username required"}; 
            }
    

            if (user.password == null || user.password.length == 0) {
                return {code: 400, message: "Password required"}; 
            }
    
            if (user.email == null || user.email.length == 0) {
                return {code: 400, message: "Email required"}; 
            }
    
            if (await get_user_byUsername(user.username) != null) {
                return {code: 400, message: "Username taken"}; 
            }
        } catch (ex) {
            console.log("EX: " + ex.message)
        }
        

        const passwordErrList = await passwordController.validatePasswordInput(user.password);
        if (passwordErrList != null) {
            return {
                code: 400,
                message: "Password does not meet requiements",
                error: passwordErrList
            }
        }

        const hash = await passwordController.hashPassword(user.password);
        if (hash.code != 200) {
            return hash;
        }


        const createDateTime = Date.now();
        var newUser = new User({
            username: user.username,
            email: user.email,
            password: hash.hashedPassword,
            createdOn: createDateTime,
            updatedOn: createDateTime,
            secret: await passwordController.generateUUID(),
            roles: user.roles
        })
    
        
        const ret = (await newUser.save());
        return {code: 200, message: "User added", user: ret};
    
    } catch (e) {
        console.log("400E: " + e.message)
        return {code: 400, message: e.message};
    }  
}


// Find one by id
async function get_user_byId(id){

    try {
        const ret = await User.findById({_id: id}).select("-password -__v");
        return ret;
    } catch (e) {
        return {code: 400, message: e.message};
    }
}


// Find all users
async function get_users_all(){
    try {
        const ret = await User.find().select("-password -__v");
        return ret;
    } catch (e) {
        return {code: 400, message: "Bad request, " + e.message};
    }
}


// Find one by username
async function get_user_byUsername(username){
    try {
        const ret = await User.findOne({username: username}).select("-password -__v");
        return ret;
    } catch (e) {
        return {code: 400, message: "Bad request, " + e.message};
    }
}


// Update one by id
async function patch_user_byId(id, newUser){

    try {

        const newData = {};

        if (id == null) {
            return {code: 400, message: "id required"};
        }

        // validation checks
        const thisUser = await User.findOne({_id: id});


        if (thisUser == null){
            return {code: 400, message: "User not found by id"};
        }

        if(newUser.password != null) {

            // check password
            const passwordErrList = await passwordController.validatePasswordInput(newUser.password);
            if (passwordErrList != null) {
                return {
                    code: 400,
                    message: "Password not meet requiements",
                    error: passwordErrList
                }
            }

            // hash
            const hash = await passwordController.hashPassword(newUser.password);
            if (hash.code != 200) {
                return hash; // error
            }
            newData.password = hash.hashedPassword;
        }

        if(newUser.username != null) {
            if (thisUser.username != newUser.username) {
                if (await User.findOne({username: newUser.username}) != null) {
                    return {code: 400, message: "Username taken"};
                }
             }
            newData.username = newUser.username;
        }

        if(newUser.email != null) {
            newData.email= newUser.email;
        }

        if(newUser.verified != null) {
            newData.verified= newUser.verified;
        }    
        
        if(newUser.roles != null) {
            newData.roles= newUser.roles;
        }    

        // find then update
        newData.updatedOn = Date.now();

        const ret = await User.findOneAndUpdate({_id: id}, 
            { 
                $set: newData 
            },
            {
                new: true
            }).select('-password -__v');

        if (ret ==  null ){
            return {code: 400, message: "User not found by id"};   
        }
        return {code: 200, message: "User updated", user: ret}; 

    } catch (e) {
        console.log("EX " + e.message);
        return {code: 400, message: "Bad request, " + e.message};
    }
    
}


// Delete one by id
async function delete_user_byId(id) {

    try {
        if(id == null) {
            return {code: 400, message: "Missing id"};
        }
        const ret = await User.deleteOne({_id: id});
        return ret;
    } catch (e) {
        return {code: 400, message: "Bad request, " + e.message};
    }
}


// Delete all
async function delete_users_all() {

    try {
        const ret = await User.deleteMany();
        return  ret;
    } catch (e) {
        return {code: 400, message: "Bad request, " + e.message};
    } 
}


module.exports = {
    post_user,
    get_user_byId,
    get_users_all,
    get_user_byUsername,
    delete_user_byId,
    delete_users_all,
    patch_user_byId
}