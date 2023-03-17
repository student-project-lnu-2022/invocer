const host = "http://127.0.0.1:8000";
import {obtainUserInitials, obtainNewAccessToken, addCheckboxesListener, getUserData, addDeleteButtonListeners} from './request_utils.js';

function createClientListContent(data) {
    for (let i = 0; i < data.length; i++) {
        let fullName = data[i]['last_name'] + " " + data[i]['first_name'];
        let clientInitials = data[i]['last_name'][0] + data[i]['first_name'][0];
        let clientID = data[i]['id'];

        document.getElementById("other_elements").insertAdjacentHTML('afterbegin', `<div class="row client_list_item clickable_item align-items-center justify-content-between" data-element-id="${clientID}">
                <div class="col-xxl-1 col-xl-1 col-1 clickable_item list_item_user_icon_initials">
                    <p class="list_item_user_icon_initials_text" data-element-id="${clientID}">${clientInitials}</p>
                </div>
                <div class="col-xxl-3 col-xl-3 col-md-3 col-sm-4 col-5 clickable_item list_item_user_name">
                    <p class="list_client_username"  data-element-id="${clientID}" >${fullName}</p>
                </div>
                <div class="col-xxl-4 col-xl-3 col-md-2 col-1 clickable_item list_item_empty_block"  data-client-id="${clientID}"></div>
                <div class="col-xxl-2 col-xl-2 col-md-3 col-sm-3 col-5 clickable_item list_item_user_debt">
                    <p class="list_item_user_debt_text" data-element-id="${clientID}">0$</p>
                </div>
                <div class="col-xxl-2 col-xl-3 col-md-3 col-sm-3 col-3 list_item_user_buttons" data-client-id="${clientID}">
                    <md-standard-icon-button class="client-info edit-client" data-element-id="${clientID}"><span class="material-symbols-outlined">edit</span></md-standard-icon-button>
                   <md-standard-icon-button class="client-info delete-client" data-element-id="${clientID}"><span class="material-symbols-outlined">delete</span></md-standard-icon-button>
                    <md-checkbox class="delete_clients_checkbox" id="list_item_user_delete" data-element-id="${clientID}"></md-checkbox>
                </div>
            </div>`)
    }
}

async function addElementsDynamically() {
    let responseFromServer = await getUserData("/clients/client/");
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createClientListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners('.delete-client', `/clients/client`);
        addEditButtonListeners();
        addCheckboxesListener('#other_elements', '.delete_clients_checkbox', 'delete_clients_checkbox',"#delete_many_clients", `/clients/client`);
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData("/clients/client/");
            createClientListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners('.delete-client', `/clients/client`);
            addEditButtonListeners();
            addCheckboxesListener('#other_elements', '.delete_clients_checkbox', 'delete_clients_checkbox',"#delete_many_clients", `/clients/client`);
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}

function addEditButtonListeners() {
    const clientsList = document.querySelector('#other_elements');
    clientsList.addEventListener('click', async (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('edit-client')) {
            const clientId = clickedElement.dataset.elementId;
            window.location.href = host + "/clients/edit/" + clientId;
        }
    });
}

document.querySelector('#adder').addEventListener('click', () => {
    window.location.href = host + "/clients/add";
})


document.addEventListener('DOMContentLoaded', async () => {
    await obtainUserInitials();
    addElementsDynamically();
});