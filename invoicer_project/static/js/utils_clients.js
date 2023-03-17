export const host = "http://127.0.0.1:8000";
export const nameField = document.getElementById("name_input_client_edit_page");
export const surnameField = document.getElementById("surname_input_client_edit_page");
export const emailField = document.getElementById("email_input_client_edit_page");
export const telephoneField = document.getElementById("telephone_input_client_edit_page");
export const zipField = document.getElementById("zip_input_client_edit_page");
export const countryField = document.getElementById("country_input_client_edit_page");
export const cityField = document.getElementById("city_input_client_edit_page");
export const addressField = document.getElementById("address_input_client_edit_page");
export const clientId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

export const returnAllFields = function () {
    return [
        nameField, surnameField,
        emailField, telephoneField,
        zipField,
        cityField, addressField
    ];
}

export function hideUnnecessaryElementsInMenu() {
  const childElements = document.querySelectorAll('.additional_navigation_elements > *');
    childElements.forEach(child => {
        child.style.display = 'none';
    });
}


export async function fillFieldsWithClientsData() {
    let responseFromServer = await getClientById(clientId);
    document.getElementById("name_input_client_edit_page").value = responseFromServer["first_name"];
    document.getElementById("surname_input_client_edit_page").value = responseFromServer["last_name"];
    document.getElementById("email_input_client_edit_page").value = responseFromServer["email"];
    document.getElementById("telephone_input_client_edit_page").value = responseFromServer["phone_number"];
    document.getElementById("zip_input_client_edit_page").value = responseFromServer["zip_code"];
    document.getElementById("country_input_client_edit_page").value = responseFromServer["country"];
    document.getElementById("city_input_client_edit_page").value = responseFromServer["city"];
    document.getElementById("address_input_client_edit_page").value = responseFromServer["address"];

    const countriesDivList = document.querySelectorAll('.menu div');
    countriesDivList.forEach(div => {
        if (div.getAttribute("data-value") === responseFromServer["country"]) {
            console.log(responseFromServer["country"]);
            const dropdownCountryContainer = document.querySelector('.default.text');
            dropdownCountryContainer.textContent = "";
            dropdownCountryContainer.insertAdjacentHTML("afterbegin", div.innerHTML);
            dropdownCountryContainer.classList.remove("default");
        }
    });
    console.log(countriesDivList);
}

function getClientById(clientId) {
    return fetch(host + '/clients/client/' + clientId, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}