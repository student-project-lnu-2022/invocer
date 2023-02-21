const host = "http://127.0.0.1:8000";
const emailField = document.getElementById("email_input_lg_pg");
const passwordField = document.getElementById("password_input_lg_pg");

const fieldList = [emailField, passwordField];

function removeAllErrorAttributes() {
    for (let item of fieldList) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

function allAreFalse(object) {
    for (let key in object) {
        if (Boolean(object[key]) === true) {
            return false;
        }
    }
    return true;
}

function validatePassword(valueToValidate) {
    return ((valueToValidate === '') ? 'Invalid data' : '');
}

function validateEmail(valueToValidate) {
    if (valueToValidate.includes(' ') || !(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(valueToValidate))) {
        return 'Invalid data';
    } else {
        return '';
    }
}

function validateLoginDataOnFrontEnd() {
    removeAllErrorAttributes();
    let fieldsValidationResult = {
        'emailValidationResult': validateEmail(emailField.value),
        'passwordValidationResult': validatePassword(passwordField.value)
    };
    return fieldsValidationResult;
}

function setErrorAttributesToFields(errorData) {
    emailField.setAttribute('error', 'true');
    passwordField.setAttribute('error', 'true');
    if (errorData["emailValidationResult"]) {
        passwordField.setAttribute('errorText', errorData["emailValidationResult"]);
    } 
    if (errorData["passwordValidationResult"]) {
        passwordField.setAttribute('errorText', errorData["passwordValidationResult"]);
    }
}

function backEndNegativeResponse(status) {
    let errorString;
    emailField.setAttribute('error', 'true');
    passwordField.setAttribute('error', 'true');
    if (status === 400) {
        errorString = "Incorrect credentials";
    } else {
        errorString = "Unknown error";
    }
    passwordField.setAttribute("errorText", errorString);
}

emailField.addEventListener('input', () => {
    emailField.removeAttribute("errorText");
    emailField.removeAttribute("error");
    passwordField.removeAttribute("errorText");
    passwordField.removeAttribute("error");
});

passwordField.addEventListener('input', () => {
    emailField.removeAttribute("errorText");
    emailField.removeAttribute("error");
    passwordField.removeAttribute("errorText");
    passwordField.removeAttribute("error");
});


const checkAndSaveTokens = async (url, dataToSend) => {
    let statusCode,jsonResponse;
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: dataToSend
        });
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

document.getElementById("log_in_confirmation_button_log_in_page").addEventListener("click", async function (event) {
    event.preventDefault();
    const validationFieldsList = validateLoginDataOnFrontEnd();
    if (allAreFalse(validationFieldsList)) {
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const email = emailField.value;
        const password = passwordField.value;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', csrf_token);

        const responseStatus = await checkAndSaveTokens(host + '/user/login/', formData);
        if (responseStatus === 200) {
            emailField.value = '';
            passwordField.value = '';
            window.location.replace(host + '/clients/home/');
        } else {
            backEndNegativeResponse(responseStatus);
        }
    } else {
        setErrorAttributesToFields(validationFieldsList);
    }
});
