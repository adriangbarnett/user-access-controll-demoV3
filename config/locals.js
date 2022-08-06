// Set locals

function init() {

    console.log("Locals: initialize");

    app.locals.copyrightYear = () => {
        return new Date().getFullYear();
    }

    app.locals.minUsernameLen = 1;
    app.locals.maxUsernameLen = 10;
    app.locals.minEmailLen = 1;
    app.locals.maxEmailLen = 50;
    app.locals.minPasswordLen = 1;
    app.locals.maxPasswordLen = 50;
    app.locals.special = false;
    app.locals.upper = false;
    app.locals.lower = false;
    app.locals.number = false;
    app.locals.specialChars = "!£$%^&*()_+=-|,<.>/?:;@'~#\\\"";
    app.locals.upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    app.locals.lowerChars = "abcdefgijklmnopqrstuvwxyz";
    app.locals.numberChars = "0123456789";
    app.locals.testAttr = "testValue1";

    app.locals.myLocalValue1 = "Local1";
}

module.exports =  {
    init
}