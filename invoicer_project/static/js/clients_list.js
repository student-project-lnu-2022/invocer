import {host} from "./utils_clients.js";
import {search} from './request_utils.js';
document.getElementById("search_bar").addEventListener('keyup', ()=> { search('list_client_username', 'client_list_item')});

addDivClientListener();

function addDivClientListener() {
    const clientsList = document.querySelector('#other_elements');
    clientsList.addEventListener('click', async (event) => {
        const clickedElement = event.target;
        console.log("Element clicked"+clickedElement);
        if (clickedElement.classList.contains('clickable_item') || clickedElement.parentNode.classList.contains('clickable_item')) {
            const clientId = clickedElement.dataset.elementId;
            window.location.href = host + "/clients/view/" + clientId;
        }
    });
}


document.querySelector("#sort_asc").addEventListener("click", ()=> {
    const parent = document.querySelector("#other_elements");
    const divs = parent.querySelectorAll('.client_list_item');
    const sortedDivs = Array.from(divs).sort((a, b) => a.querySelector(".list_client_username").textContent.localeCompare(b.querySelector(".list_client_username").textContent));
    parent.innerHTML = '';
    for (const div of sortedDivs) {
      parent.appendChild(div);
    }
})

