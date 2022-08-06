function showHidePassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function hideFlashAlert() {
    var a = document.getElementById("closeFlashAlertBtn1");
    var b = document.getElementById("divAlert1");
    a.hidden = true;
    b.hidden = true;
}
