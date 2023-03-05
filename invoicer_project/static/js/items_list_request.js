const host = "http://127.0.0.1:8000";

async function getUserData() {
    let jsonResponse, response;
    try {
        const result = await fetch(host + '/items/items_list/', {
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

function createItemListContent(data) {
    for (let i = 0; i < data.length; i++) {
        let itemName = data[i]['name'];
        let priceAndCurrency = data[i]['price'] + " " + data[i]['currency'];
        let itemID = data[i]['id']

        document.getElementById("items_container").insertAdjacentHTML('afterbegin', `<div class="row client_list_item align-items-center justify-content-around">
                        <div class="col-md-6 col-sm-6 col-7 list_item_name">
                            <p class="item_name">${itemName}</p>
                        </div>
                        <div class="d-flex flex-wrap flex-row justify-content-end col-md-6 col-sm-6 col-5">
                            <div class="d-flex flex-wrap flex-column list_item_info_block">
                                <p class="additional_text">Price per unit</p>
                                <p class="main_text">${priceAndCurrency}</p>
                            </div>
                            <div class="d-flex flex-wrap flex-column list_item_info_block">
                                <p class="additional_text">Basic unit</p>
                                <p class="main_text">kg</p>
                            </div>
                            <div class="list_item_user_buttons">
                                <span class="material-symbols-outlined delete-item" data-item-id="${itemID}" style="font-size: 28px">delete</span>
                                <md-checkbox id="list_item_user_delete"></md-checkbox>
                            </div>
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
        createItemListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners();
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData();
            createItemListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners();
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await obtainUserInitials();
    addElementsDynamically();
});

async function obtainUserInitials() {
    let responseCode;
    const token = window.localStorage.getItem('accessToken');
    if (token) {
        const data = {"accessToken": token};
        try {
            const serverReply = await fetch(host + '/user/decode/', {
                method: "POST",
                body: JSON.stringify(data)
            });
            responseCode = serverReply.status;
            const initials = await serverReply.json();
            if (responseCode === 200) {
                fillInitials(initials);
            } else if (responseCode === 400) {
                const obtainedNewTokens = await obtainNewAccessToken();
                if (!obtainedNewTokens) {
                    window.location.href = host + '/user/login/';
                } else {
                    await obtainUserInitials();
                }
            } else {
                window.location.replace(host + '/user/login/');
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}

function addDeleteButtonListeners() {
    const clientsList = document.querySelector('#items_container');
    clientsList.addEventListener('click', async (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('delete-item')) {
            try {
                const itemId = clickedElement.dataset.itemId;
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
                    }
                };
                const response = await fetch(host + `/items/item/${itemId.toString()}`, requestOptions);
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
    });
}