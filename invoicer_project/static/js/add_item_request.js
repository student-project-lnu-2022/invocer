const nameItemMaxLength = 35;
const barcodeMaxLength = 13;
const amountMaxLength = 10;
const host = "http://127.0.0.1:8000";

const nameField = document.getElementById("name");
const priceField = document.getElementById("price");
const amountInStockField = document.getElementById("amount_in_stock");
const barcodeField = document.getElementById("barcode");
const columnWithData = document.querySelector('#column-2');
const additionalFieldsContainer = columnWithData.querySelectorAll('.additional_unit_field');
const amountAdditionalFieldsContainer = columnWithData.querySelectorAll('.amount_additional_unit_field');


const returnAllFields = function () {
    return [
        nameField, priceField,
        amountInStockField, barcodeField
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
        'nameValidationResult': validateName(nameField.value),
        'priceValidationResult': validatePrice(priceField.value),
        'amountInStockValidationResult': validateAmountInStock(amountInStockField.value),
        'barcodeValidationResult': validateBarcode(barcodeField.value),
    };
}

function validateName(strToValidate) {
    let strValidationResult;
    if (!strToValidate) {
        strValidationResult = "This field can't be empty";
    } else if (strToValidate.includes(' ')) {
        strValidationResult = "No whitespaces";
    } else if (strToValidate.length > nameItemMaxLength) {
        strValidationResult = `Max length – ${nameItemMaxLength} chars`;
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

function validatePrice(priceToValidate) {
    let isPriceValid;
    if (priceToValidate === '') {
        isPriceValid = "This field can't be empty";
    } else if (priceToValidate.includes(' ')) {
        isPriceValid = "No whitespaces";
    } else if (!(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(priceToValidate))) {
        isPriceValid = "Invalid format";
    } else {
        isPriceValid = '';
    }
    return isPriceValid;
}

function validateAmountInStock(amountToValidate) {
    let isAmountValid;
    if (amountToValidate === '') {
        isAmountValid = "This field can't be empty";
    } else if (amountToValidate.length > amountMaxLength) {
        isAmountValid = `Max length – ${amountMaxLength} chars`;
    } else if (!/^[0-9]+$/.test(amountToValidate)) {
        isAmountValid = "Invalid format";
    } else {
        isAmountValid = '';
    }
    return isAmountValid;
}

function validateBarcode(barcodeToValidate) {
    let isBarcodeValid;
    if (barcodeToValidate === '') {
        isBarcodeValid = "This field can't be empty";
    } else if (barcodeToValidate.length !== barcodeMaxLength) {
        isBarcodeValid = `Length must be – ${barcodeMaxLength} numbers`;
    } else if (!/^[0-9]+$/.test(barcodeToValidate)) {
        isBarcodeValid = "Invalid format";
    } else {
        isBarcodeValid = '';
    }
    return isBarcodeValid;
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

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes();
});

document.getElementById("btn").addEventListener("click", async () => {
    const validationFieldsList = validateClientAdd();
    if (allAreFalse(validationFieldsList)) {
    } else {
        setErrorAttributesToFields(validationFieldsList);
    }
});