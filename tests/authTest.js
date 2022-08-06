
// DEV TESTING Roles and Permissions
ROLE =  
[
    { name: "role1", permission: [ ] },
    { name: "role2", permission: [ "create" ] },
    { name: "role3", permission: [ "read", "update"] },
    { name: "role4", permission: [ "read", "delete" ] } 
],

PERM = { create: "create", read: "read", update: "update", delete: "delete" }

const USER = { name: "bob", roles: [ "role2", "role3" ] }

//
testcase();


// --------------------------------------------- DEV TESTING -------------------------
// test roles assined to a user has the roles we need
function testcase() {
    result = authPerm([PERM.create,PERM.update])
    console.log(result);
}


// authenticate permission
function authPerm(arrPerms) { 

    // store matchs found
    const matchFound = [];

    if (arrPerms === null || arrPerms === undefined) { return false; }
    if (USER === null || USER === undefined) { return false; }
    if (USER.roles === null || USER.roles === undefined) { return false; }

    // for each permission we want to find
    for(p=0; p!=arrPerms.length; p++) {

        // for each role assigned to the user
        for (r=0; r!=USER.roles.length; r++) {

            // find the role, get permission
            for(fr=0; fr!=ROLE.length; fr++) {

                // check if found rtole same as user role
                if (ROLE[fr].name === USER.roles[r]) {

                    // check if found role contains permission we need
                    // put match into a new array for later compare
                    if (ROLE[fr].permission.includes(arrPerms[p]) === true) {
                        matchFound.push(arrPerms[p]);
                    }
                }
            }
        }
    }

    // compare the array results
    arrPerms.sort();
    matchFound.sort();
    if (arrPerms.length !== matchFound.length) { return false; }

    // console.log(JSON.stringify(arrPerms));
    // console.log(JSON.stringify(matchFound));
    
    // compare the arrays
    if (JSON.stringify(arrPerms) === JSON.stringify(matchFound) == true) {
        return true;
    }
    return false;
}
