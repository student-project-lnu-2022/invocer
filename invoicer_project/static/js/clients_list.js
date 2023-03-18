import {host} from "./utils_clients.js";

document.getElementById("search_bar").addEventListener('keyup', () => {
    let inputFromSearchbar = document.getElementById('search_bar').value;
    inputFromSearchbar = inputFromSearchbar.toLowerCase();
    const clientUsername = document.getElementsByClassName('list_client_username');
    const clientListItem = document.getElementsByClassName('client_list_item');

    for (let i = 0; i < clientUsername.length; i++) {
        if (!clientUsername[i].innerHTML.toLowerCase().includes(inputFromSearchbar)) {
            clientListItem[i].style.display = "none";
        } else {
            clientListItem[i].style.removeProperty("display");
        }
    }
});

addDivClientListener();

function addDivClientListener() {
    const clientsList = document.querySelector('#other_elements');
    clientsList.addEventListener('click', async (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('clickable_item') || clickedElement.parentNode.classList.contains('clickable_item')) {
            console.log(clickedElement.dataset);
            const clientId = clickedElement.dataset.elementId;
            window.location.href = host + "/clients/view/" + clientId;
        }
    });
}


