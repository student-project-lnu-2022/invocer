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
import { actionBasedOnStatusCode, obtainUserInitials, sendAddEditRequest } from './request_utils.js'
import {
    hideUnnecessaryElementsInMenu,
} from './utils_clients.js'
import { itemsField, invoiceTable } from "./add_edit_invoice.js";

const invoiceNameField = document.querySelector("#invoice_name");
const clientNameField = document.querySelector("#client-field");
const firstDateOfPaymentField = document.querySelector("#first_date_of_payment");
const lastDateOfPaymentField = document.querySelector("#last_date_of_payment");
const nameOfItemField = document.querySelector("#item-list");
const amountOfItemField = document.querySelector("#item_amount");
const unitOfItemField = document.querySelector("#unit-list");



function collectDataFromInvoiceTable(invoiceId) {
    const dataList = [];
    const allRows = invoiceTable.children;
    for (let i = 1; i < allRows.length; ++i) {
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
    //const validationFieldsList = validateInvoiceAdd();
    //if (allAreFalse(validationFieldsList)) {
    const data = JSON.stringify({
        name: "InvName",
        client: 119,
        price: parseFloat("1000"),
        discount: parseFloat("10"),
        date_of_invoice: "2022-12-02",
        date_of_payment: "2022-12-02",
        currency: 'UAH',
    });


    const addInvoiceStatus = await sendAddInvoiceRequest(host + "/invoices/invoice/", data, "POST");
    const orderedItems = document.querySelector("#table").querySelectorAll(".table-row");
    collectDataFromInvoiceTable()
    const dataForInvoice = collectDataFromInvoiceTable(addInvoiceStatus.id);
    dataForInvoice.forEach(element => console.log(element));
    // for (let i = 0; i < orderedItems.length; i++) {
    //     if (orderedItems[i].classList.contains('d-flex')) {
    //         let itemAmount = orderedItems[i].querySelector(".items_amount").value;
    //         let itemUnit = orderedItems[i].querySelector(".items_unit").value;
    //         const orderedItemData = JSON.stringify({
    //             invoice: addInvoiceStatus["id"],
    //             item: await getItemId(),
    //             amount: parseFloat(itemAmount),
    //             unit: itemUnit,
    //             price: parseFloat("100")
    //         });
    //         const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/invoices/ordered_items/", orderedItemData, "POST");
    //         responseStatusAdditionalUnit.push(addAdditionalUnitServerResponseStatus);
    //     }
    // }
    // if (responseStatusAdditionalUnit.every((elem) => elem === 201)) {
    //     await actionBasedOnStatusCode(201, 201, data, returnAllFields(), host, "POST", "/invoices/invoice/")
    // } else if (responseStatusAdditionalUnit.some((elem) => elem === 401)) {
    //     await actionBasedOnStatusCode(401, 201, data, returnAllFields(), host, "POST", "/invoices/invoice/")
    // } else {
    //     await actionBasedOnStatusCode(400, 201, data, returnAllFields(), host, "POST", "/invoices/invoice/")
    // }

    // } else {
    //     setErrorAttributesToFields(returnAllFields(), validationFieldsList);
    // }
});

document.addEventListener('DOMContentLoaded', () => {
    //obtainUserInitials();
    // clearErrorAttributes(returnAllFields());
    // hideUnnecessaryElementsInMenu();
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