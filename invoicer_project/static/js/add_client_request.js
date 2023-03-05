import { host, returnAllFields, hideUnnecessaryElementsInMenu, nameField, zipField, emailField, countryField, surnameField, telephoneField, cityField, addressField} from './utils_clients.js'
import { removeAllErrorAttributes, setErrorAttributesToFields, clearErrorAttributes, setMaxFieldContainerHeights, allAreFalse, validateCountry, validateCity, validateAddress, validateNameAndSurnameAsStrings, validation,} from './validation_utils.js'
import { obtainNewAccessToken, obtainUserInitials} from './request_utils.js'

function validateClientAdd() {
    removeAllErrorAttributes(returnAllFields());
    setMaxFieldContainerHeights(returnAllFields());
    return {
        'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
        'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
        'emailValidationResult': validation(emailField.value, /^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/),
        'telephoneValidationResult': validation(telephoneField.value, /^\+?1?\d{9,15}$/),
        'zipValidationResult': validation(zipField.value, /^[0-9]{5}(?:-[0-9]{4})?$/),
        'countryValidationResult': validateCountry(countryField.value),
        'cityValidationResult': validateCity(cityField.value),
        'addressValidationResult': validateAddress(addressField.value),
    };
}

async function sendAddUserRequest(url, data) {
    let status;
    let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await fetch(url, {
            headers: headers,
            body: data,
            method: "POST"
        });
        status = response.status;
        console.log(`Status code: ${status}`);

    } catch (error) {
        console.error(error);
    }
    return status;
}

async function actionBasedOnStatusCode(statusCode, data) {
    if (statusCode === 201) {
        for (let field of returnAllFields()) {
            field.value = '';
        }
        window.location.href = host + "/clients/home/";
    } else if (statusCode === 401) {
        const obtainedNewTokens = await obtainNewAccessToken();
        if (!obtainedNewTokens) {
            window.location.href = host + '/user/login/';
        } else {
            const status = await sendAddUserRequest(host + "/clients/client/", data);
            actionBasedOnStatusCode(status, data);
        }
        console.log("Updating token");
    } else if (statusCode === 400) {
        console.log("Backend validation error: 400 status");
    } else {
        console.log(`Unknown error: status code = ${statusCode}`);
    }
}

document.getElementById("request_sender").addEventListener("click", async () => {
    const validationFieldsList = validateClientAdd();
    if (allAreFalse(validationFieldsList)) {
        const data = JSON.stringify({
            first_name: nameField.value,
            last_name: surnameField.value,
            email: emailField.value,
            phone_number: telephoneField.value,
            zip_code: zipField.value,
            country: countryField.value,
            city: cityField.value,
            address: addressField.value
        });
        const serverResponseStatus = await sendAddUserRequest(host + "/clients/client/", data);
        actionBasedOnStatusCode(serverResponseStatus, data);
    } else {
        setErrorAttributesToFields(validationFieldsList);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

hideUnnecessaryElementsInMenu();