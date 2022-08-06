// Expermiemental code, array sandbox

// Array tools, turotial: https://www.youtube.com/watch?v=R8rmfD9Y5-c

const { ROLE } = require("../config/roles.config.js");
const { PERSMISSION, PERMISSION } = require("../config/permissions.config.js");


const items = [
    { name: "one",      price: 100 },
    { name: "two",      price: 200 },
    { name: "three",    price: 10 },
    { name: "four",     price: 20 },
    { name: "five",     price: 25 },
    { name: "six",      price: 101 },
    { name: "seven",    price: 6 },
    { name: "eight",    price: 10 },
    { name: "nine",     price: 5 },
    { name: "ten",      price: 100 },
]
const words = [ "one", "two", "three", "four", "five", "six" ]

const numbers = [ 1, 2, 3, 4, 5 ]


// filter, get items that are < or = to 100
const filter1 = items.filter((item) => {
    return item.price <= 100;
});

// map, take attr from array and put into a new array
const map1 = items.map((item) => {
    return item.price;;
});
const map2 = items.map((item) => {
    return item.name;;
});

// find an object in array (firsts the first)
const found = items.find((item) => {
    return item.name === "eight";
});
// foreach
function forEach(){
    items.forEach((item) => {
        console.log(item.name);
    });
}
// check if 1 or more items the array is <= 100 then return true or false
const some = items.some((item) => {
    return item.price <= 100
});
// check if ALL items in array are <=100, return true or false
const every = items.every((item) => {
    return item.price <= 100
});
// sum all price together
const total = items.reduce((currentTotal, item) => {
    return item.price + currentTotal;
}, 0);

// check if an array includes a value
const includeN = numbers.includes(2);
const includeS = words.includes("two");
const includeR = ROLE.includes("user");



// dev testing
function run(req, res){
    try {
    //const isFound = authPerm([PERMISSION.user_admin_create, PERMISSION.user_admin_read]);
    const isFound = authPerm(["user_admin_create","user_admin_read"]);
    res.send("ok");
    
    //const result = findPermissionInRole("user_admin", "user_admin_read");
    //res.send("result: " + result);
    } catch (e) {
        res.send(e);
    }

}



module.exports = {
    run, 
}
