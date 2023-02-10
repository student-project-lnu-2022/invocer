const host = "http://127.0.0.1:8000";

function clientListContent(data) {
for(let i = 0; i < data.length; i++) {
    document.getElementById("other_elements").insertAdjacentHTML('afterbegin', `<div class="row client_list_item align-items-center justify-content-between">
                <div class="col-xxl-1 col-xl-1 col-1 list_item_user_icon_initials">
                    <p class="list_item_user_icon_initials_text">${data[i]['initials']}</p>
                </div>
                <div class="col-xxl-3 col-xl-3 col-md-3 col-sm-4 col-5 list_item_user_name">
                    <p class="list_item_user_name_text">${data[i]['name']}</p>
                </div>
                <div class="col-xxl-4 col-xl-3 col-md-2 col-1 list_item_empty_block"></div>
                <div class="col-xxl-2 col-xl-2 col-md-3 col-sm-3 col-5 list_item_user_debt">
                    <p class="list_item_user_debt_text">${data[i]['debt']}</p>
                </div>
                <div class="col-xxl-2 col-xl-3 col-md-3 col-sm-3 col-3 list_item_user_buttons">
                    <!--TODO MD-FILLED-BUTTON HASN'T BEEN PUBLISHED YET-->
                    <span class="material-symbols-outlined" style="font-size:28px;">delete</span>
                    <md-checkbox id="list_item_user_delete" checked></md-checkbox>
                </div>
            </div>`)
    }
}


async function addElementsDynamically() {
    let response
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${window.localStorage.getItem('accessToken')}`);
    try {
        const result = await fetch(host + '/clients/list/', {
        method: "GET",
        headers: headers,
        })

        response = result.status;
        const jsonResponse = await result.json();
        userFirstName = jsonResponse["first_name"];
        userLastName = jsonResponse["last_name"];

        if(response === 200) {
            document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
            clientListContent(jsonResponse["content"])
        } else {
            window.location.href = host + '/user/login/';
        }
    } catch (error) {
        console.error(error);
    }
}

addElementsDynamically();