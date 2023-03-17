import {
    addressField,
    cityField,
    clientId,
    countryField,
    emailField,
    hideUnnecessaryElementsInMenu,
    host,
    nameField,
    returnAllFields,
    surnameField,
    telephoneField,
    zipField
} from './utils_clients.js'
import {
    allAreFalse,
    clearErrorAttributes,
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    setMaxFieldContainerHeights,
    validateAddress,
    validateCity,
    validateCountry,
    validateNameAndSurnameAsStrings,
    validation,
} from './validation_utils.js'
import {actionBasedOnStatusCode, obtainUserInitials, sendAddEditRequest} from './request_utils.js'

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
        const serverResponseStatus = await sendAddEditRequest(host + "/clients/client/" + clientId, data, "PATCH");
        actionBasedOnStatusCode(serverResponseStatus, 200, data, returnAllFields(), "/clients/home/", "PATCH", "/clients/client/");
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

    const countriesDivList = document.querySelectorAll('.menu div');
    countriesDivList.forEach(div => {
        if (div.getAttribute("data-value") === responseFromServer["country"]) {
            console.log(responseFromServer["country"]);
            const dropdownCountryContainer = document.querySelector('.default.text');
            dropdownCountryContainer.textContent = "";
            dropdownCountryContainer.insertAdjacentHTML("afterbegin", div.innerHTML);
            dropdownCountryContainer.classList.remove("default");
        }
    });
    console.log(countriesDivList);
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