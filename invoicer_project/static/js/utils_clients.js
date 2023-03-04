export const host = "http://127.0.0.1:8000";
const nameSurnMaxLength = 35;
const countryMaxLength = 35;
const addressMaxLength = 40;

export const nameField = document.getElementById("name_input_client_edit_page");
export const surnameField = document.getElementById("surname_input_client_edit_page");
export const emailField = document.getElementById("email_input_client_edit_page");
export const telephoneField = document.getElementById("telephone_input_client_edit_page");
export const zipField = document.getElementById("zip_input_client_edit_page");
export const countryField = document.getElementById("country_input_client_edit_page");
export const cityField = document.getElementById("city_input_client_edit_page");
export const addressField = document.getElementById("address_input_client_edit_page");
export const clientId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

export const returnAllFields = function () {
    return [
        nameField, surnameField,
        emailField, telephoneField,
        zipField, countryField,
        cityField, addressField
    ];
}

export async function obtainNewAccessToken() {
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

export async function obtainUserInitials() {
    let responseCode;
    const token = window.localStorage.getItem('accessToken');
    if (token) {
        const data = { "accessToken": token };
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
    }
    else {
        window.location.replace(host + '/user/login/');
    }
}

export function fillInitials(userData) {
    const userFirstName = userData["first_name"];
    const userLastName = userData["last_name"];
    document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
}


export function clearErrorAttributes(returnAllFieldsList) {
        for (let field of returnAllFieldsList) {
            field.addEventListener('input', () => {
                field.removeAttribute("error");
                field.removeAttribute("errorText");
            })
        }
}

export function setMaxFieldContainerHeights(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}

export function removeAllErrorAttributes(returnAllFieldsList) {
    for (let item of returnAllFieldsList) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

export function allAreFalse(object) {
    for (let key in object) {
        if (object[key]) {
            return false;
        }
    }
    return true;
}

export function validation(fieldToValidate, fieldRegex) {
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

export function validateNameAndSurnameAsStrings(strToValidate) {
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

export function validateAddress(addressToValidate) {
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

export function validateCountry(countryToValidate) {
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

export function validateCity(cityToValidate) {
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

export function setErrorAttributesToFields(errorsObject) {
    let fieldIndex = 0;
    let fields = returnAllFields();
    for (let error in errorsObject) {
        if (errorsObject[error]) {
            fields[fieldIndex].setAttribute("error", "true");
            fields[fieldIndex].setAttribute("errorText", errorsObject[error]);
        }
        fieldIndex++;
    }
}
