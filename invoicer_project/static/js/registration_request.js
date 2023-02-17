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
        strValidationResult = "No whitespaces";
    } else if (strToValidate.length > nameSurnMaxLength) {
        strValidationResult = `Max length – ${nameSurnMaxLength} chars`;
    } else if (!(/^[a-z]+$/i.test(strToValidate))) {
        strValidationResult = "Only latin letters";
    } else if (!(/[A-Z]/.test(strToValidate.charAt(0)))) {
        strValidationResult = "Has to begin with capital";
    } else if (strToValidate.replace(/[^A-Z]/g, "").length > 1) {
        strValidationResult = "No more than one capital"
    } else if (!/^[A-Z][a-z]+$/.test(strToValidate)) {
        strValidationResult = "At least one lowercase";
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
        isEmailValid = "Invalid email format";
    } else if (emailToValidate.includes(' ')) {
        isEmailValid = "No whitespaces";
    } else {
        isEmailValid = '';
    }
    return isEmailValid;
}

function validatePasswordAsString(passwordToValidate) {
    let isPasswordValid
    if (passwordToValidate.includes(' ')) {
        isPasswordValid = "No whitespaces";
    } else if (passwordToValidate.length < passwordMinLength) {
        isPasswordValid = `Min length – ${passwordMinLength} chars`;
    } else if (passwordToValidate.length > passwordMaxLength) {
        isPasswordValid = `Max length – ${passwordMaxLength} chars`;
    } else if (!(/^[a-z0-9]+$/i.test(passwordToValidate))) {
        isPasswordValid = "Only A-Z, a-z and 0-9";
    } else if (!(/\d/.test(passwordToValidate))) {
        isPasswordValid = "At least one number";
    } else if (!(/[a-z]/.test(passwordToValidate))) {
        isPasswordValid = "At least one lowercase";
    } else if (!(/[A-Z]/.test(passwordToValidate))) {
        isPasswordValid = "At least one capital";
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
        const tokenObtainStatusCode = await obtainAndSaveTokens(host + '/user/login/', dataToSend);
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
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
    if (!allAreFalse(validationFieldsList)) {
        setErrorAttributesToFields(validationFieldsList);
        return;
    }
    const user = {
        first_name: nameField.value,
        last_name: surnameField.value,
        email: emailField.value,
        password: passwordField.value,
        repeat_password: repeatPasswordField.value,
        csrfmiddlewaretoken: csrfToken
    };
    const registerStatusCode = await registerNewUser(host + '/user/register/', user);
    actionAfterRegisterRequest(registerStatusCode, formData);
});
