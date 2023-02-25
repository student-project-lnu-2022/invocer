const host = "http://127.0.0.1:8000";

async function getUserData() {
    let jsonResponse, response;
    try {
        const result = await fetch(host + '/clients/list/', {
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

        document.getElementById("other_elements").insertAdjacentHTML('afterbegin', `<div class="row client_list_item align-items-center justify-content-between">
                <div class="col-xxl-1 col-xl-1 col-1 list_item_user_icon_initials">
                    <p class="list_item_user_icon_initials_text">${clientInitials}</p>
                </div>
                <div class="col-xxl-3 col-xl-3 col-md-3 col-sm-4 col-5 list_item_user_name">
                    <p class="list_client_username">${fullName}</p>
                </div>
                <div class="col-xxl-4 col-xl-3 col-md-2 col-1 list_item_empty_block"></div>
                <div class="col-xxl-2 col-xl-2 col-md-3 col-sm-3 col-5 list_item_user_debt">
                    <p class="list_item_user_debt_text">0$</p>
                </div>
                <div class="col-xxl-2 col-xl-3 col-md-3 col-sm-3 col-3 list_item_user_buttons">
                    <!--TODO MD-FILLED-BUTTON HASN'T BEEN PUBLISHED YET-->
                    <span class="material-symbols-outlined client-info delete-client" data-client-id="${clientID}" style="font-size:28px;">delete</span>
                    <md-checkbox id="list_item_user_delete"></md-checkbox>
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
        fillInitials(responseFromServer["data"]);
        createClientListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners();
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData();
            fillInitials(responseFromServer["data"]);
            createClientListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners();
        }
    } else if (response === 404) {
        fillInitials(responseFromServer["data"]);
        console.log("Not found");
    } else {
        window.location.replace(host + '/user/login/');
    }
}

function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.delete-client');
    deleteButtons.forEach(span => {
        span.addEventListener('click', async () => {
            try {
                let clientId = span.dataset.clientId;
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
                    }
                };
                const response = await fetch(host + `/clients/client/${clientId.toString()}`, requestOptions);
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Error with deleting client:', response.statusText);
                }
            } catch (error) {
                console.error('Error with deleting client:', error);
            }
        });
    });
}

document.querySelector('#adder').addEventListener('click', () => {
    window.location.href = host + "/clients/add";
})

addElementsDynamically();


