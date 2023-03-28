import {host} from './utils_clients.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    clearErrorAttributes,
    setMaxFieldContainerHeights,
    allAreFalse,
    validateNameAndSurnameAsStrings,
    validationWithoutNotEmpty,
    validatePasswordAsString
} from './validation_utils.js'
import { obtainNewAccessToken, obtainUserInitials, actionBasedOnStatusCode, sendAddEditRequest} from './request_utils.js'

const nameField = document.getElementById("name_input_settings");
const surnameField = document.getElementById("surname_input_settings");
const companyNameField = document.getElementById("company_name_input_settings");
const countryField = document.getElementById("country_input_settings");
const cityField = document.getElementById("city_input_settings");
const addressField = document.getElementById("address_input_settings");
const oldPasswordField = document.getElementById("old_password_input_settings");
const newPasswordField = document.getElementById("new_password_input_settings");
const repeatNewPasswordField = document.getElementById("repeat_new_password_input_settings");

async function validateUserOldPassword(oldPassword){
    let responseFromServer = await getCurrentUser();
    const currentOldPassword = responseFromServer["password"];
    let isFieldValid;
    if(currentOldPassword !== oldPassword){
        isFieldValid = "Incorrect old password"
    }else {
        if (oldPassword === '') {
        isFieldValid = "This field can't be empty";
        }
        else {
            isFieldValid = '';
    }}
    return isFieldValid;
}

function validateUserEdit() {
    removeAllErrorAttributes(returnAllFields());
    setMaxFieldContainerHeights(returnAllFields());
    return {
        'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
        'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
        'companyNameValidationResult': validationWithoutNotEmpty(companyNameField.value, /^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DEa-zа-яїієґ\u00E0-\u00F6\u00F8-\u00FE]/),
        'countryValidationResult': validationWithoutNotEmpty(countryField.value, /^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/),
        'cityValidationResult': validationWithoutNotEmpty(cityField.value, /^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/),
        'addressValidationResult': validationWithoutNotEmpty(addressField.value, /^[#./0-9a-zA-ZА-ЯЇІЄҐа-яїієґ\u0400-\u04FF\s,-]+$/),
    };
}

const returnAllFields = function () {
    return [
        nameField, surnameField,
        companyNameField, countryField,
        cityField, addressField
    ];
}

function validateUserPasswordEdit() {
    removeAllErrorAttributes(allPasswordFields());
    setMaxFieldContainerHeights(allPasswordFields());
    return {
        'oldPasswordValidationResult': validatePasswordAsString(oldPasswordField.value),
        'newPasswordValidationResult': validatePasswordAsString(newPasswordField.value),
        'repeatNewPasswordValidationResult': validatePasswordAsString(repeatNewPasswordField.value)
    };
}

const allPasswordFields = function () {
    return [
        oldPasswordField, newPasswordField, repeatNewPasswordField
    ];
}
document.getElementById("save_button_settings").addEventListener("click", async () => {
    const validationFieldsList = validateUserEdit();
    console.log(companyNameField.value);
    if (allAreFalse(validationFieldsList)) {
        const data = JSON.stringify({
            first_name: nameField.value,
            last_name: surnameField.value,
            company_name: companyNameField.value,
            country: countryField.value,
            city: cityField.value,
            address: addressField.value
        });
        const serverResponseStatus = await sendAddEditRequest(host + "/user/user/", data, "PATCH");
        actionBasedOnStatusCode(serverResponseStatus, 200, data, returnAllFields(), "/user/settings/", "PATCH", "/user/user/");
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
})

document.addEventListener('DOMContentLoaded', () => {
    // clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

fillFieldsWithData();

async function fillFieldsWithData() {
    let responseFromServer = await getCurrentUser();
    nameField.value = responseFromServer["first_name"];
    surnameField.value = responseFromServer["last_name"];
    companyNameField.value = responseFromServer["company_name"];
    countryField.value = responseFromServer["country"];
    cityField.value = responseFromServer["city"];
    addressField.value = responseFromServer["address"];
}

function getCurrentUser() {
    return fetch(host + '/user/user/', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}

document.getElementById("save_new_password").addEventListener("click", async () => {
    const validationFieldsList = validateUserPasswordEdit();
    if (allAreFalse(validationFieldsList)) {
        const data = JSON.stringify({
            old_password: oldPasswordField.value,
            new_password: newPasswordField.value,
            repeat_new_password: repeatNewPasswordField.value,
        });
        const serverResponseStatus = await sendAddEditRequest(host + "/user/user/", data, "PATCH");
        actionBasedOnStatusCode(serverResponseStatus, 200, data, allPasswordFields(), "/user/settings/", "PATCH", "/user/user/");
    } else {
        setErrorAttributesToFields(validationFieldsList, allPasswordFields());
    }
})