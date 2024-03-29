import {host} from './utils_clients.js'
import {hideUnnecessaryElementsInMenu} from './utils_clients.js'
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
import {
    obtainNewAccessToken,
    obtainUserInitials,
    actionBasedOnStatusCode,
    sendAddEditRequest,
    getUserData, addDeleteButtonListeners, addCheckboxesListener
} from './request_utils.js'
import {logout} from './index.js'

const nameField = document.getElementById("name_input_settings");
const surnameField = document.getElementById("surname_input_settings");
const companyNameField = document.getElementById("company_name_input_settings");
const countryField = document.getElementById("country_input_settings");
const cityField = document.getElementById("city_input_settings");
const addressField = document.getElementById("address_input_settings");
const oldPasswordField = document.getElementById("old_password_input_settings");
const newPasswordField = document.getElementById("new_password_input_settings");
const repeatNewPasswordField = document.getElementById("repeat_new_password_input_settings");

hideUnnecessaryElementsInMenu();
function validateUserOldPassword(oldPassword) {
        let isFieldValid;
        if (oldPassword === '') {
            isFieldValid = i18next.t('empty_field_error');
        } else {
            isFieldValid = '';
        }
        return isFieldValid;
}
    function validateUserEdit() {
        removeAllErrorAttributes(returnAllFields());
        setMaxFieldContainerHeights(returnAllFields());
        return {
            'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
            'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
            'companyNameValidationResult': validationWithoutNotEmpty(companyNameField.value, /^([a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]*$/),
            'countryValidationResult': validationWithoutNotEmpty(countryField.value, /^([a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]*$/),
            'cityValidationResult': validationWithoutNotEmpty(cityField.value, /^([a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]*$/),
            'addressValidationResult': validationWithoutNotEmpty(addressField.value, /^([a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]*$/),
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
            'oldPasswordValidationResult': validateUserOldPassword(oldPasswordField.value),
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
            let serverResponseStatus = await sendAddEditRequest(host + "/user/user/", data, "PATCH");
            if (serverResponseStatus === 401){
                const successfulTokenObtaining = await obtainNewAccessToken();
                if (!successfulTokenObtaining) {
                    window.location.replace(host + '/user/login/');
                } else {
                    serverResponseStatus = await sendAddEditRequest(host + "/user/user/", data, "PATCH");
                    actionBasedOnStatusCode(serverResponseStatus, 200, data, returnAllFields(), "/user/settings/", "PATCH", "/user/user/");
                }
            }
            actionBasedOnStatusCode(serverResponseStatus, 200, data, returnAllFields(), "/user/settings/", "PATCH", "/user/user/");
        } else {
            setErrorAttributesToFields(validationFieldsList, returnAllFields());
        }
    })

    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('resize', setNavMobile);
    window.addEventListener('load', setNavMobile);
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
            const serverResponseStatus = await sendAddEditRequestSettings();
            serverResponseStatus['data'].then(result => {
            const messages = result['errors'].non_field_errors;
            for(let i = 0; i < messages.length; ++i){
                if(messages[i] === 'Invalid old password'){
                    oldPasswordField.setAttribute("error", "true");
                    oldPasswordField.setAttribute("errorText", i18next.t('invalid_old_password'));
                } if(messages[i] === 'Password and Confirm Password don\'t match'){
                    newPasswordField.setAttribute("error", "true");
                    newPasswordField.setAttribute("errorText", i18next.t('match_error'));
                    repeatNewPasswordField.setAttribute("error", "true");
                    repeatNewPasswordField.setAttribute("errorText", i18next.t('match_error'));
            }}});
            actionBasedOnStatusCode(serverResponseStatus['status'], 200, data, allPasswordFields(), "/user/settings/", "PATCH", "/user/user/");
        } else {
            console.log(validationFieldsList);
            setErrorAttributesToFields(validationFieldsList, allPasswordFields());
        }
    })

async function sendAddEditRequestSettings() {
    let jsonData;
    let status;
    let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await fetch(host + "/user/user/", {
            headers: headers,
            body: JSON.stringify({
                old_password: oldPasswordField.value,
                new_password: newPasswordField.value,
                repeat_new_password: repeatNewPasswordField.value,
            }),
            method: 'PATCH'
        });
        jsonData = response.json();
        status = response.status;
    } catch (error) {
        console.error(error);
    }
    return {'status': status, 'data': jsonData};
}

const logbtn = document.querySelector("#log_out_button-mobile");

logbtn.addEventListener("click", logout);

function setNavMobile() {
    if (window.innerWidth <= 940) {
        logbtn.style.display = "flex";
    } else {
        logbtn.style.display = "none";
    }
}

