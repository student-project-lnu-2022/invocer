const host = "http://127.0.0.1:8000";
import {
    allAreFalse,
    setErrorAttributesToFields,
    validationDropdown,
    removeAllErrorAttributes
} from './validation_utils.js'
import {sendAddEditRequest} from './request_utils.js'
import {
    currencyField, invoiceNameField, invoiceTable, clientNameField,
    dateOfInvoiceField, dateOfPaymentField
} from "./add_edit_invoice.js";

function allNeededFieldsList() {
    return [invoiceNameField, clientNameField, currencyField,
        dateOfInvoiceField, dateOfPaymentField];
}

function collectDataFromInvoiceTable() {
    const dataList = [];
    const allRows = invoiceTable.children;
    for (let i = 1; i < allRows.length; ++i) {
        const allRowColumns = allRows[i].children;
        const data = {
            invoice: null,
            item: allRows[i].dataset.item_id,
            amount: allRowColumns[1].textContent,
            unit: allRowColumns[2].textContent,
            price: allRowColumns[3].textContent
        };
        dataList.push(data);
    }
    return dataList;
}

function validateDates(invoiceDate, paymentDate)
{
    const dateValidationResult = [];
    const invoiceDateObj = new Date(invoiceDate.value);
    const paymentDateObj = new Date(paymentDate.value);
    dateValidationResult.push(isNaN(invoiceDateObj) ? 'Invalid date' : '');
    dateValidationResult.push(isNaN(paymentDateObj) ? 'Invalid date' : '');
    if (dateValidationResult.every(elem => elem === '')) {
        dateValidationResult[1] = (invoiceDateObj < paymentDateObj) ? 'Can\'t be lower than invoice date' : '';
    }
    return dateValidationResult; 
}

function validateBeforeCreatingInvoice()
{
    const dateValidation = validateDates(dateOfInvoiceField, dateOfPaymentField);
    return {
        'nameValidation' : invoiceNameField.value ? '' : 'Can\'t be empty',
        'clientValidation':validationDropdown('client-field'),
        'currencyValidation':validationDropdown('currency_input_dropdown'),
        'dateOfInvoiceValidation': dateValidation[0],
        'dateOfPaymentValidation':dateValidation[1]};
}


document.getElementById("add_invoice_button").addEventListener("click", async () => {
    removeAllErrorAttributes(allNeededFieldsList());
    const validationOfInvoiceData = validateBeforeCreatingInvoice();
    if (allAreFalse(validationOfInvoiceData)) {
        const dataForInvoice = collectDataFromInvoiceTable();
        const totalSum = dataForInvoice.reduce((a, b) => a + b['price'] * b['amount'], 0);
        const data = {
            name: invoiceNameField.value,
            client: clientNameField.value,
            price: totalSum,
            discount: 0,
            date_of_invoice: dateOfInvoiceField.value,
            date_of_payment: dateOfPaymentField.value,
            currency: currencyField.value
        };
        const addInvoiceStatus = await sendAddInvoiceRequest(host + "/invoices/invoice/", JSON.stringify(data), "POST"); 
        if (dataForInvoice.length === 0) {
            document.querySelector('.empty_invoice').style.visibility = 'visible';
        } else {
            let responseStatusInvoice = [];
            for (let i = 0; i < dataForInvoice.length; i++) {
                dataForInvoice[i].invoice = addInvoiceStatus.id;
                let stringified = JSON.stringify(dataForInvoice[i]);
                const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/invoices/ordered_items/", stringified, "POST");
                responseStatusInvoice.push(addAdditionalUnitServerResponseStatus);
            }
            console.log(responseStatusInvoice);
        }
    } else {
        console.log('Error attributes');
        console.log(validationOfInvoiceData);
        setErrorAttributesToFields(validationOfInvoiceData, allNeededFieldsList());
}  
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
    } catch (error) {
        console.error(error);
    }
    return responseData;
}