import {removeStylesFromDropdownElement} from "./dropdown.js";
const nameSurnMaxLength = 35;
const countryMaxLength = 35;
const addressMaxLength = 40;
const barcodeMinLength = 3;
const barcodeMaxLength = 43;
const amountMaxLength = 10;
const nameItemMaxLength = 35;

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
    } else if (!(/^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/.test(strToValidate.charAt(0)))) {
        strValidationResult = "Has to begin with capital";
    } else if (!/[a-zа-яїієґ\u00E0-\u00F6\u00F8-\u00FE]/.test(strToValidate)) {
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
    } else if (!/^[#./0-9a-zA-ZА-ЯЇІЄҐа-яїієґ\u0400-\u04FF\s,-]+$/.test(addressToValidate)) {
        isAddressValid = "Special characters aren't allowed";
    } else {
        isAddressValid = '';
    }
    return isAddressValid;
}

export function validateCountry(countryToValidate) {
    if (countryToValidate === "") {
        return "Country field can't be empty";
    }
    else {
        return "";
    }
}

export function validateCity(cityToValidate) {
    let isCityValid;
    if (cityToValidate === '') {
        isCityValid = "This field can't be empty";
    } else if (!(/^[A-ZА-ЯЇІЄҐ\u00C0-\u00D6\u00D8-\u00DE]/.test(cityToValidate.charAt(0)))) {
        isCityValid = "Has to begin with capital";
    } else if (cityToValidate.length > countryMaxLength) {
        isCityValid = `Max length – ${countryMaxLength} chars`;
    } else {
        isCityValid = '';
    }
    return isCityValid;
}

export function validateName(strToValidate) {
    let strValidationResult;
    if (!strToValidate) {
        strValidationResult = "This field can't be empty";
    } else if (strToValidate.length > nameItemMaxLength) {
        strValidationResult = `Max length – ${nameItemMaxLength} chars`;
    } else if (!(/[A-ZA-ЯІЇЄҐ]/.test(strToValidate.charAt(0)))) {
        strValidationResult = "Has to begin with capital";
    } else if (!/[a-zа-яїієґ]/.test(strToValidate)) {
        strValidationResult = "At least one lowercase";
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
    let dropdownElement = document.querySelector('#' + dropdownId);
    if (dropdownElement.value === "") {
        return "This field can't be empty";
    }
    return '';
}

export function validatePrice(priceToValidate) {
    let isPriceValid;
    if (priceToValidate === '') {
        isPriceValid = "This field can't be empty";
    } else if (priceToValidate.includes(' ')) {
        isPriceValid = "No whitespaces";
    } else if (!(/^\$?\d+(,\d{3})*(\.\d{1,2})?$/.test(priceToValidate))) {
        isPriceValid = "Invalid format";
    } else {
        isPriceValid = '';
    }
    return isPriceValid;
}

export function validateAmountInStock(amountToValidate) {
    let isAmountValid;
    if (amountToValidate === '') {
        isAmountValid = "This field can't be empty";
    } else if (amountToValidate.length > amountMaxLength) {
        isAmountValid = `Max length – ${amountMaxLength} chars`;
    } else if (!(/^\$?\d+(,\d{3})*(\.\d{1,2})?$/.test(amountToValidate))) {
        isAmountValid = "Invalid format";
    } else {
        isAmountValid = '';
    }
    return isAmountValid;
}

export function validateBarcode(barcodeToValidate) {
    let isBarcodeValid;
    if (barcodeToValidate === '') {
        isBarcodeValid = "This field can't be empty";
    } else if (barcodeToValidate.length > barcodeMaxLength || barcodeToValidate.length < barcodeMinLength) {
        isBarcodeValid = `Amount of digits must be in [${barcodeMinLength}, ${barcodeMaxLength}]`;
    } else if (!/^[0-9]+$/.test(barcodeToValidate)) {
        isBarcodeValid = "Invalid format";
    } else {
        isBarcodeValid = '';
    }
    return isBarcodeValid;
}

function isADropdown(field) {
    return field.tagName !== 'MD-OUTLINED-TEXT-FIELD';
}
export function setErrorAttributesToFields(errorsObject, fields) {
    let fieldIndex = 0;
    for (let error in errorsObject) {
        if (errorsObject[error]) {
            if (isADropdown(fields[fieldIndex])) {
                setErrorAttributeToDropdown(fields[fieldIndex].parentElement);
            } else {
                fields[fieldIndex].setAttribute("error", "true");
                fields[fieldIndex].setAttribute("errorText", errorsObject[error]);
            }
        }
        fieldIndex++;
    }
}

export function setErrorAttributeToDropdown(field) {
    field.classList.add("error");
}


export function clearErrorAttributes(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        if (isADropdown(field)) {
            field.addEventListener('input', () => {
                removeStylesFromDropdownElement(field);
            });
        } else {
            field.addEventListener('input', () => {
                field.removeAttribute("error");
                field.removeAttribute("errorText");
            });
        }
    }
}


export function setMaxFieldContainerHeights(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        field.shadowRoot.querySelector('.text-field .field').shadowRoot.querySelector('.field .container-overflow').style.maxHeight = "56px";
    }
}

export function removeAllErrorAttributes(returnAllFieldsList) {
    for (let item of returnAllFieldsList) {
        if (isADropdown(item)) {
            removeStylesFromDropdownElement(item);
        } else {
            item.removeAttribute("error");
            item.removeAttribute("errorText");
        } 
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
