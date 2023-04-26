window.onload = function () {
    updateContent();
}

export function updateContent() {
    translateMenu();
    translateInvoicesList();
    translateInvoiceAdd();
}

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

function translateMenu() {
    const menuItemsList = document.querySelectorAll("span.translation");
    if (menuItemsList) {
        for (let menuItem of menuItemsList) {
            menuItem.textContent = getI18NDataFromAttribute(menuItem);
        }
    }

    let addInvoiceButton = document.querySelector("#adder");
    if (addInvoiceButton) {
        addInvoiceButton.label = i18next.t("add_invoice");
    }
}

function translateInvoicesList() {
    const searchInput = document.querySelector("#search_bar");
    if (searchInput) {
        searchInput.placeholder = getI18NDataFromAttribute(searchInput);
    }

    const sortAscendingOrder = document.querySelector("#sort_asc");
    if (sortAscendingOrder) {
        sortAscendingOrder.textContent = getI18NDataFromAttribute(sortAscendingOrder);
    }

    let addItemButton = document.querySelector("#adder");
    if (addItemButton) {
        addItemButton.label = i18next.t("add_invoice");
    }

       const recipientEmailInput = document.querySelectorAll(".recipient-email-input");
       if (recipientEmailInput) {
           for(let recipientEmail of recipientEmailInput) {
               recipientEmail.label = getI18NDataFromAttribute(recipientEmail);
               recipientEmail.placeholder = getI18NDataFromAttribute(recipientEmail);
           }
    }

       const sendPDFs = document.querySelectorAll(".send-email-btn");
       if (sendPDFs) {
           for(let sendPDF of sendPDFs) {
               sendPDF.label = getI18NDataFromAttribute(sendPDF);
           }
    }

       let contextMenuEditButtons = document.querySelectorAll(".context-menu-edit-button");
    if (contextMenuEditButtons) {
        for (let contextMenuEditButton of contextMenuEditButtons) {
            contextMenuEditButton.childNodes[1].nodeValue = i18next.t("edit");
        }
    }

    let contextMenuDeleteButtons = document.querySelectorAll(".context-menu-delete-button");
    if (contextMenuDeleteButtons) {
        for (let contextMenuDeleteButton of contextMenuDeleteButtons) {
            contextMenuDeleteButton.childNodes[1].nodeValue = i18next.t("delete");
        }
    }

    let contextMenuUploadButtons = document.querySelectorAll(".context-menu-upload-button");
    if (contextMenuUploadButtons) {
        for (let contextMenuUploadButton of contextMenuUploadButtons) {
            contextMenuUploadButton.childNodes[1].nodeValue = i18next.t("upload");
        }
    }

    let contextMenuDownloadButtons = document.querySelectorAll(".context-menu-download-button");
    if (contextMenuDownloadButtons) {
        for (let contextMenuDownloadButton of contextMenuDownloadButtons) {
            contextMenuDownloadButton.childNodes[1].nodeValue = i18next.t("download");
        }
    }

    const addItemMobileButton = document.querySelector("#add_invoice_mobile");
    if (addItemMobileButton) {
        addItemMobileButton.label = getI18NDataFromAttribute(addItemMobileButton);
    }
}

function translateInvoiceAdd() {
    const addInvoiceHeaderText = document.querySelector("#new_item_text");
    if (addInvoiceHeaderText) {
        addInvoiceHeaderText.textContent = getI18NDataFromAttribute(addInvoiceHeaderText);
    }

    const nameInput = document.querySelector("#invoice_name");
    if (nameInput) {
        nameInput.label = getI18NDataFromAttribute(nameInput);
    }

    const selectClientText = document.querySelector("#select_client_div");
    if (selectClientText) {
        selectClientText.textContent = getI18NDataFromAttribute(selectClientText)
    }

    const selectCurrencyText = document.querySelector("#select_currency_div");
    if (selectCurrencyText) {
        selectCurrencyText.textContent = getI18NDataFromAttribute(selectCurrencyText)
    }

    const currencyDivs = document.querySelectorAll('.currency_menu .item');
    if (currencyDivs) {
        for (let i = 0; i < currencyDivs.length; i++) {
            currencyDivs[i].childNodes[1].textContent = i18next.t(currencyDivs[i].getAttribute('data-value'));
        }
    }

    const dateOfInvoice = document.querySelector("#date_of_invoice");
    if (dateOfInvoice) {
        dateOfInvoice.label = getI18NDataFromAttribute(dateOfInvoice)
    }

    const dateOfPayment = document.querySelector("#date_of_payment");
    if (dateOfPayment) {
        dateOfPayment.label = getI18NDataFromAttribute(dateOfPayment)
    }

    const selectItemText = document.querySelector("#select_item_div");
    if (selectItemText) {
        selectItemText.textContent = getI18NDataFromAttribute(selectItemText)
    }

    const selectUnitText = document.querySelector("#select_unit_div");
    if (selectUnitText) {
        selectUnitText.textContent = getI18NDataFromAttribute(selectUnitText)
    }

    const unitDivs = document.querySelectorAll('.units_item');
    if (unitDivs) {
        for (let i = 0; i < unitDivs.length; i++) {
            unitDivs[i].textContent = i18next.t(unitDivs[i].getAttribute('data-value'));
        }
    }

    const addItems = document.querySelector("#add_items_id");
    if (addItems) {
        addItems.textContent = getI18NDataFromAttribute(addItems)
    }

    const amountOfItem = document.querySelector("#item_amount");
    if (amountOfItem) {
        amountOfItem.label = getI18NDataFromAttribute(amountOfItem)
    }

    const priceOfItem = document.querySelector("#price-field");
    if (priceOfItem) {
        priceOfItem.label = getI18NDataFromAttribute(priceOfItem)
    }

    const addItemButton = document.querySelector("#item_to_table");
    if (addItemButton) {
        addItemButton.label = getI18NDataFromAttribute(addItemButton)
    }

    const invoiceName = document.querySelector("#invoice_name_display");
    if (invoiceName) {
        invoiceName.textContent = getI18NDataFromAttribute(invoiceName)
    }

    const clientName = document.querySelector("#client_name_display");
    if (clientName) {
        clientName.textContent = getI18NDataFromAttribute(clientName)
    }

    const clientEmail = document.querySelector("#client_email_display");
    if (clientEmail) {
        clientEmail.textContent = getI18NDataFromAttribute(clientEmail)
    }

    const clientPhone = document.querySelector("#client_phone_display");
    if (clientPhone) {
        clientPhone.textContent = getI18NDataFromAttribute(clientPhone)
    }

    const dateOfInvoiceTable = document.querySelector("#inv_date_display");
    if (dateOfInvoiceTable) {
        dateOfInvoiceTable.textContent = getI18NDataFromAttribute(dateOfInvoiceTable)
    }

    const dateOfPaymentTable = document.querySelector("#payment_date_display");
    if (dateOfPaymentTable) {
        dateOfPaymentTable.textContent = getI18NDataFromAttribute(dateOfPaymentTable)
    }

    const total = document.querySelector("#invoice_total");
    if (total) {
        total.textContent = getI18NDataFromAttribute(total)
    }

    const invoiceNameTable = document.querySelector("#invoice_name_");
    if (invoiceNameTable) {
        invoiceNameTable.textContent = getI18NDataFromAttribute(invoiceNameTable)
    }

    const invoiceAmountTable = document.querySelector("#item_amount_");
    if (invoiceAmountTable) {
        invoiceAmountTable.textContent = getI18NDataFromAttribute(invoiceAmountTable)
    }

    const invoiceUnitTable = document.querySelector("#item_unit_");
    if (invoiceUnitTable) {
        invoiceUnitTable.textContent = getI18NDataFromAttribute(invoiceUnitTable)
    }

    const invoicePriceTable = document.querySelector("#item_price_");
    if (invoicePriceTable) {
        invoicePriceTable.textContent = getI18NDataFromAttribute(invoicePriceTable)
    }

    const invoiceTotalTable = document.querySelector("#item_total_");
    if (invoiceTotalTable) {
        invoiceTotalTable.textContent = getI18NDataFromAttribute(invoiceTotalTable)
    }

        const addInvoiceButton = document.querySelector("#add_invoice_button");
    if (addInvoiceButton) {
        addInvoiceButton.label = getI18NDataFromAttribute(addInvoiceButton)
    }
}