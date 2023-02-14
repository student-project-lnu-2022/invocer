const passwordMinLength = 8;
const passwordMaxLength = 15;
const nameSurnMaxLength = 35;
const host = "http://127.0.0.1:8000";
let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const emailField = document.getElementById("email_input_rg_pg");
const nameField = document.getElementById("name_input_rg_pg");
const surnameField = document.getElementById("surname_input_rg_pg");
const passwordField = document.getElementById("password_input_rg_pg");
const repeatPasswordField = document.getElementById("repeat_password_input_rg_pg");

const fieldList = [
    nameField,
    surnameField,
    emailField,
    passwordField,
    repeatPasswordField
];

function setMaxFieldContainerHeights() {
    for (field of fieldList) {
        field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}

function removeAllErrorAttributes() {
    for (item of fieldList) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

function allAreFalse(object) {
    for (key in object) {
        if (Boolean(object[key]) === true) {
            return false;
        }
    }
    return true;
}

function validateNameAndSurnameAsStrings(strToValidate) {
    let strValidationResult 

    if (!strToValidate) {
        strValidationResult = "This field can't be empty";
    } else if (strToValidate.includes(' ')) { 
        strValidationResult = "Whitespaces aren't allowed";
    } else if (strToValidate.length > nameSurnMaxLength) {
        strValidationResult = `Can't be longer than ${nameSurnMaxLength} characters`;
    } else if (!(/^[a-z]+$/i.test(strToValidate))) {
        strValidationResult = "Only latin letters are allowed";
    } else if (!(/[A-Z]/.test(strToValidate.charAt(0)))) {
        strValidationResult = "First letter has to be capital";
    } else {
        strValidationResult = '';
    }
    return strValidationResult;
}

function validateEmail(emailToValidate) {
    let isEmailValid
    if (emailToValidate === '') {
        isEmailValid = "This field can't be empty";
    } else if (!(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(emailToValidate))) {
        isEmailValid = "You entered an invalid email!";
    } else if (emailToValidate.includes(' ')) {
        isEmailValid = "Whitespaces aren't allowed";
    } else {
        isEmailValid = '';
    }
    return isEmailValid;
}

function validatePasswordAsString(passwordToValidate) {
    let isPasswordValid
    if (passwordToValidate.includes(' ')) {
        isPasswordValid = "Whitespaces aren't allowed";
    } else if (passwordToValidate.length < passwordMinLength) {
        isPasswordValid = `Should be at least ${passwordMinLength} characters long`;
    } else if (passwordToValidate.length > passwordMaxLength) {
        isPasswordValid = `Should have at most ${passwordMaxLength} characters`;
    } else if (!(/^[a-z0-9]+$/i.test(passwordToValidate))) {
        isPasswordValid = "Only latin letters and numbers are allowed";
    } else if (!(/\d/.test(passwordToValidate))) {
        isPasswordValid = "Should contain number";
    } else if (!(/[a-z]/.test(passwordToValidate))) { 
        isPasswordValid = "Should contain a lowercase letter";
    } else if (!(/[A-Z]/.test(passwordToValidate))) {
        isPasswordValid = "Should contain a capital letter";
    } else {
        isPasswordValid = '';
    }
    return isPasswordValid;
}

function validateRegistration() {
    removeAllErrorAttributes();
    setMaxFieldContainerHeights();
    let allFieldsValidationResult = {
        'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
        'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
        'emailValidationResult': validateEmail(emailField.value),
        'passwordValidationResult': validatePasswordAsString(passwordField.value),
        'repeatPasswordValidationResult': validatePasswordAsString(repeatPasswordField.value),
        'doPasswordsMatch': (() => {
            if (passwordField.value !== repeatPasswordField.value) {
                return "Passwords don't match!";
            } else {
                return '';
            }
        })()
    };
    return allFieldsValidationResult;
}

function setErrorAttributesToFields(errorsObject) {
    if (errorsObject['nameValidationResult']) {
        nameField.setAttribute("error", "true");
        nameField.setAttribute("errorText", errorsObject['nameValidationResult']);
    }
    if (errorsObject['surnameValidationResult']) {
        surnameField.setAttribute("error", "true");
        surnameField.setAttribute("errorText", errorsObject['surnameValidationResult']);
    }
    if (errorsObject['emailValidationResult']) {
        emailField.setAttribute("error", "true");
        emailField.setAttribute("errorText", errorsObject['emailValidationResult']);
    }
    if (errorsObject['passwordValidationResult']) {
        passwordField.setAttribute("error", "true");
        passwordField.setAttribute("errorText", errorsObject['passwordValidationResult']);
    }
    if (errorsObject['repeatPasswordValidationResult']) {
        repeatPasswordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("errorText", errorsObject['repeatPasswordValidationResult']);
    }
    if (errorsObject['doPasswordsMatch']) {
        passwordField.removeAttribute("errorText");
        repeatPasswordField.removeAttribute("errorText");
        passwordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("error", "true");
        passwordField.setAttribute("errorText", errorsObject['doPasswordsMatch']);
    }
}


nameField.addEventListener('input', () => {
    nameField.removeAttribute("errorText");
    nameField.removeAttribute("error");
});

surnameField.addEventListener('input', () => {
    surnameField.removeAttribute("errorText");
    surnameField.removeAttribute("error");
});

passwordField.addEventListener('input', () => {
    passwordField.removeAttribute("errorText");
    passwordField.removeAttribute("error");
    repeatPasswordField.removeAttribute("errorText");
    repeatPasswordField.removeAttribute("error");
});

repeatPasswordField.addEventListener('input', () => {
    repeatPasswordField.removeAttribute("errorText");
    repeatPasswordField.removeAttribute("error");
    passwordField.removeAttribute("errorText");
    passwordField.removeAttribute("error");
});

emailField.addEventListener('input', () => {
    emailField.removeAttribute("errorText");
    emailField.removeAttribute("error");
});

async function actionAfterRegisterRequest(registerStatusCode, dataToSend) {
    if (registerStatusCode === 200) {
        const tokenObtainStatusCode = await obtainAndSaveTokens(host + '/user/authentication/', dataToSend);
        if (tokenObtainStatusCode === 200) {
            window.location.replace(host + '/clients/home/');
        } else {
            showBackEndErrorsAtFE(tokenObtainStatusCode);
        }
    } else {
        emailField.setAttribute("error", "true");
        passwordField.setAttribute("error", "true");
        repeatPasswordField.setAttribute("error", "true");
        if (registerStatusCode === 400) {
            passwordField.setAttribute("errorText", "Invalid credentianls!");
        } else if (registerStatusCode === 409) {
            passwordField.removeAttribute("error");
            repeatPasswordField.removeAttribute("error");
            emailField.setAttribute("errorText", "User with such email already exists!");
        } else {
            passwordField.setAttribute("errorText", "Unknown server error");
        }
    }
}

function showBackEndErrorsAtFE(status) {
    emailField.setAttribute("error", "true");
    passwordField.setAttribute("error", "true");
    if (status === 400) {
        passwordField.setAttribute("errorText", "Invalid credentials");
    } else {
        passwordField.setAttribute("errorText", "Unknown error");
    }
}

const obtainAndSaveTokens = async (url, dataToSend) => {
    let statusCode, jsonResponse;
    try {
         const res = await fetch(url, {
             method: 'POST',
             body: dataToSend
         })
        jsonResponse = await res.json();
        statusCode = res.status;
      
        // else if (statusCode === 400) {
        //     passwordField.setAttribute("errorText", "Incorrect credentianls!");
        // } else {
        //     passwordField.setAttribute("errorText", "Unknown error");
        // }
    } catch (error) {
        console.error(error);
    } 
    if (statusCode === 200) {
            window.localStorage.setItem('accessToken', jsonResponse['access']);
            window.localStorage.setItem('refreshToken', jsonResponse['refresh']);
    }
    return statusCode;
}


const registerNewUser = async (url, dataToSend) => {
    let statusCode;
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: dataToSend
        });
        statusCode = res.status;
    } catch (error) {
        console.error(error);
    }
    return statusCode;
}

document.getElementById("sign_up_confirm_btn_rg_pg").addEventListener("click", async function (event) {
    event.preventDefault();
    const validationFieldsList = validateRegistration();
    if (allAreFalse(validationFieldsList)) {
        const name = nameField.value;
        const surname = surnameField.value;
        const email = emailField.value;
        const password = passwordField.value;
        const repeat_password = repeatPasswordField.value;
        const formData = new FormData();
        formData.append('first_name', name);
        formData.append('last_name', surname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('repeat_password', repeat_password);
        formData.append('csrfmiddlewaretoken', csrfToken);
        const registerStatusCode = await registerNewUser(host + '/user/create_user/', formData);
        actionAfterRegisterRequest(registerStatusCode, formData);
    } else {
        setErrorAttributesToFields(validationFieldsList);
    }
});


       