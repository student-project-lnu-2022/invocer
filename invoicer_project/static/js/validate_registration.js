function validateRegistration() {
    removeMaxHeightAttribute();
    validate_email();
    validate_password();
    validate_name_and_surname();
    checkAndSetNormalHeightNameAndSurnameInput();
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();


}

function setNormalStateNameInput() {
    document.getElementById("name_input_registration_page").removeAttribute("errorText");
    document.getElementById("name_input_registration_page").removeAttribute("error");
    removeMaxHeightAttribute();
    checkAndSetNormalHeightNameAndSurnameInput();
}

function setNormalStateSurnameInput() {
    document.getElementById("surname_input_registration_page").removeAttribute("errorText");
    document.getElementById("surname_input_registration_page").removeAttribute("error");
    removeMaxHeightAttribute();
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
}

function setNormalStatePasswordInput() {
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
    document.getElementById("password_input_registration_page").removeAttribute("errorText");
    document.getElementById("password_input_registration_page").removeAttribute("error");
}

function setNormalStateRepeatPasswordInput() {
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
    document.getElementById("repeat_password_input_registration_page").removeAttribute("errorText");
    document.getElementById("repeat_password_input_registration_page").removeAttribute("error");
}

function setNormalStateEmailInput() {
    document.getElementById("email_input_registration_page").removeAttribute("errorText");
    document.getElementById("email_input_registration_page").removeAttribute("error");
}

function checkAndSetNormalHeightNameAndSurnameInput() {
    if (document.getElementById("name_input_registration_page").hasAttribute("error") && !(document.getElementById("surname_input_registration_page").hasAttribute("error"))) {
        document.getElementById("surname_input_registration_page").style.maxHeight = "56px";
    }
    if (!(document.getElementById("name_input_registration_page").hasAttribute("error")) && document.getElementById("surname_input_registration_page").hasAttribute("error")) {
        document.getElementById("name_input_registration_page").style.maxHeight = "56px";
    }
}

function checkAndSetNormalHeightPasswordAndRepeatPasswordInput() {
    if (document.getElementById("password_input_registration_page").hasAttribute("error") && !(document.getElementById("repeat_password_input_registration_page").hasAttribute("error"))) {
        document.getElementById("repeat_password_input_registration_page").style.maxHeight = "56px";
    }
    if (!(document.getElementById("password_input_registration_page").hasAttribute("error")) && document.getElementById("repeat_password_input_registration_page").hasAttribute("error")) {
        document.getElementById("password_input_registration_page").style.maxHeight = "56px";
    }
}

function removeMaxHeightAttribute() {
    document.getElementById("surname_input_registration_page").style.maxHeight = null;
    document.getElementById("name_input_registration_page").style.maxHeight = null;
    document.getElementById("password_input_registration_page").style.maxHeight = null;
    document.getElementById("repeat_password_input_registration_page").style.maxHeight = null;
}

function validate_email() {
    var user_email = document.getElementById("email_input_registration_page").value;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email))) {
        document.getElementById("email_input_registration_page").setAttribute("errorText", "You entered an invalid email!");
        document.getElementById("email_input_registration_page").setAttribute("error", "true");
    } else {
        document.getElementById("email_input_registration_page").removeAttribute("errorText");
        document.getElementById("email_input_registration_page").removeAttribute("error");
    }
}

function validate_password() {
    var user_password = document.getElementById("password_input_registration_page").value;
    var user_password_repeat = document.getElementById("repeat_password_input_registration_page").value;
    if (user_password_repeat !== user_password) {
        document.getElementById("repeat_password_input_registration_page").setAttribute("errorText", "Your passwords don't match");
        document.getElementById("repeat_password_input_registration_page").setAttribute("error", "true");
    } else {
        document.getElementById("password_input_registration_page").removeAttribute("errorText");
        document.getElementById("password_input_registration_page").removeAttribute("error");
        document.getElementById("repeat_password_input_registration_page").removeAttribute("errorText");
        document.getElementById("repeat_password_input_registration_page").removeAttribute("error");
    }
    if (user_password.toString() === "") {
        document.getElementById("password_input_registration_page").setAttribute("error", "true");
        document.getElementById("password_input_registration_page").setAttribute("errorText", "This field can't be empty");
    }
    if (user_password_repeat.toString() === "") {
        document.getElementById("repeat_password_input_registration_page").setAttribute("error", "true");
        document.getElementById("repeat_password_input_registration_page").setAttribute("errorText", "This field can't be empty");
    }
}

function validate_name_and_surname() {
    var user_name_input = document.getElementById("name_input_registration_page").value;
    var user_surname_input = document.getElementById("surname_input_registration_page").value;

    if (user_name_input.toString() === "") {
        document.getElementById("name_input_registration_page").setAttribute("error", "true");
        document.getElementById("name_input_registration_page").setAttribute("errorText", "This field can't be empty");
    } else {
        if (user_name_input.toString().length > 35) {
            document.getElementById("name_input_registration_page").setAttribute("errorText", "Your name is too long!");
            document.getElementById("name_input_registration_page").setAttribute("error", "true");
        } else {
            document.getElementById("name_input_registration_page").removeAttribute("errorText");
            document.getElementById("name_input_registration_page").removeAttribute("error");
        }
    }
    if (user_surname_input.toString() === "") {
        document.getElementById("surname_input_registration_page").setAttribute("error", "true");
        document.getElementById("surname_input_registration_page").setAttribute("errorText", "This field can't be empty");
    } else {
        if (user_surname_input.toString().length > 35) {
            document.getElementById("surname_input_registration_page").setAttribute("errorText", "Your surname is too long!");
            document.getElementById("surname_input_registration_page").setAttribute("error", "true");
        } else {
            document.getElementById("surname_input_registration_page").removeAttribute("errorText");
            document.getElementById("surname_input_registration_page").removeAttribute("error");
        }
    }
}