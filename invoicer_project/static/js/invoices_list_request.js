const host = "http://127.0.0.1:8000";
import {
    addCheckboxesListener,
    addDeleteButtonListeners,
    getUserData,
    obtainNewAccessToken,
    obtainUserInitials,
    search
} from './request_utils.js';

document.getElementById("search_bar").addEventListener('keyup', () => {
    search('invoice_name', 'invoice_list_item')
});

function createInvoiceListContent(data) {
    if (data.length === 0) {
        const message = document.getElementById("other_elements_invoices");
        message.insertAdjacentHTML('afterbegin', `<div class="emptyMessage">
        <p class="emptyMessageText">No invoices have been added yet...</p>
        </div>`);
    } else {
        for (let i = 0; i < data.length; i++) {
            const {
                id: invoiceId, name: invoiceName, price: invoicePrice, date_of_payment: invoiceDate,
                client_first_name: clientFirstName, client_last_name: clientLastName, currency: invoiceCurrency
            } = data[i];
            document.getElementById("other_elements_invoices").insertAdjacentHTML('afterbegin', `<div class="row invoice_list_item align-items-center justify-content-around" data-element-id="${invoiceId}">
                    <div class="col-md-6 col-sm-6 col-7 list_item_name">
                    <div class="d-flex flex-wrap flex-column list_item_info_block">
                        <p class="invoice_name" data-element-id="${invoiceId}">${invoiceName}</p>
                        <div class="invoice_bottom_info">
                            <p class="invoice_info_text" data-element-id="${invoiceId}">${clientFirstName + ' ' + clientLastName}</p>
                            <p class="invoice_info_text" data-element-id="${invoiceId}">${invoiceDate}</p>
                        </div>
                    </div>
                    </div>
                    <div class="d-flex flex-wrap flex-row justify-content-end col-md-6 col-sm-6 col-5">
                        <div class="d-flex flex-wrap flex-column list_item_info_block">
                            <p class="currency_text" data-element-id="${invoiceId}">${invoicePrice} ${invoiceCurrency}</p>
                        </div>
                        <div class="list_invoice_user_buttons">
                            <md-standard-icon-button class="edit-item"><span class="material-symbols-outlined">edit</span></md-standard-icon-button>
                            <md-standard-icon-button class="delete-invoice" data-element-id="${invoiceId}"><span class="material-symbols-outlined">delete</span></md-standard-icon-button>
                            <md-standard-icon-button class="upload" data-element-id="${invoiceId}"><span class="material-symbols-outlined">upload</span></md-standard-icon-button>
                            <div class="modal">
                              <div class="modal-content d-flex">
                                <div class="row">
                                    <md-standard-icon-button class="close">close</md-standard-icon-button>
                                </div>
                                <div class="modal-body">
                                    <md-outlined-text-field type="email" class='recipient-email-input' placeholder="Recipient email"></md-outlined-text-field>
                                    <md-fab-extended class="send-email-btn" icon="send" label="Send PDF" data-element-id="${invoiceId}"></md-fab-extended>
                                    <div id="errorMessage" data-element-id="${invoiceId}"></div>                       
                                </div>
                              </div>
                            </div>
                            <md-standard-icon-button class="download" data-element-id="${invoiceId}"><span class="material-symbols-outlined">download</span></md-standard-icon-button>
                            <md-checkbox class="delete_invoices_checkbox" id="list_item_user_delete" data-element-id="${invoiceId}"></md-checkbox>
                        </div>
                    </div>
                </div>`);
        }
    }
}


async function addElementsDynamically() {
    let responseFromServer = await getUserData("/invoices/invoice/");
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createInvoiceListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners('.delete-invoice', "/invoices/invoice/");
        addCheckboxesListener('#other_elements_invoices', '.delete_invoices_checkbox', 'delete_invoices_checkbox', "#delete_many_clients", "/invoices/invoice/");
        addDownloadButtonListeners('.download');
        addUploadButtonListeners('.upload', '.recipient-email-input', '.send-email-btn');
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData("/invoice/");
            createInvoiceListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners('.delete-invoice', "/invoices/invoice/");
            addCheckboxesListener('#other_elements_invoices', '.delete_invoices_checkbox', 'delete_invoices_checkbox', "#delete_many_clients", "/invoices/invoice/");
            addDownloadButtonListeners('.download');
            addUploadButtonListeners('.upload', '.recipient-email-input', '.send-email-btn');
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await obtainUserInitials();
    addElementsDynamically();
    document.querySelector("#adder").label = "Add invoice";
});

document.querySelector("#adder").addEventListener('click', () => {
    window.location.href = host + '/invoices/add';
});

document.querySelector("#sort_asc").addEventListener("click", () => {
    const parent = document.querySelector("#other_elements_invoices");
    const divs = parent.querySelectorAll('.client_list_item');
    const sortedDivs = Array.from(divs).sort((a, b) => a.querySelector(".invoice_name").textContent.localeCompare(b.querySelector(".invoice_name").textContent));
    parent.innerHTML = '';
    for (const div of sortedDivs) {
        parent.appendChild(div);
    }
});

async function downloadDataRequest(invoiceId) {
    const downloadUrl = "/invoices/download/" + invoiceId;
    const result = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    });
    const blob = await result.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.headers.get('Content-Disposition').split('filename=')[1];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function addDownloadButtonListeners(selectorName) {
    const downloadButtons = document.querySelectorAll(selectorName);
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-element-id');
            downloadDataRequest(invoiceId);
        });
    });
}

async function sendPdfEmailRequest(invoiceId, recipientEmail) {
    const sendPdfEmailUrl = `/invoices/send_email/${invoiceId}/${recipientEmail}/`;
    const response = await fetch(sendPdfEmailUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

function actionBasedOnSendEmailRequest(messageFromServer, messageElement) {
    if (messageFromServer === 'PDF was sent!') {
        messageElement.textContent = messageFromServer;
        messageElement.classList.remove("errorMessage");
        messageElement.classList.add("successMessage");
    } else {
        messageElement.textContent =  messageFromServer;
        messageElement.classList.remove("successMessage")
        messageElement.classList.add("errorMessage")
    }
}

function addUploadButtonListeners(uploadSelector, recipientEmailSelector, sendButtonSelector) {
    const uploadButtons = document.querySelectorAll(uploadSelector);
    uploadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-element-id');

            const emailField = button.nextElementSibling;
            emailField.style.display = 'block';
            const recipientEmailInput = emailField.querySelector(recipientEmailSelector);
            const sendEmailButton = emailField.querySelector(sendButtonSelector);
            const closeButton = emailField.querySelector('.close');

            const sendPdfEmailRequestHandler = async () => {
                if (recipientEmailInput.value === '') {
                    let message = emailField.querySelector('#errorMessage');
                    message.setAttribute('data-element-id', invoiceId);
                    message.textContent = 'Field is empty';
                    message.classList.remove("successMessage")
                    message.classList.add("errorMessage")
                } else {
                    const recipientEmail = recipientEmailInput.value;
                    const data = await sendPdfEmailRequest(invoiceId, recipientEmail);
                    recipientEmailInput.value = '';

                    let messageFromServer = data.message;
                    let messageElement = emailField.querySelector('#errorMessage');
                    actionBasedOnSendEmailRequest(messageFromServer, messageElement)

                    const emailInputElement = emailField.querySelector('.recipient-email-input');
                    emailInputElement.addEventListener('input', function () {
                        messageElement.textContent = '';
                    });
                    let closeButton = emailField.querySelector('.close');
                    closeButton.addEventListener('click', () => {
                        messageElement.textContent = '';
                    });
                }
            };

            sendEmailButton.addEventListener('click', sendPdfEmailRequestHandler);

            closeButton.addEventListener('click', () => {
                emailField.style.display = 'none';
                sendEmailButton.removeEventListener('click', sendPdfEmailRequestHandler);
                recipientEmailInput.value = '';
                let message = document.getElementById('errorMessage');
                if (message.innerHTML.includes('Field is empty')) {
                    message.textContent = '';
                }
            });
        });
    });
}
