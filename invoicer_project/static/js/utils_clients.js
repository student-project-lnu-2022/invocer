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
        zipField, countryField,
        cityField, addressField
    ];
}

export function hideUnnecessaryElementsInMenu() {
  const childElements = document.querySelectorAll('.additional_navigation_elements > *');
    childElements.forEach(child => {
        child.style.display = 'none';
    });
}