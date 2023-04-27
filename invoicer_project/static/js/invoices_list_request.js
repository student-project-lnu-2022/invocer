const host = "http://127.0.0.1:8000";
import {
    addCheckboxesListener,
    addDeleteButtonListeners,
    getUserData,
    obtainNewAccessToken,
    obtainUserInitials,
    search
} from './request_utils.js';
import {updateContent} from "./invoices_section_translation.js";

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
                    <div class="col-xxl-5 col-xl-4 col-md-3 col-sm-3 col-4 list_item_name">
                    <div class="d-flex flex-wrap flex-column list_item_info_block">
                        <p class="invoice_name" data-element-id="${invoiceId}">${invoiceName}</p>
                        <div class="invoice_bottom_info">
                            <p class="invoice_info_text" data-element-id="${invoiceId}">${clientFirstName + ' ' + clientLastName}</p>
                            <p class="invoice_info_text" data-element-id="${invoiceId}">${invoiceDate}</p>
                        </div>
                    </div>
                    </div>
                    <div class="d-flex flex-wrap flex-row justify-content-end col-xxl-7 col-xl-8 col-md-9 col-sm-7 col-6">
                        <div class="d-flex flex-wrap flex-column list_item_info_block">
                            <p class="currency_text" data-element-id="${invoiceId}">${invoicePrice} ${invoiceCurrency}</p>
                        </div>
                        <div class="list_invoice_user_buttons">
                            <md-standard-icon-button class="edit-item"><span class="material-symbols-outlined">edit</span></md-standard-icon-button>
                            <md-standard-icon-button class="delete-invoice" data-element-id="${invoiceId}"><span class="material-symbols-outlined">delete</span></md-standard-icon-button>
                            <md-standard-icon-button class="upload" data-element-id="${invoiceId}"><span class="material-symbols-outlined">upload</span></md-standard-icon-button>
                            <md-standard-icon-button class="download" data-element-id="${invoiceId}"><span class="material-symbols-outlined">download</span></md-standard-icon-button>
                            <md-checkbox class="delete_invoices_checkbox" id="list_item_user_delete" data-element-id="${invoiceId}"></md-checkbox>
                        </div>
                        </div>
                        <div class="col-2 list_item_more_button">
                        <md-standard-icon-button class="more-invoice" data-element-id="${invoiceId}" data-contextmenu="invoice-context-menu-${invoiceId}"><span class="material-symbols-outlined">more_vert</span></md-standard-icon-button>
                    </div>
                    <div class="modal" id="modal-${invoiceId}">
                              <div class="modal-content d-flex">
                                <div class="row">
                                    <md-standard-icon-button class="close">close</md-standard-icon-button>
                                </div>
                                <div class="modal-body">
                                    <md-outlined-text-field type="email" data-i18n="recipient_email_input" class='recipient-email-input' placeholder="Recipient email"></md-outlined-text-field>
                                    <md-fab-extended class="send-email-btn" icon="send" data-i18n="send_pdf" label="Send PDF" data-element-id="${invoiceId}"></md-fab-extended>
                                    <div id="errorMessage" data-i18n="error_message_invoices" data-element-id="${invoiceId}"></div>                       
                                </div>
                              </div>
                            </div>
    <div id="contextmenu-${invoiceId}" class="contextmenu">
        <item id="context_menu_edit-${invoiceId}" class="context_menu_edit-${invoiceId} context-menu-edit-button"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">edit</span>Edit</item>
        <item id="context_menu_delete-${invoiceId}" class="delete-invoice context-menu-delete-button" data-element-id="${invoiceId}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">delete</span>Delete</item>
        <item id="context_menu_upload-${invoiceId}" class="context_menu_upload-${invoiceId} context-menu-upload-button upload" data-element-id="${invoiceId}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">upload</span>Upload</item>
        <item id="context_menu_download-${invoiceId}" class="context_menu_download-${invoiceId} context-menu-download-button download" data-element-id="${invoiceId}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">download</span>Download</item>
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
        updateContent();
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
            updateContent();
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

document.querySelector('#add_invoice_mobile').addEventListener('click', () => {
    window.location.href = host + "/invoices/add";
})

document.querySelector("#sort_asc").addEventListener("click", () => {
    const parent = document.querySelector("#other_elements_invoices");
    const divs = parent.querySelectorAll('.invoice_list_item');
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
        messageElement.textContent = i18next.t("success_message_field");
        messageElement.classList.remove("errorMessage");
        messageElement.classList.add("successMessage");
    } else {
        messageElement.textContent =  i18next.t("error_message_field");
        messageElement.classList.remove("successMessage")
        messageElement.classList.add("errorMessage")
    }
}

function addUploadButtonListeners(uploadSelector, recipientEmailSelector, sendButtonSelector) {
    const uploadButtons = document.querySelectorAll(uploadSelector);
    uploadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-element-id');
            console.log(document.querySelector(`#modal-${invoiceId}`))
            const emailField = document.querySelector(`#modal-${invoiceId}`);
            emailField.style.display = 'block';
            const recipientEmailInput = emailField.querySelector(recipientEmailSelector);
            const sendEmailButton = emailField.querySelector(sendButtonSelector);
            const closeButton = emailField.querySelector('.close');

            const sendPdfEmailRequestHandler = async () => {
                if (recipientEmailInput.value === '') {
                    let message = emailField.querySelector('#errorMessage');
                    message.setAttribute('data-element-id', invoiceId);
                    message.textContent = i18next.t("empty_field");
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
                if (message.innerHTML.includes(i18next.t("empty_field"))) {
                    message.textContent = '';
                }
            });
        });
    });
}


(function () {

    window.mouseX = 0;
    window.mouseY = 0;

    document.onmousemove = function (e) {
        window.mouseX = e.clientX || 0;
        window.mouseY = e.clientY || 0;
    };

    document.onclick = function (e) {
        if (e.target.classList.contains('more-invoice')) {
            e.preventDefault();

            const contextMenus = document.querySelectorAll(".contextmenu");
            contextMenus.forEach(menu => {
                menu.style.display = 'none';
            });

            const elementId = e.target.getAttribute("data-element-id");
            document.querySelector(`#contextmenu-${elementId}`).style.display = 'inline-block';
            document.querySelector(`#contextmenu-${elementId}`).style.top = (window.mouseY - 55) + 'px';
            document.querySelector(`#contextmenu-${elementId}`).style.left = (window.mouseX - 130) + 'px';
        } else {
            const contextMenus = document.querySelectorAll("[id^='contextmenu-']");
            contextMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    };
    var context_items = document.getElementsByTagName('item'),
        i,
        context_action = function () {
            if ((this.getAttribute('state') || '').indexOf('gray') === -1 && this.getAttribute('action') in funcs) {
                funcs[this.getAttribute('action')]();
            }
        };

    for (i = 0; i < context_items.length; i += 1) {
        context_items[i].onclick = context_action;
    }

}());