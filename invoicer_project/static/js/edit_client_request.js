import {
    host,
    returnAllFields,
    hideUnnecessaryElementsInMenu,
    nameField,
    zipField,
    emailField,
    countryField,
    surnameField,
    telephoneField,
    cityField,
    addressField,
    clientId
} from './utils_clients.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    clearErrorAttributes,
    setMaxFieldContainerHeights,
    allAreFalse,
    validateCountry,
    validateCity,
    validateAddress,
    validateNameAndSurnameAsStrings,
    validation,
} from './validation_utils.js'
import {obtainNewAccessToken, obtainUserInitials, actionBasedOnStatusCode, sendAddEditRequest} from './request_utils.js'
import {
    additionalFieldsContainer, additionalUnitCell, additionalUnits,
    amountAdditionalFieldsContainer, amountAdditionalUnitField,
    maxNumOfUnits,
    numOfRowsObject
} from "./utils_items";

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


function addLabels() {
    if (numOfRowsObject.numOfRows >= maxNumOfUnits) {
        alert(`You can't add more than ${maxNumOfUnits} additional units!`);
        return;
    }
    removeAllErrorAttributes(additionalFieldsContainer);
    removeAllErrorAttributes(amountAdditionalFieldsContainer);
    let index = 0;
    for (let i = 0; i <= numOfRowsObject.numOfRows; i++) {
        if (additionalUnitCell[i].classList.contains("hidden")) {
            index = i;
            break;
        }
    }
    additionalUnitCell[index].classList.remove("hidden");
    additionalUnits[index].parentNode.classList.remove("d-none");
    additionalUnits[index].parentNode.classList.add("d-flex");
    ++numOfRowsObject.numOfRows;
}

function removeLabels(index) {
    additionalUnitCell[index].classList.add("hidden");
    additionalUnits[index].parentNode.classList.add("d-none");
    additionalUnits[index].parentNode.classList.remove("d-flex");
    removeTextFromTable(document.querySelector(`#Aditional_unit_${index + 1}`), `Aditional unit ${index + 1}`);
    removeTextFromTable(document.querySelector(`#AU${index + 1}_val`), "");
    additionalUnits[index].value = "";
    amountAdditionalUnitField[index].value = "";
    --numOfRowsObject.numOfRows;
}

hideUnnecessaryElementsInMenu();

document.querySelector("#additional_item_button").addEventListener("click", () => {
    addLabels();
    console.log("Button is clicked");
});

