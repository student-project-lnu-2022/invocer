const passwordMinLength = 8;
const passwordMaxLength = 15;
const nameSurnMaxLength = 35;
const host = "http://127.0.0.1:8000/";
const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const emailForm = document.getElementById("email_input_registration_page");
const nameForm = document.getElementById("name_input_registration_page");
const surnameForm = document.getElementById("surname_input_registration_page");
const passForm = document.getElementById("password_input_registration_page");
const repeatPassForm = document.getElementById("repeat_password_input_registration_page");


function validateRegistration() {
    removeMaxHeightAttribute();
    let names = validate_name_and_surname();
    let email = validate_email();
    let passwords = validate_passwords();
    
    checkAndSetNormalHeightNameAndSurnameInput();
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
    return (email && passwords && names)
}

function setNormalStateNameInput() {
    nameForm.removeAttribute("errorText");
    nameForm.removeAttribute("error");
    removeMaxHeightAttribute();
    checkAndSetNormalHeightNameAndSurnameInput();
}

function setNormalStateSurnameInput() {
    surnameForm.removeAttribute("errorText");
    surnameForm.removeAttribute("error");
    removeMaxHeightAttribute();
    checkAndSetNormalHeightNameAndSurnameInput();
}

function setNormalStatePasswordInput() {
    passForm.removeAttribute("errorText");
    passForm.removeAttribute("error");
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
}

function setNormalStateRepeatPasswordInput() {
    repeatPassForm.removeAttribute("errorText");
    repeatPassForm.removeAttribute("error");
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
}

function setNormalStateEmailInput() {
    emailForm.removeAttribute("errorText");
    emailForm.removeAttribute("error");
}

function checkAndSetNormalHeightNameAndSurnameInput() {
    if (nameForm.hasAttribute("error") && !(surnameForm.hasAttribute("error"))) {
        surnameForm.style.maxHeight = "56px";
    }
    if (!(nameForm.hasAttribute("error")) && surnameForm.hasAttribute("error")) {
        nameForm.style.maxHeight = "56px";
    }
}

function checkAndSetNormalHeightPasswordAndRepeatPasswordInput() {
    if (passForm.hasAttribute("error") && !(repeatPassForm.hasAttribute("error"))) {
        repeatPassForm.style.maxHeight = "56px";
    }
    if (!(passForm.hasAttribute("error")) && repeatPassForm.hasAttribute("error")) {
        passForm.style.maxHeight = "56px";
    }
}

function removeMaxHeightAttribute() {
    surnameForm.style.maxHeight = null;
    nameForm.style.maxHeight = null;
    passForm.style.maxHeight = null;
    repeatPassForm.style.maxHeight = null;
}


function validate_email() {
    let user_email = emailForm.value;
    let result = false;
    
    if (user_email.includes(' ')) {
        emailForm.setAttribute("errorText", "Email can't contain whitespace");
        emailForm.setAttribute("error", "true");
    } else if (!(/^[a-zA-Z0-9.]{6,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(user_email))) {
        emailForm.setAttribute("errorText", "You entered an invalid email!");
        emailForm.setAttribute("error", "true");
    } else {
        emailForm.removeAttribute("errorText");
        emailForm.removeAttribute("error");
        result = true;
    }
    return result;
}

function validate_passwords() {
    let userPassword = passForm.value;
    let userPasswordRepeat = repeatPassForm.value;
    
    let passwordResult = false;
    let repeatPasswordResult = false;
    let match = true;

    if (userPassword.includes(' ')) {
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", "Password can't contain whitespace");
    }
    else if (userPassword.length < passwordMinLength) {
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", `Password must have at least ${passwordMinLength} characters`);
    } else if (userPassword.length > passwordMaxLength) {
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", `Password must have at most ${passwordMaxLength} characters`);
    } else if (!(/^[a-z0-9]+$/i.test(userPassword))) {
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", "Only latin letters and numbers are allowed");
    }
    else if (!(/\d/.test(userPassword))) {
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", "Password must contain number");
    } else if (!(/[A-Z]/.test(userPassword))) {
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", "Password must contain capital letter");
    } else {
        passForm.removeAttribute("errorText");
        passForm.removeAttribute("error");
        passwordResult = true;
    }

    if (userPasswordRepeat.includes(' ')) {
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", "Password can't contain whitespace");
    }
    else if (userPasswordRepeat.length < passwordMinLength) {
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", `Password must have at least ${passwordMinLength} characters`);
    } else if (userPasswordRepeat.length > passwordMaxLength) {
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", `Password must have at most ${passwordMaxLength} characters`);
    } else if (!(/^[a-z0-9]+$/i.test(userPasswordRepeat))) {
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", "Only latin letters and numbers are allowed");
    } else if (!(/\d/.test(userPasswordRepeat))) {
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", "Password must contain number");
    } else if (!(/[A-Z]/.test(userPasswordRepeat))) {
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", "Password must contain capital letter");
    } else {
        repeatPassForm.removeAttribute("errorText");
        repeatPassForm.removeAttribute("error");
        repeatPasswordResult = true;
    }
    if (userPassword !== userPasswordRepeat) { 
        match = false;
        passForm.setAttribute("error", "true");
        passForm.setAttribute("errorText", "Passwords don't match");
       
        repeatPassForm.setAttribute("error", "true");
        repeatPassForm.setAttribute("errorText", "Passwords don't match");
        
    }

    // console.log("match:", match);
    // console.log("pass", passwordResult);
    // console.log("repeat", repeatPasswordResult);
    return (match && passwordResult && repeatPasswordResult) 
}

function validate_name_and_surname() {
    let nameInput = nameForm.value;
    let surnameInput = surnameForm.value;
    let nameResult = false;
    let surnameResult = false;

    if (!nameInput) {
        nameForm.setAttribute("error", "true");
        nameForm.setAttribute("errorText", "This field can't be empty");
    } else if (nameInput.includes(' ')) { 
        nameForm.setAttribute("error", "true");
        nameForm.setAttribute("errorText", "Name can't contain whitespace");
    } else if (nameInput.length > nameSurnMaxLength) {
        nameForm.setAttribute("error", "true");
        nameForm.setAttribute("errorText", `Name can't be longer than ${nameSurnMaxLength} characters`);
    } else if (!(/^[a-z]+$/i.test(nameInput))) {
        nameForm.setAttribute("error", "true");
        nameForm.setAttribute("errorText", "Only latin letters are allowed");
    } else if(!(/[A-Z]/.test(nameInput.charAt(0)))){
        nameForm.setAttribute("error", "true");
        nameForm.setAttribute("errorText", "First letter has to be capital");
    } else {
        nameForm.removeAttribute("errorText");
        nameForm.removeAttribute("error");
        nameResult = true;
    }

    if (!surnameInput) {
        surnameForm.setAttribute("error", "true");
        surnameForm.setAttribute("errorText", "This field can't be empty");
    } else if (surnameInput.includes(' ')) { 
        surnameForm.setAttribute("error", "true");
        surnameForm.setAttribute("errorText", "Surname can't contain whitespace");
    } else if (surnameInput.length > nameSurnMaxLength) {
        surnameForm.setAttribute("error", "true");
        surnameForm.setAttribute("errorText", `Surname can't be longer than ${nameSurnMaxLength} characters`);
    } else if (!(/^[a-z]+$/i.test(surnameInput))) {
        surnameForm.setAttribute("error", "true");
        surnameForm.setAttribute("errorText", "Only latin letters are allowed");
    } else if(!(/[A-Z]/.test(surnameInput.charAt(0)))) {
        surnameForm.setAttribute("error", "true");
        surnameForm.setAttribute("errorText", "First letter has to be capital");
    } else {
        surnameForm.removeAttribute("errorText");
        surnameForm.removeAttribute("error");
        surnameResult = true;
    }
    return (nameResult && surnameResult)
}

const sendData = async (url, dataToSend) => {
    
console.log(dataToSend);
    const res = await fetch(url, {
        method: 'POST',
        body: dataToSend
    })

    const jsonResponce = await res.json()
    return jsonResponce
}

const sendDataWrap = async (url, dataToSend) => {
    
    try {
        const result = await sendData(url, dataToSend);
        
        window.location = host + 'clients/list/';
    } catch (error) {
        console.error('Error:', error);
    }

}

    document.getElementById("sign_up_confirmation_button_registration_page").addEventListener("click", function (event) {
        event.preventDefault();
       
        let result = validateRegistration();
        if (result) {
            const name = nameForm.value;
            const surname = surnameForm.value;
            const email = emailForm.value;
            const password = passForm.value;
            const repeat_password = repeatPassForm.value;
            const formData = new FormData();
            nameForm.value = '';
            surnameForm.value = '';
            emailForm.value = '';
            passForm.value = '';
            repeatPassForm.value = '';


            formData.set("first_name", name);
            formData.append('first_name', name);
            formData.append('last_name', surname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('repeat_password', repeat_password);
            formData.append('csrfmiddlewaretoken', csrf_token);

            sendDataWrap(host + 'user/register/', formData);
        }
});