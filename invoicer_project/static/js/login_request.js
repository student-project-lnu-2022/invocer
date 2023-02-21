const host = "http://127.0.0.1:8000";
const emailField = document.getElementById("email_input_lg_pg");
const passwordField = document.getElementById("password_input_lg_pg");

function removeAllErrorAttributes() {
    for (let item of [emailField, passwordField]) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

function validatePassword(valueToValidate) {
    return ((valueToValidate === '') ? 'Invalid data' : '');
}

function validateEmail(valueToValidate) {
    return (valueToValidate.includes(' ') || !(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(valueToValidate))) ?
        'Invalid data' : '';
}

function validateLoginDataOnFrontEnd() {
    removeAllErrorAttributes();
    return {
        'emailValidationResult': validateEmail(emailField.value),
        'passwordValidationResult': validatePassword(passwordField.value)
    };
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

const removeErrorsFromLoginFields = function (...fields) {
    for (let field of fields) {
        field.removeAttribute("errorText");
        field.removeAttribute("error");
    }
}
emailField.addEventListener('input', () => {
    removeErrorsFromLoginFields(emailField, passwordField);
});

passwordField.addEventListener('input', () => {
    removeErrorsFromLoginFields(emailField, passwordField);
});


const checkAndSaveTokens = async (url, dataToSend) => {
    let statusCode, jsonResponse;
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend)
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
    if (!validationFieldsList['emailValidationResult'] && !validationFieldsList['passwordValidationResult']) {
        const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const user = {
            email: emailField.value,
            password: passwordField.value,
            csrfmiddlewaretoken: csrfToken
        };
        const responseStatus = await checkAndSaveTokens(host + '/user/login/', user);
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