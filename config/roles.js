// Built in roles

ROLE = [
    {
        name: "system", 
        permission: "system"
    },    
    {
        name: "user",
        permission: ["user_index_read","profile_read","profile_update","profile_delete"]
    },
    {
        name: "user_admin",
        permission: ["user_admin_index_read","user_admin_create","user_admin_read","user_admin_update","user_admin_delete" ] 
    },
    {
        name: "project_admin",
        permission: [ "project_index_read","project_create","project_read","project_update","project_delete" ]
    },
    {
        name: "project_item_admin",
        permission: [ "project_read","project_item_index_read","project_item_read","project_item_create","project_item_update","project_item_delete" ]
    }
    ,
    {
        name: "my_custom_role",
        permission: [ "project_read","project_item_read" ]
    }
]

module.exports = {
    ROLE
}