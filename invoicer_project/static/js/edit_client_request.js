const nameSurnMaxLength = 35;
const countryMaxLength = 35;
const addressMaxLength = 40;
const host = "http://127.0.0.1:8000";

const nameField = document.getElementById("name_input_client_edit_page");
const surnameField = document.getElementById("surname_input_client_edit_page");
const emailField = document.getElementById("email_input_client_edit_page");
const telephoneField = document.getElementById("telephone_input_client_edit_page");
const zipField = document.getElementById("zip_input_client_edit_page");
const countryField = document.getElementById("country_input_client_edit_page");
const cityField = document.getElementById("city_input_client_edit_page");
const addressField = document.getElementById("address_input_client_edit_page");

const clientId = window.location.href.match(/(\d+)(?=[^\/]*$)/)[1];

const returnAllFields = function () {
    return [
        nameField, surnameField,
        emailField, telephoneField,
        zipField, countryField,
        cityField, addressField
    ];
}


function clearErrorAttributes() {
    for (let field of returnAllFields()) {
        field.addEventListener('input', () => {
            field.removeAttribute("error");
            field.removeAttribute("errorText");
        })
    }
}

function setMaxFieldContainerHeights() {
    for (let field of returnAllFields()) {
        field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}

function removeAllErrorAttributes() {
    for (let item of returnAllFields()) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

function allAreFalse(object) {
    for (let key in object) {
        if (object[key]) {
            return false;
        }
    }
    return true;
}

function validateClientAdd() {
    removeAllErrorAttributes();
    setMaxFieldContainerHeights();
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

function validateNameAndSurnameAsStrings(strToValidate) {
    let strValidationResult;
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

function validation(fieldToValidate, fieldRegex) {
    let isFieldValid;
    if (fieldToValidate === '') {
        isFieldValid = "This field can't be empty";
    } else if (fieldToValidate.includes(' ')) {
        isFieldValid = "No whitespaces";
    } else if (!(fieldRegex.test(fieldToValidate))) {
        isFieldValid = "Invalid format";
    } else {
        isFieldValid = '';
    }
    return isFieldValid;
}

function validateAddress(addressToValidate) {
    let isAddressValid;
    if (addressToValidate === '') {
        isAddressValid = "This field can't be empty";
    } else if (addressToValidate.length > addressMaxLength) {
        isAddressValid = `Max length – ${addressMaxLength} chars`;
    } else if (!/^[#./0-9a-zA-Z\s,-]+$/.test(addressToValidate)) {
        isAddressValid = "A-Z, a-z, 0-9 only";
    } else {
        isAddressValid = '';
    }
    return isAddressValid;
}

function validateCountry(countryToValidate) {
    let isCountryValid;
    if (countryToValidate === '') {
        isCountryValid = "This field can't be empty";
    } else if (countryToValidate.includes(' ')) {
        isCountryValid = "No whitespaces";
    } else if (!(/^[a-z]+$/i.test(countryToValidate))) {
        isCountryValid = "Only latin letters";
    } else if (!(/[A-Z]/.test(countryToValidate.charAt(0)))) {
        isCountryValid = "Has to begin with capital";
    } else if (countryToValidate.length > countryMaxLength) {
        isCountryValid = `Max length – ${countryMaxLength} chars`;
    } else {
        isCountryValid = '';
    }
    return isCountryValid;
}

function validateCity(cityToValidate) {
    let isCityValid;
    if (cityToValidate === '') {
        isCityValid = "This field can't be empty";
    } else if (!(/^[a-z]+$/i.test(cityToValidate))) {
        isCityValid = "Only latin letters";
    } else if (!(/[A-Z]/.test(cityToValidate.charAt(0)))) {
        isCityValid = "Has to begin with capital";
    } else if (cityToValidate.includes(' ')) {
        isCityValid = "No whitespaces";
    } else if (cityToValidate.length > countryMaxLength) {
        isCityValid = `Max length – ${countryMaxLength} chars`;
    } else {
        isCityValid = '';
    }
    return isCityValid;
}

function setErrorAttributesToFields(errorsObject) {
    let fieldIndex = 0;
    fields = returnAllFields();
    for (let error in errorsObject) {
        if (errorsObject[error]) {
            fields[fieldIndex].setAttribute("error", "true");
            fields[fieldIndex].setAttribute("errorText", errorsObject[error]);
        }
        fieldIndex++;
    }
}

async function sendEditUserRequest(url, data) {
    let status;
    headers = {
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
            const status = await sendEditUserRequest(host + "/clients/client_edit/" + clientId, data);
            actionBasedOnStatusCode(status, data);
        }
    } else if (statusCode === 400) {
    } else {
        console.log(`Unknown error: status code = ${statusCode}`);
    }
}

async function obtainNewAccessToken() {
    let response;
    const data = {refresh: window.localStorage.getItem('refreshToken')};
    try {
        response = await fetch(host + '/user/refresh/', {
            method: "POST",
            body: JSON.stringify(data)
        });
        const newToken = await response.json();
        const accessToken = newToken['access'];
        window.localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error(error);
    }
    return response.status === 200;
}

document.getElementById("request_edit_sender").addEventListener("click", async () => {
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
        const serverResponseStatus = await sendEditUserRequest(host + "/clients/client_edit/" + clientId, data);
        actionBasedOnStatusCode(serverResponseStatus, data);
    } else {
        setErrorAttributesToFields(validationFieldsList);
    }
});

function fillInitials(userData) {
    const userFirstName = userData["first_name"];
    const userLastName = userData["last_name"];
    document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
}

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes();
    obtainUserInitials();
});

async function obtainUserInitials() {
    let responseCode;
    const token = window.localStorage.getItem('accessToken');
    if (token) {
        const data = {"accessToken": token};
        try {
            const serverReply = await fetch(host + '/user/decode/', {
                method: "POST",
                body: JSON.stringify(data)
            });
            responseCode = serverReply.status;
            const initials = await serverReply.json();
            if (responseCode === 200) {
                fillInitials(initials);
            } else if (responseCode === 400) {
                const obtainedNewTokens = await obtainNewAccessToken();
                if (!obtainedNewTokens) {
                    window.location.href = host + '/user/login/';
                } else {
                    await obtainUserInitials();
                }
            } else {
                window.location.replace(host + '/user/login/');
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}


fillFieldsWithData();

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
    return fetch(host + '/clients/client_by_id/' + clientId, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}



