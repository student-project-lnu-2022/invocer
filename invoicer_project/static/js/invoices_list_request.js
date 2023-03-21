const host = "http://127.0.0.1:8000";
import {obtainUserInitials, obtainNewAccessToken, addCheckboxesListener, getUserData, addDeleteButtonListeners} from './request_utils.js';
import {search} from './request_utils.js';
document.getElementById("search_bar").addEventListener('keyup', ()=> { search('invoice_name', 'client_list_item')});

function createInvoiceListContent(data) {
    for (let i = 0; i < data.length; i++) {
        const { id: invoiceId, name: invoiceName, price: invoicePrice, date_of_payment: invoiceDate,
            client_first_name: clientFirstName, client_last_name: clientLastName } = data[i];
        document.getElementById("other_elements_invoices").insertAdjacentHTML('afterbegin', `<div class="row client_list_item align-items-center justify-content-around" data-element-id="${invoiceId}">
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
                            <p class="currency_text" data-element-id="${invoiceId}">${invoicePrice}</p>
                        </div>
                        <div class="list_invoice_user_buttons">
                            <md-standard-icon-button class="edit-item"><span class="material-symbols-outlined">edit</span></md-standard-icon-button>
                            <md-standard-icon-button class="delete-invoice" data-element-id="${invoiceId}"><span class="material-symbols-outlined">delete</span></md-standard-icon-button>
                            <md-standard-icon-button class="upload"><span class="material-symbols-outlined">upload</span></md-standard-icon-button>
                            <md-standard-icon-button class="download" data-element-id="${invoiceId}"><span class="material-symbols-outlined">download</span></md-standard-icon-button>
                            <md-checkbox class="delete_invoices_checkbox" id="list_item_user_delete" data-element-id="${invoiceId}"></md-checkbox>
                        </div>
                    </div>
                </div>`)
    }
}


async function addElementsDynamically() {
    let responseFromServer = await getUserData("/invoices/invoice/");
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createInvoiceListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners('.delete-invoice', "/invoices/invoice/");
        addCheckboxesListener('#other_elements_invoices', '.delete_invoices_checkbox', 'delete_invoices_checkbox',"#delete_many_clients", "/invoices/invoice/");
        addDownloadButtonListeners('.download');
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData("/invoices/invoice/");
            createInvoiceListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners('.delete-invoice', "/invoices/invoice/");
            addCheckboxesListener('#other_elements_invoices', '.delete_invoices_checkbox', 'delete_invoices_checkbox',"#delete_many_clients", "/invoices/invoice/");
            addDownloadButtonListeners('.download');
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

document.querySelector("#sort_asc").addEventListener("click", ()=> {
    const parent = document.querySelector("#other_elements_invoices");
    const divs = parent.querySelectorAll('.client_list_item');
    const sortedDivs = Array.from(divs).sort((a, b) => a.querySelector(".invoice_name").textContent.localeCompare(b.querySelector(".invoice_name").textContent));
    parent.innerHTML = '';
    for (const div of sortedDivs) {
      parent.appendChild(div);
    }
})

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