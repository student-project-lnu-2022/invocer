const host = "http://127.0.0.1:8000";
import {obtainUserInitials} from './request_utils.js';

async function getUserData() {
    let jsonResponse, response;
    try {
        const result = await fetch(host + '/clients/client/', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
            },
        });
        response = result.status;
        jsonResponse = await result.json();
    } catch (error) {
        console.error('Going to obtain new access token!');
    }
    return {'responseStatus': response, 'data': jsonResponse};
}

function fillInitials(userData) {
    const userFirstName = userData["first_name"];
    const userLastName = userData["last_name"];
    document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
}

function createClientListContent(data) {
    for (let i = 0; i < data.length; i++) {
        let fullName = data[i]['last_name'] + " " + data[i]['first_name'];
        let clientInitials = data[i]['last_name'][0] + data[i]['first_name'][0];
        let clientID = data[i]['id'];

        document.getElementById("other_elements").insertAdjacentHTML('afterbegin', `<div class="row client_list_item clickable_item align-items-center justify-content-between" data-client-id="${clientID}">
                <div class="col-xxl-1 col-xl-1 col-1 clickable_item list_item_user_icon_initials">
                    <p class="list_item_user_icon_initials_text" data-client-id="${clientID}">${clientInitials}</p>
                </div>
                <div class="col-xxl-3 col-xl-3 col-md-3 col-sm-4 col-5 clickable_item list_item_user_name">
                    <p class="list_client_username"  data-client-id="${clientID}" >${fullName}</p>
                </div>
                <div class="col-xxl-4 col-xl-3 col-md-2 col-1 clickable_item list_item_empty_block"  data-client-id="${clientID}"></div>
                <div class="col-xxl-2 col-xl-2 col-md-3 col-sm-3 col-5 clickable_item list_item_user_debt">
                    <p class="list_item_user_debt_text" data-client-id="${clientID}">0$</p>
                </div>
                <div class="col-xxl-2 col-xl-3 col-md-3 col-sm-3 col-3 list_item_user_buttons" data-client-id="${clientID}">
                    <!--TODO MD-FILLED-BUTTON HASN'T BEEN PUBLISHED YET-->
                    <span class="material-symbols-outlined client-info edit-client" data-client-id="${clientID}" style="font-size:28px;">edit</span>
                    <span class="material-symbols-outlined client-info delete-client" data-client-id="${clientID}" style="font-size:28px;">delete</span>
                    <md-checkbox class="delete_clients_checkbox" id="list_item_user_delete" data-client-id="${clientID}"></md-checkbox>
                </div>
            </div>`)
    }
}

async function obtainNewAccessToken() {
    let response;
    const data = {refresh: window.localStorage.getItem('refreshToken')};
    try {
        response = await fetch(host + '/user/refresh/', {
            method: "POST",
            body: JSON.stringify(data)
        });
        const newToken = await response.json();
        const accessToken = newToken['access'];
        window.localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error(error);
    }
    return response.status === 200;
}

async function addElementsDynamically() {
    let responseFromServer = await getUserData();
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createClientListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners();
        addEditButtonListeners();
        addCheckboxesListener();
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData();
            createClientListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners();
            addEditButtonListeners();
            addCheckboxesListener();
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
            const clientId = clickedElement.dataset.clientId;
            window.location.href = host + "/clients/edit/" + clientId;
        }
    });
}


function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.delete-client');
    deleteButtons.forEach(span => {
        span.addEventListener('click', async () => {
            try {
                let clientIds = span.dataset.clientId;
                const requestOptions = {
                    method: 'DELETE',
                    body: JSON.stringify({"clientIds": [parseInt(clientIds)]}),
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                };
                const response = await fetch(host + `/clients/client/`, requestOptions);
                if (response.ok) {
                    location.reload();
                } else if (response.status === 401) {
                    window.location.replace(host + '/user/login/');
                } else {
                    console.error('Error with deleting client:', response.statusText);
                }
            } catch (error) {
                console.error('Error with deleting client:', error);
            }
        });
    });
}

function addCheckboxesListener() {
    let dataForServer;
    const checkboxesContainer = document.querySelector('#other_elements');
    checkboxesContainer.addEventListener('change', async (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('delete_clients_checkbox')) {
            dataForServer = getCheckedBoxes();
            if (getCheckedBoxes().length > 0) {
                document.querySelector("#delete_many_clients").style.display = "flex";
            } else {
                document.querySelector("#delete_many_clients").style.display = "none";
            }
        }
    });
    document.querySelector("#delete_many_clients").addEventListener('click', async () => {
        await sendRequestToDeleteClients(dataForServer);
    })
}

function getCheckedBoxes() {
    let allCheckboxes = document.querySelectorAll(".delete_clients_checkbox");
    let arrayOfCheckedBoxes = [];
    for (let checkbox of allCheckboxes) {
        if (checkbox.checked) {
            arrayOfCheckedBoxes.push(parseInt(checkbox.dataset.clientId));
        }
    }
    return arrayOfCheckedBoxes;
}

async function sendRequestToDeleteClients(clientsIds) {
    try {
        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify({"clientIds": clientsIds}),
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(host + `/clients/client`, requestOptions);
        if (response.ok) {
            location.reload();
        } else if (response.status === 401) {
            window.location.replace(host + '/user/login/');
        } else {
            console.error('Error with deleting client:', response.statusText);
        }
    } catch (error) {
        console.error('Error with deleting client:', error);
    }
}


document.querySelector('#adder').addEventListener('click', () => {
    window.location.href = host + "/clients/add";
})


document.addEventListener('DOMContentLoaded', async () => {
    await obtainUserInitials();
    addElementsDynamically();
});