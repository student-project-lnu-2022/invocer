const host = "http://127.0.0.1:8000";
import {
    clearErrorAttributes,
    allAreFalse,
    validateAdditionalUnits,
    validateName,
    validatePrice,
    validationDropdown,
    validateAmountInStock,
    validateBarcode,
    setErrorAttributesToFields
} from './validation_utils.js'
import {actionBasedOnStatusCode, obtainUserInitials, sendAddEditRequest} from './request_utils.js'
import {
    hideUnnecessaryElementsInMenu,
} from './utils_clients.js'
import {itemsField, invoiceTable} from "./add_edit_invoice.js";

const invoiceNameField = document.querySelector("#invoice_name");
const clientNameField = document.querySelector("#client-field");
const currencyField = document.querySelector("#currency");
const firstDateOfPaymentField = document.querySelector("#first_date_of_payment");
const lastDateOfPaymentField = document.querySelector("#last_date_of_payment");
const nameOfItemField = document.querySelector("#item-list");
const amountOfItemField = document.querySelector("#item_amount");
const unitOfItemField = document.querySelector("#unit-list");
const priceOfItemField = document.querySelector("#price-field");

function returnAllFields() {
    return [invoiceNameField, amountOfItemField, nameOfItemField, amountOfItemField];
}

function validateInvoiceAdd() {
    clearErrorAttributes(returnAllFields());
    return [
        validationDropdown("unit-list"),
        validateAmountInStock(amountOfItemField.value),
        validationDropdown("item-list"),
        validateName(invoiceNameField.value),
        validateName(clientNameField.value),
    ];
}

function collectDataFromInvoiceTable(invoiceId)
{
    const dataList = [];
    const allRows = invoiceTable.children;
    for (let i = 1; i < allRows.length; ++i){
        const allRowColumns = allRows[i].children;
        const data = JSON.stringify({
            invoice: invoiceId,
            item: allRows[i].dataset.item_id,
            amount: allRowColumns[1].textContent,
            unit: allRowColumns[2].textContent,
            price: allRowColumns[3].textContent
        });
        dataList.push(data);
    }
    return dataList;
}

document.getElementById("add_invoice_button").addEventListener("click", async () => {
        const data = JSON.stringify({
            name: invoiceNameField.value,
            client: 119,
            price: priceOfItemField.value,
            discount: parseFloat("10"),
            date_of_invoice: firstDateOfPaymentField.value,
            date_of_payment: lastDateOfPaymentField.value,
            currency: currencyField.value,
        });
        const addInvoiceStatus = await sendAddInvoiceRequest(host + "/invoices/invoice/", data, "POST");
        const dataForInvoice = collectDataFromInvoiceTable(addInvoiceStatus.id);
         if(dataForInvoice.length === 0){
            const message = document.getElementById("add_invoice_button");
        message.insertAdjacentHTML('afterend', `<div class="emptyMessageInvoice">
        <p class="emptyMessageTextInvoice">Please add at least 1 item...</p>
        </div>`);
        } else{
        let responseStatusInvoice = [];
            for (let i = 0; i < dataForInvoice.length; i++) {
                const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/invoices/ordered_items/", dataForInvoice[i], "POST");
                responseStatusInvoice.push(addAdditionalUnitServerResponseStatus);
            }
            if (responseStatusInvoice.every((elem) => elem === 201)) {
                await actionBasedOnStatusCode(201, 201, data, returnAllFields(), '', "POST", "/invoices/invoice/")
            } else if (responseStatusInvoice.some((elem) => elem === 401)) {
                await actionBasedOnStatusCode(401, 201, data, returnAllFields(), '', "POST", "/invoices/invoice/")
            } else {
                await actionBasedOnStatusCode(400, 201, data, returnAllFields(), '', "POST", "/invoices/invoice/")
            }
        }
    // } else {
    //     setErrorAttributesToFields(returnAllFields(), validationFieldsList);
    // }
});

document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    clearErrorAttributes(returnAllFields());
    hideUnnecessaryElementsInMenu();
});

async function sendAddInvoiceRequest(url, data, requestMethod) {
    let status;
    let responseData;
    let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await fetch(url, {
            headers: headers,
            body: data,
            method: requestMethod
        });
        responseData = await response.json();
        status = response.status;
        console.log(`Status code: ${status}`);

    } catch (error) {
        console.error(error);
    }
    return responseData;
}