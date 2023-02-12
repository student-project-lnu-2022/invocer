const passwordMinLength = 8;
const passwordMaxLength = 15;
const nameSurnMaxLength = 35;
const host = "http://127.0.0.1:8000";
let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const emailForm = document.getElementById("email_input_rg_pg");
const nameForm = document.getElementById("name_input_rg_pg");
const surnameForm = document.getElementById("surname_input_rg_pg");
const passwordField = document.getElementById("password_input_rg_pg");
const repeatPasswordField = document.getElementById("repeat_password_input_rg_pg");


function validateRegistration() {
    removeMaxHeightAttribute();
    let names = validateNameAndSurname();
    let email = validateEmail();
    let passwords = validatePasswords();
    
    checkAndSetNormalHeightNameAndSurnameInput();
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
    return (email && passwords && names)
}

nameForm.addEventListener('input', () => {
    nameForm.removeAttribute("errorText");
    nameForm.removeAttribute("error");
    removeMaxHeightAttribute();
    checkAndSetNormalHeightNameAndSurnameInput();
});

surnameForm.addEventListener('input', () => {
    surnameForm.removeAttribute("errorText");
    surnameForm.removeAttribute("error");
    removeMaxHeightAttribute();
    checkAndSetNormalHeightNameAndSurnameInput();
});

passwordField.addEventListener('input', () => {
    passwordField.removeAttribute("errorText");
    passwordField.removeAttribute("error");
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
});

repeatPasswordField.addEventListener('input', () => {
    repeatPasswordField.removeAttribute("errorText");
    repeatPasswordField.removeAttribute("error");
    checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
});

emailForm.addEventListener('input', () => {
    emailForm.removeAttribute("errorText");
    emailForm.removeAttribute("error");
});

function checkAndSetNormalHeightNameAndSurnameInput() {
    if (nameForm.hasAttribute("error") && !(surnameForm.hasAttribute("error"))) {
        surnameForm.style.maxHeight = "56px";
    }
    if (!(nameForm.hasAttribute("error")) && surnameForm.hasAttribute("error")) {
        nameForm.style.maxHeight = "56px";
    }
}

function checkAndSetNormalHeightPasswordAndRepeatPasswordInput() {
    if (passwordField.hasAttribute("error") && !(repeatPasswordField.hasAttribute("error"))) {
        repeatPasswordField.style.maxHeight = "56px";
    }
    if (!(passwordField.hasAttribute("error")) && repeatPasswordField.hasAttribute("error")) {
        passwordField.style.maxHeight = "56px";
    }
}

function removeMaxHeightAttribute() {
    surnameForm.style.maxHeight = null;
    nameForm.style.maxHeight = null;
    passwordField.style.maxHeight = null;
    repeatPasswordField.style.maxHeight = null;
}


function validateEmail() {
    let user_email = emailForm.value;
    let result = false;
    console.log(user_email === '');
    if (user_email === '') {
        emailForm.setAttribute("errorText", "This field can\'t be empty");
        emailForm.setAttribute("error", "true");
    } else if (user_email.includes(' ')) {
        emailForm.setAttribute("errorText", "Whitespaces aren't allowed");
        emailForm.setAttribute("error", "true");
    } else if (!(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(user_email))) {
        emailForm.setAttribute("errorText", "You entered an invalid email!");
        emailForm.setAttribute("error", "true");
    } else {
        emailForm.removeAttribute("errorText");
        emailForm.removeAttribute("error");
        result = true;
    }
    return result;
}

function validatePasswords() {
    let userPassword = passwordField.value;
    let userPasswordRepeat = repeatPasswordField.value;
    
    let passwordResult = false;
    let repeatPasswordResult = false;
    let match = true;

    passwordField.setAttribute("error", "true");
    if (userPassword.includes(' ')) {
        passwordField.setAttribute("errorText", "Whitespaces aren't allowed");
    } else if (userPassword.length < passwordMinLength) {
        passwordField.setAttribute("errorText", `Password must have at least ${passwordMinLength} characters`);
    } else if (userPassword.length > passwordMaxLength) {
        passwordField.setAttribute("errorText", `Password must have at most ${passwordMaxLength} characters`);
    } else if (!(/^[a-z0-9]+$/i.test(userPassword))) {
        passwordField.setAttribute("errorText", "Only latin letters and numbers are allowed");
    } else if (!(/\d/.test(userPassword))) {
        passwordField.setAttribute("errorText", "Password must contain number");
    } else if (!(/[A-Z]/.test(userPassword))) {
        passwordField.setAttribute("errorText", "Password must contain capital letter");
    } else {
        passwordField.removeAttribute("errorText");
        passwordField.removeAttribute("error");
        passwordResult = true;
    }

    if (userPasswordRepeat.includes(' ')) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", "Whitespaces aren't allowed");
    } else if (userPasswordRepeat.length < passwordMinLength) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", `Password must have at least ${passwordMinLength} characters`);
    } else if (userPasswordRepeat.length > passwordMaxLength) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", `Password must have at most ${passwordMaxLength} characters`);
    } else if (!(/^[a-z0-9]+$/i.test(userPasswordRepeat))) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", "Only latin letters and numbers are allowed");
    } else if (!(/\d/.test(userPasswordRepeat))) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", "Password must contain number");
    } else if (!(/[A-Z]/.test(userPasswordRepeat))) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", "Password must contain capital letter");
    } else {
        repeatPasswordField.removeAttribute("errorText");
        repeatPasswordField.removeAttribute("error");
        repeatPasswordResult = true;
    }

    if (userPassword !== userPasswordRepeat) { 
        match = false;
        passwordField.setAttribute("error", "true");
        passwordField.setAttribute("errorText", "Passwords don't match");
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", "Passwords don't match");
    }
    return (match && passwordResult && repeatPasswordResult) 
}

function validateNameAndSurname() {
    let nameInput = nameForm.value;
    let surnameInput = surnameForm.value;
    let nameResult = false;
    let surnameResult = false;


    nameForm.setAttribute("error", "true");
    if (!nameInput) {
        nameForm.setAttribute("errorText", "This field can't be empty");
    } else if (nameInput.includes(' ')) { 
        nameForm.setAttribute("errorText", "Whitespaces aren't allowed");
    } else if (nameInput.length > nameSurnMaxLength) {
        nameForm.setAttribute("errorText", `Name can't be longer than ${nameSurnMaxLength} characters`);
    } else if (!(/^[a-z]+$/i.test(nameInput))) {
        nameForm.setAttribute("errorText", "Only latin letters are allowed");
    } else if(!(/[A-Z]/.test(nameInput.charAt(0)))){
        nameForm.setAttribute("errorText", "First letter has to be capital");
    } else {
        nameForm.removeAttribute("errorText");
        nameForm.removeAttribute("error");
        nameResult = true;
    }

    surnameForm.setAttribute("error", "true");
    if (!surnameInput) {
        surnameForm.setAttribute("errorText", "This field can't be empty");
    } else if (surnameInput.includes(' ')) { 
        surnameForm.setAttribute("errorText", "Whitespaces aren't allowed");
    } else if (surnameInput.length > nameSurnMaxLength) {
        surnameForm.setAttribute("errorText", `Surname can't be longer than ${nameSurnMaxLength} characters`);
    } else if (!(/^[a-z]+$/i.test(surnameInput))) {
        surnameForm.setAttribute("errorText", "Only latin letters are allowed");
    } else if(!(/[A-Z]/.test(surnameInput.charAt(0)))) {
        surnameForm.setAttribute("errorText", "First letter has to be capital");
    } else {
        surnameForm.removeAttribute("errorText");
        surnameForm.removeAttribute("error");
        surnameResult = true;
    }
    return (nameResult && surnameResult)
}


const login = async (url, dataToSend) => {
    let flag = false, statusCode;
    try {
         const res = await fetch(url, {
             method: 'POST',
             body: dataToSend
         })
        const jsonResponce = await res.json();
        statusCode = res.status;
        
        emailForm.setAttribute("error", "true");
        passwordField.setAttribute("error", "true");
        if (statusCode === 200) {
            window.localStorage.setItem('accessToken', jsonResponce['access']);
            window.localStorage.setItem('refreshToken', jsonResponce['refresh']);
            emailForm.removeAttribute("error");
            passwordField.removeAttribute("error");
            return true;
        } else if (statusCode === 400) {
            passwordField.setAttribute("errorText", "Incorrect credentianls!");
        } else {
            passwordField.setAttribute("errorText", "Unknown error");
        }
    } catch (error) {
        console.error(error);
    }   
    return flag;
}



const checkAndSaveTokens = async (url, dataToSend) => {
    let flag = false, statusCode;
    try {
         const res = await fetch(url, {
             method: 'POST',
             body: dataToSend
         })
        await res.json(); 
        statusCode = res.status;
        
        emailForm.setAttribute("error", "true");
        passwordField.setAttribute("error", "true");
        if (statusCode === 200) {
            await login(host + '/user/authentication/', dataToSend);
            return true;
        } else if (statusCode === 400) {
            passwordField.setAttribute("errorText", "Incorrect credentianls!");
        } else if (statusCode === 409) {
            emailForm.setAttribute("errorText", "User with such email already exists!");
        } else {
            passwordField.setAttribute("errorText", "Unknown error");
        }
    } catch (error) {
        console.error(error);
    }
    return flag;
}

async function authorization() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${window.localStorage.getItem('accessToken')}`);
    let response
    try {
        const result = await fetch(host + '/clients/list/', {
        method: "GET",
        headers: headers
        })
        response = result.status;
        console.log(result);    
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("sign_up_confirm_btn_rg_pg").addEventListener("click", async function (event) {
    event.preventDefault();
    if (validateRegistration()) {
        const name = nameForm.value;
        const surname = surnameForm.value;
        const email = emailForm.value;
        const password = passwordField.value;
        const repeat_password = repeatPasswordField.value;
        const formData = new FormData();
        formData.append('first_name', name);
        formData.append('last_name', surname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('repeat_password', repeat_password);
        formData.append('csrfmiddlewaretoken', csrfToken);
        if (await checkAndSaveTokens(host + '/user/create_user/', formData)) {
            window.location.replace(host + '/clients/home/');
        }
    }
});
