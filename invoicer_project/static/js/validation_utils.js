const nameSurnMaxLength = 35;
const countryMaxLength = 35;
const addressMaxLength = 40;
const barcodeMinLength = 3;
const barcodeMaxLength = 43;
const amountMaxLength = 10;
const nameItemMaxLength = 35;
const passwordMinLength = 8;
const passwordMaxLength = 15;
const specialCharsArray = ['!', '"', '#', '$', '%', '&', '(', ')', '*', '+', ',', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '{', '|', '}', '~'];

export function validation(fieldToValidate, fieldRegex) {
    let isFieldValid = '';
    if (fieldToValidate === '') {
        isFieldValid = i18next.t("empty_field_error");
    } else if (fieldToValidate.includes(' ')) {
        isFieldValid = i18next.t("no_whitespaces_error");
    } else if (!(fieldRegex.test(fieldToValidate))) {
        isFieldValid = i18next.t("invalid_format_error");
    } else {
        isFieldValid = '';
    }
    return isFieldValid;
}


export function validationWithoutNotEmpty(fieldToValidate, fieldRegex) {
    let isFieldValid;
    if (fieldToValidate === '') {
        isFieldValid = "";
    } else if (!(fieldRegex.test(fieldToValidate))) {
        isFieldValid = i18next.t("invalid_format_error");
    } else {
        isFieldValid = '';
    }
    return isFieldValid;
}

export function validateNameAndSurnameAsStrings(strToValidate) {
    let strValidationResult;
    if (!strToValidate) {
        strValidationResult = i18next.t("empty_field_error");
    } else if (strToValidate.includes(' ')) {
        strValidationResult = i18next.t("no_whitespaces_error");
    } else if (strToValidate.length > nameSurnMaxLength) {
        strValidationResult = i18next.t("max_length_chars", {maxLength: nameSurnMaxLength});
    } else if (!(/^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/.test(strToValidate.charAt(0)))) {
        strValidationResult = i18next.t("capital_letter_error");
    } else if (!/[a-zа-яїієґ\u00E0-\u00F6\u00F8-\u00FE]/.test(strToValidate)) {
        strValidationResult = i18next.t("lowercase_error");
    } else if (/\d/.test(strToValidate)) {
        strValidationResult = i18next.t("digit_in_name_or_surname_error");
    } else if (new RegExp(`[${specialCharsArray.join('')}]`).test(strToValidate)) {
        strValidationResult = i18next.t("special_characters_error");
    } else {
        strValidationResult = '';
    }
    return strValidationResult;
}

export function validatePasswordAsString(passwordToValidate) {
    let isPasswordValid;
    if (passwordToValidate === '') {
        isPasswordValid = i18next.t("empty_field_error");
    } else if (passwordToValidate.includes(' ')) {
        isPasswordValid = i18next.t("no_whitespaces_error");
    } else if (passwordToValidate.length < passwordMinLength) {
        isPasswordValid = i18next.t('few_symbols_error', {passwordMinLength});
    } else if (passwordToValidate.length > passwordMaxLength) {
        isPasswordValid = i18next.t('too_much_symbols_error', {passwordMaxLength});
    } else if (!(/^[a-z0-9]+$/i.test(passwordToValidate))) {
        isPasswordValid = i18next.t("only_a_z_and_digits_error");
    } else if (!(/\d/.test(passwordToValidate))) {
        isPasswordValid = i18next.t("at_least_1_digit");
    } else if (!(/[a-z]/.test(passwordToValidate))) {
        isPasswordValid = i18next.t("at_least_1_lowercase");
    } else if (!(/[A-Z]/.test(passwordToValidate))) {
        isPasswordValid = i18next.t("at_least_1_uppercase");
    } else {
        isPasswordValid = '';
    }
    return isPasswordValid;
}

export function validateAddress(addressToValidate) {
    let isAddressValid;
    if (addressToValidate === '') {
        isAddressValid = i18next.t('empty_field_error');
    } else if (addressToValidate.length > addressMaxLength) {
        isAddressValid = i18next.t('max_length_error', {maxLength: addressMaxLength});
    } else if (!/^[#./0-9a-zA-ZА-ЯЇІЄҐа-яїієґ\u0400-\u04FF\s,-]+$/.test(addressToValidate)) {
        isAddressValid = i18next.t('special_characters_error');
    } else {
        isAddressValid = '';
    }
    return isAddressValid;
}

export function validateCountry(countryToValidate) {
    let isCountryValid;
    if (countryToValidate === '') {
        isCountryValid = i18next.t('empty_field_error');
    } else if (!(/^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/.test(countryToValidate.charAt(0)))) {
        isCountryValid = i18next.t('capital_letter_error');
    } else if (countryToValidate.length > countryMaxLength) {
        isCountryValid = i18next.t('max_length_error', {maxLength: countryMaxLength});
    } else {
        isCountryValid = '';
    }
    return isCountryValid;
}

export function validateCity(cityToValidate) {
    let isCityValid;
    if (cityToValidate === '') {
        isCityValid = i18next.t('empty_field_error');
    } else if (!(/^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/.test(cityToValidate.charAt(0)))) {
        isCityValid = i18next.t('capital_letter_error');
    } else if (cityToValidate.length > countryMaxLength) {
        isCityValid = i18next.t('max_length_error', {maxLength: countryMaxLength});
    } else if (!/^[#./0-9a-zA-ZА-ЯЇІЄҐа-яїієґ\u0400-\u04FF\s,-]+$/.test(cityToValidate)) {
        isCityValid = i18next.t('special_characters_error');
    } else {
        isCityValid = '';
    }
    return isCityValid;
}

export function validateName(strToValidate) {
    let strValidationResult;
    if (!strToValidate) {
        strValidationResult = i18next.t('empty_field_error');
    } else if (strToValidate.length > nameItemMaxLength) {
        strValidationResult = i18next.t('max_length_error', {maxLength: nameItemMaxLength});
    } else if (!(/[A-ZA-ЯІЇЄҐ]/.test(strToValidate.charAt(0)))) {
        strValidationResult = i18next.t('capital_letter_error');
    } else if (!/[a-zа-яїієґ]/.test(strToValidate)) {
        strValidationResult = i18next.t('lowercase_error');
    } else {
        strValidationResult = '';
    }
    return strValidationResult;
}

export function validateAdditionalUnits(container, regex) {
    let strValidationResult = [];
    for (let field of container) {
        let res = validation(field.value, regex);
        strValidationResult.push(res);
    }
    return strValidationResult;
}

export function validationDropdown(dropdownId) {
    let isFieldValid = '';
    let dropdownElement = document.querySelector('#' + dropdownId);
    if (dropdownElement.value === "") {
        isFieldValid = i18next.t('empty_field_error');
    }
    return isFieldValid;
}

export function validatePrice(priceToValidate) {
    let isPriceValid;
    if (priceToValidate === '') {
        isPriceValid = i18next.t('empty_field_error');
    } else if (priceToValidate.includes(' ')) {
        isPriceValid = i18next.t('no_whitespaces_error');
    } else if (!(/^\$?\d+(,\d{3})*(\.\d{1,2})?$/.test(priceToValidate))) {
        isPriceValid = i18next.t('invalid_format_error');
    } else {
        isPriceValid = '';
    }
    return isPriceValid;
}

export function validateAmountInStock(amountToValidate) {
    let isAmountValid;
    if (amountToValidate === '') {
        isAmountValid = i18next.t('empty_field_error');
    } else if (amountToValidate.length > amountMaxLength) {
        isAmountValid = i18next.t('max_length_error', {maxLength: amountMaxLength});
    } else if (!(/^\$?\d+(,\d{3})*(\.\d{1,2})?$/.test(amountToValidate))) {
        isAmountValid = i18next.t('invalid_format_error');
    } else {
        isAmountValid = '';
    }
    return isAmountValid;
}

export function validateBarcode(barcodeToValidate) {
    let isBarcodeValid;
    if (barcodeToValidate === '') {
        isBarcodeValid = i18next.t('empty_field_error');
    } else if (barcodeToValidate.length > barcodeMaxLength || barcodeToValidate.length < barcodeMinLength) {
        isBarcodeValid = i18next.t('range_error', {min: barcodeMinLength, max: barcodeMaxLength});
    } else if (!/^[0-9]+$/.test(barcodeToValidate)) {
        isBarcodeValid = i18next.t('invalid_format_error');
    } else {
        isBarcodeValid = '';
    }
    return isBarcodeValid;
}

export function setErrorAttributesToFields(errorsObject, fields) {
    let fieldIndex = 0;
    for (let error in errorsObject) {
        if (errorsObject[error]) {
            fields[fieldIndex].setAttribute("error", "true");
            fields[fieldIndex].setAttribute("errorText", errorsObject[error]);
        }
        fieldIndex++;
    }
}

export function clearErrorToDropdown(field) {
    field.addEventListener('click', () => {
        field.querySelector(".dropdown__button").classList.remove("dropdown__button_error");
    });
}

export function clearErrorAttributes(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        if (field.classList.contains("dropdown_list")) {
            clearErrorToDropdown(field);
        }
        field.addEventListener('input', () => {
            field.removeAttribute("error");
            field.removeAttribute("errorText");
        })
    }
}

export function setErrorAttributeToDropdown(field) {
    field.classList.add("error");
}

export function setMaxFieldContainerHeights(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        field.shadowRoot.querySelector('.text-field .field').shadowRoot.querySelector('.field .container-overflow').style.maxHeight = "56px";
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
