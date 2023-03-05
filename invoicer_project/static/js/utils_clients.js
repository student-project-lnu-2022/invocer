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

export function setErrorAttributesToFields(errorsObject) {
    let fieldIndex = 0;
    let fields = returnAllFields();
    for (let error in errorsObject) {
        if (errorsObject[error]) {
            fields[fieldIndex].setAttribute("error", "true");
            fields[fieldIndex].setAttribute("errorText", errorsObject[error]);
        }
        fieldIndex++;
    }
}

export function clearErrorAttributes(returnAllFieldsList) {
        for (let field of returnAllFieldsList) {
            field.addEventListener('input', () => {
                field.removeAttribute("error");
                field.removeAttribute("errorText");
            })
        }
}

export function setMaxFieldContainerHeights(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}

export function removeAllErrorAttributes(returnAllFieldsList) {
    for (let item of returnAllFieldsList) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

export function allAreFalse(object) {
    for (let key in object) {
        if (object[key]) {
            return false;
        }
    }
    return true;
}

export function hideUnnecessaryElementsInMenu() {
  const childElements = document.querySelectorAll('.additional_navigation_elements > *');
    childElements.forEach(child => {
        child.style.display = 'none';
    });
}