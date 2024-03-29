const host = "http://127.0.0.1:8000";
import {
    allAreFalse,
    setErrorAttributesToFields,
    validationDropdown,
    removeAllErrorAttributes
} from './validation_utils.js'
import {obtainNewAccessToken, sendAddEditRequest} from './request_utils.js'
import {
    currencyField, invoiceNameField, invoiceTable, clientNameField,
    dateOfInvoiceField, dateOfPaymentField, itemsList
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
        let amountInBasic;
        const item = itemsList.find(elem => elem.id == allRows[i].dataset.item_id);
        if (item.basicUnit !== allRowColumns[2].textContent) {
            for (let unit in item.additionalUnits) {
                if (unit === allRowColumns[2].textContent) {
                    amountInBasic = item.additionalUnits[unit];
                    break;
                }
            }
        } else {
            amountInBasic = 1;
        }
        const data = {
            invoice: null,
            item: allRows[i].dataset.item_id,
            amount: allRowColumns[1].textContent,
            unit: allRowColumns[2].textContent,
            price: allRowColumns[3].textContent,
            amount_in_unit: allRowColumns[1].textContent * amountInBasic
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
    dateValidationResult.push((isNaN(invoiceDateObj) || (parseInt(Math.log10(invoiceDateObj.getFullYear())) + 1) > 4) ? i18next.t("Invalid_date") : '');
    dateValidationResult.push((isNaN(paymentDateObj) || (parseInt(Math.log10(paymentDateObj.getFullYear())) + 1) > 4) ? i18next.t("Invalid_date") : '');
    if (dateValidationResult.every(elem => elem === '')) {
        dateValidationResult[1] = (invoiceDateObj > paymentDateObj) ? i18next.t("lower_date_error") : '';
    }
    return dateValidationResult; 
}

function validateBeforeCreatingInvoice()
{
    const dateValidation = validateDates(dateOfInvoiceField, dateOfPaymentField);
    return {
        'nameValidation' : invoiceNameField.value ? '' : i18next.t("empty_field_error"),
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
        const totalSum = Math.round( (dataForInvoice.reduce((a, b) => a + b['price'] * b['amount'], 0) + Number.EPSILON) * 100 ) / 100;
        const data = {
            name: invoiceNameField.value,
            client: clientNameField.value,
            price: totalSum,
            discount: 0,
            date_of_invoice: dateOfInvoiceField.value,
            date_of_payment: dateOfPaymentField.value,
            currency: currencyField.value
        };
        let addInvoiceStatus = await sendAddInvoiceRequest(host + "/invoices/invoice/", JSON.stringify(data), "POST"); 
        console.log(addInvoiceStatus);
        if (addInvoiceStatus[1] === 401) {
            if (await obtainNewAccessToken()){
                addInvoiceStatus = await sendAddInvoiceRequest(host + "/invoices/invoice/", JSON.stringify(data), "POST"); 
            } else {
                alert('Authorization error');
                window.location.href = host + '/user/login/';
            }
        }
        if (dataForInvoice.length === 0) {
            document.querySelector('.empty_invoice').style.visibility = 'visible';
        } else {
            const responseStatusInvoice = [];
            for (let i = 0; i < dataForInvoice.length; i++) {
                dataForInvoice[i].invoice = addInvoiceStatus[0].id;
                let stringified = JSON.stringify(dataForInvoice[i]);
                let addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/invoices/ordered_items/", stringified, "POST");
                if (addAdditionalUnitServerResponseStatus === 401) {
                    if (!(await obtainNewAccessToken())){
                        window.location.href = host + '/user/login/';
                    } else {
                        addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/invoices/ordered_items/", stringified, "POST");
                    }
                }
                responseStatusInvoice.push(addAdditionalUnitServerResponseStatus);
            }
            if (!responseStatusInvoice.every(responseStatus => responseStatus === 201)){
                alert('The error occurred during invoice creation');
            }
            window.location.href = host;
        }
    } else {
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
    return [responseData, status];
}