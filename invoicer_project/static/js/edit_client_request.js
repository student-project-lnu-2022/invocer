import { host, returnAllFields, hideUnnecessaryElementsInMenu, nameField, zipField, emailField, countryField, surnameField, telephoneField, cityField, addressField, clientId} from './utils_clients.js'
import { removeAllErrorAttributes, setErrorAttributesToFields, clearErrorAttributes, setMaxFieldContainerHeights, allAreFalse, validateCountry, validateCity, validateAddress, validateNameAndSurnameAsStrings, validation,} from './validation_utils.js'
import { obtainNewAccessToken, obtainUserInitials} from './request_utils.js'
function validateClientEdit() {
    removeAllErrorAttributes(returnAllFields());
    setMaxFieldContainerHeights(returnAllFields());
    return {
        'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
        'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
        'emailValidationResult': validation(emailField.value, /^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/),
        'telephoneValidationResult': validation(telephoneField.value, /^\+?1?\d{9,15}$/),
        'zipValidationResult': validation(zipField.value, /^\d{5}(?:-\d{4})?$/),
        'countryValidationResult': validateCountry(countryField.value),
        'cityValidationResult': validateCity(cityField.value),
        'addressValidationResult': validateAddress(addressField.value),
    };
}

async function sendEditUserRequest(url, data) {
    let status;
    let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await fetch(url, {
            headers: headers,
            body: data,
            method: "PATCH"
        });
        status = response.status;
        console.log(`Status code: ${status}`);

    } catch (error) {
        console.error(error);
    }
    return status;
}

async function actionBasedOnStatusCode(statusCode, data) {
    if (statusCode === 200) {
        for (let field of returnAllFields()) {
            field.value = '';
        }
        window.location.href = host + "/clients/home/";
    } else if (statusCode === 401) {
        const obtainedNewTokens = await obtainNewAccessToken();
        if (!obtainedNewTokens) {
            window.location.href = host + '/user/login/';
        } else {
            const status = await sendEditUserRequest(host + "/clients/client/" + clientId, data);
            actionBasedOnStatusCode(status, data);
        }
    } else if (statusCode === 400) {
    } else {
        console.log(`Unknown error: status code = ${statusCode}`);
    }
}

document.getElementById("request_edit_sender").addEventListener("click", async () => {
    const validationFieldsList = validateClientEdit();
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
        const serverResponseStatus = await sendEditUserRequest(host + "/clients/client/" + clientId, data);
        actionBasedOnStatusCode(serverResponseStatus, data);
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
})

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

fillFieldsWithData();
hideUnnecessaryElementsInMenu();

async function fillFieldsWithData() {
    let responseFromServer = await getClientById(clientId);
    document.getElementById("name_input_client_edit_page").value = responseFromServer["first_name"];
    document.getElementById("surname_input_client_edit_page").value = responseFromServer["last_name"];
    document.getElementById("email_input_client_edit_page").value = responseFromServer["email"];
    document.getElementById("telephone_input_client_edit_page").value = responseFromServer["phone_number"];
    document.getElementById("zip_input_client_edit_page").value = responseFromServer["zip_code"];
    document.getElementById("country_input_client_edit_page").value = responseFromServer["country"];
    document.getElementById("city_input_client_edit_page").value = responseFromServer["city"];
    document.getElementById("address_input_client_edit_page").value = responseFromServer["address"];
}

function getClientById(clientId) {
    return fetch(host + '/clients/client/' + clientId, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}

hideUnnecessaryElementsInMenu();