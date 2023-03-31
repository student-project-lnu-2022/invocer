import {
    nameField,
    priceField,
    amountInStockField,
    barcodeField,
    additionalFieldsContainer,
    amountAdditionalFieldsContainer,
    maxNumOfUnits,
    additionalUnitCell,
    additionalUnits,
    amountAdditionalUnitField,
    inputBarcodeVal,
    inputNameVal,
    inputAmountInStockVal,
    inputBasicUnitVal,
    inputCurrencyVal,
    inputPriceVal,
    inputBasicUnit,
    inputCurrency,
    numOfRowsObject
} from './utils_items.js'
import {removeAllErrorAttributes} from './validation_utils.js';

for (let i = 0; i < maxNumOfUnits; i++) {
    amountAdditionalUnitField[i].addEventListener("input", () => {
        const inputRowVal = document.querySelector(`#AU${i + 1}_val`);
        setTextToTable(inputRowVal, amountAdditionalUnitField[i].value + " " + retrieveNameOfBasicUnitFromDropdown());
    });
    additionalUnits[i].addEventListener("input", () => {
        let data1 = document.querySelector(`#AU${i + 1}`).value;
        setTextToTable(document.querySelector(`#Aditional_unit_${i + 1}`), data1);
    });
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

const closeButton = document.querySelectorAll(".close_btn");
for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', () => {
        removeLabels(i)
    });
}

document.querySelector("#additional_item_button").addEventListener("click", () => {
    addLabels()
});

function setTextToTable(inputElement, inputData) {
    inputElement.setAttribute('data-text', inputData);
    inputElement.innerHTML = inputElement.getAttribute('data-text');
}

function removeTextFromTable(inputElement, data) {
    inputElement.removeAttribute('data-text');
    inputElement.innerHTML = data;
}

function isFieldEmpty(input_field, fieldLabel, resultValue) {
    let data = input_field.value;
    if (data === fieldLabel) {
        data = resultValue;
    }
    return data;
}

priceField.addEventListener('input', () => {
    setTextToTable(inputPriceVal, priceField.value)
});

amountInStockField.addEventListener('input', () => {
    let basicUnitDataFromDropdown = retrieveNameOfBasicUnitFromDropdown();
    setTextToTable(inputAmountInStockVal, amountInStockField.value + " " + basicUnitDataFromDropdown);
});

nameField.addEventListener('input', () => {
    let data = isFieldEmpty(nameField, "", i18next.t("name_of_the_item"));
    setTextToTable(inputNameVal, data);
});

barcodeField.addEventListener('input', () => {
    setTextToTable(inputBarcodeVal, i18next.t("barcode_") + barcodeField.value);
});


function input_basic_unit_table() {
    let basicUnitData = isFieldEmpty(inputBasicUnit, "Basic unit", "");

    setTextToTable(inputBasicUnitVal, basicUnitData);
    setTextToTable(inputAmountInStockVal, amountInStockField.value + " " + basicUnitData);

    if (numOfRowsObject.numOfRows <= 0) return;
    let field, data;
    for (let i = 0; i < numOfRowsObject.numOfRows; i++) {
        field = document.getElementById(`AU${i + 1}_val`);
        data = field.getAttribute('data-text');
        if (data === null) {
            data = "";
        } else {
            data = data.split(" ")[0];
        }
        setTextToTable(field, data + " " + basicUnitData);
    }
}


const currencyDropdown = document.querySelector('.currency_dropdown');
currencyDropdown.addEventListener('change', function () {
    let selectedCurrency = document.querySelector('#currency_input_dropdown').value;
    setTextToTable(inputCurrencyVal, selectedCurrency);
});

const unitDropdown = document.querySelector('.units_dropdown');
unitDropdown.addEventListener('change', function () {
    let selectedUnit = document.querySelector('#units_input_dropdown').value;
    setTextToTable(inputBasicUnitVal, selectedUnit);
    setTextToTable(inputAmountInStockVal, amountInStockField.value + " " + selectedUnit);
    updateAdditionalUnitsOnBasicUnitChanged();
});

function retrieveNameOfBasicUnitFromDropdown() {
    if (document.querySelector('#units_input_dropdown').value) {
        return document.querySelector('#units_input_dropdown').value
    }
    return "";
}

function updateAdditionalUnitsOnBasicUnitChanged() {
    console.log("Inside");
    for (let i = 0; i < maxNumOfUnits; i++) {
        let inputRowVal = document.querySelector(`#AU${i + 1}_val`);
        if (inputRowVal) {
            setTextToTable(inputRowVal, amountAdditionalUnitField[i].value + " " + retrieveNameOfBasicUnitFromDropdown());
        }
        let data1 = document.querySelector(`#AU${i + 1}`);
        if (data1) {
            setTextToTable(document.querySelector(`#Aditional_unit_${i + 1}`), data1.value);
        }
    }
}

