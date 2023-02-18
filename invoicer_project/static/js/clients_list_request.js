const host = "http://127.0.0.1:8000";

async function getUserData() {
    let jsonResponse, response;
    try {
        const result = await fetch(host + '/clients/list/', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
            },
        })
        response = result.status;
        jsonResponse = await result.json();
    } catch (error) {
        console.error('Going to obtain new access token!');
    }
    return { 'responseStatus': response, 'data': jsonResponse }
} 

function fillInitials(userData) {
     const userFirstName = userData["first_name"];
     const userLastName = userData["last_name"];
     document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
}

function createClientListContent(data) {
for(let i = 0; i < data.length; i++) {
    document.getElementById("other_elements").insertAdjacentHTML('afterbegin', `<div class="row client_list_item align-items-center justify-content-between">
                <div class="col-xxl-1 col-xl-1 col-1 list_item_user_icon_initials">
                    <p class="list_item_user_icon_initials_text">${data[i]['initials']}</p>
                </div>
                <div class="col-xxl-3 col-xl-3 col-md-3 col-sm-4 col-5 list_item_user_name">
                    <p class="list_client_username">${data[i]['name']}</p>
                </div>
                <div class="col-xxl-4 col-xl-3 col-md-2 col-1 list_item_empty_block"></div>
                <div class="col-xxl-2 col-xl-2 col-md-3 col-sm-3 col-5 list_item_user_debt">
                    <p class="list_item_user_debt_text">${data[i]['debt']}</p>
                </div>
                <div class="col-xxl-2 col-xl-3 col-md-3 col-sm-3 col-3 list_item_user_buttons">
                    <!--TODO MD-FILLED-BUTTON HASN'T BEEN PUBLISHED YET-->
                    <span class="material-symbols-outlined" style="font-size:28px;">delete</span>
                    <md-checkbox id="list_item_user_delete"></md-checkbox>
                </div>
            </div>`)
    }
}

async function obtainNewAccessToken() {
    let response;
    const formData = new FormData();
    formData.append('refresh', window.localStorage.getItem('refreshToken'));
    try {
        response = await fetch(host + '/user/refresh/', {
            method: "POST",
            body: formData
        });
        const newToken = await response.json();
        window.localStorage.setItem('accessToken', newToken['access']);
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
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData();
            fillInitials(responseFromServer["data"]);
            createClientListContent(responseFromServer["data"]["content"]);
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}

addElementsDynamically();