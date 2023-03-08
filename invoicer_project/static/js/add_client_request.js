import { host, returnAllFields, hideUnnecessaryElementsInMenu, nameField, zipField, emailField, countryField, surnameField, telephoneField, cityField, addressField} from './utils_clients.js'
import { removeAllErrorAttributes, setErrorAttributesToFields, clearErrorAttributes, setMaxFieldContainerHeights, allAreFalse, validateCountry, validateCity, validateAddress, validateNameAndSurnameAsStrings, validation,} from './validation_utils.js'
import { obtainNewAccessToken, obtainUserInitials, actionBasedOnStatusCode, sendAddEditRequest} from './request_utils.js'

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
        const serverResponseStatus = await sendAddEditRequest(host + "/clients/client/", data, "POST");
        actionBasedOnStatusCode(serverResponseStatus, 201, data, returnAllFields(), "/clients/home/", "POST", "/clients/client/");
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
});


document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

hideUnnecessaryElementsInMenu();