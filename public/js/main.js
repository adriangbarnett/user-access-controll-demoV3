//
function showHidePassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

//
function hideFlashAlert() {
    try {
        var a = document.getElementById("closeFlashAlertBtn");
        var b = document.getElementById("divAlert");
        a.hidden = true;
        b.hidden = true;
    } catch (e) {
        //
    }
}

//
function validateRegisterNewUserInput() {
    console.log("validateRegisterNewUserInput");
}