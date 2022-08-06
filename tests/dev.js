// dev code testing

//

const api = require("../controllers/api.js");

async function get(req, res, next) {
    const list = await api.get_users_all();
    return res.render("userAdminListUsers" , {list: list});
}

async function post(req, res, next) {
    console.log("BODY: " + req.body);
    return res.sent(req.body);
}



module.exports = {
    get,
    post
}