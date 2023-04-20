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
    addressField
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
    validation, setErrorAttributeToDropdown,
} from './validation_utils.js'
import {obtainNewAccessToken, obtainUserInitials, actionBasedOnStatusCode, sendAddEditRequest} from './request_utils.js'
import {removeStylesFromDropdownElements} from "./dropdown.js";

function validateClientAdd() {
    removeAllErrorAttributes(returnAllFields());
    setMaxFieldContainerHeights(returnAllFields());
    removeErrorAttributeFromDropdown();
    return {
        'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
        'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
        'emailValidationResult': validation(emailField.value, /^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/),
        'telephoneValidationResult': validation(telephoneField.value, /^\+?1?\d{9,15}$/),
        'zipValidationResult': validation(zipField.value, /^[0-9]{5}(?:-[0-9]{4})?$/),
        'cityValidationResult': validateCity(cityField.value),
        'addressValidationResult': validateAddress(addressField.value),
    };
}

const errorCountryFieldText = document.querySelector(".error_country_dropdown");
document.getElementById("request_sender").addEventListener("click", async () => {
    const validationFieldsList = validateClientAdd();
    const dropdownValidation = allAreFalse(validateCountry(countryField.value));

    if (allAreFalse(validationFieldsList) && dropdownValidation) {
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
        const serverResponseStatus = await sendAddEditRequest(host + "/clients/client/", data, "POST");
        actionBasedOnStatusCode(serverResponseStatus, 201, data, returnAllFields(), "/clients/home/", "POST", "/clients/client/");
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
        if (!dropdownValidation) {
            removeStylesFromDropdownElements();
            setErrorAttributeToDropdown(countryField.parentNode);
            errorCountryFieldText.style.display = "flex";
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

hideUnnecessaryElementsInMenu();

function removeErrorAttributeFromDropdown() {
    countryField.parentNode.addEventListener("click", () => {
        countryField.parentNode.classList.remove('error');
        errorCountryFieldText.style.display = "none";
    });
}

removeErrorAttributeFromDropdown();

