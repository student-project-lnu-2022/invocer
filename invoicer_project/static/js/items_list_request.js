const host = "http://127.0.0.1:8000";
import { obtainUserInitials, obtainNewAccessToken, getUserData } from "./request_utils.js";


function createItemListContent(data) {
    for (let item of data) {
        let itemName = item['name'];
        let priceAndCurrency = item['price'] + " " + item['currency'];
        let itemID = item['id']

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


async function addElementsDynamically() {
    let responseFromServer = await getUserData('/items/items_list/');
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createItemListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners();
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData('/items/items_list/');
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
    document.querySelector("#adder").label = "Add item";
});

document.querySelector('#adder').addEventListener('click', () => {
    window.location.href = host + "/items/add";
})


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