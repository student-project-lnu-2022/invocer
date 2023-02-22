const nameSurnMaxLength = 35;
const countryMaxLength = 35;
const addressMaxLength = 40;

const nameField = document.getElementById("name_input_client_edit_page");
const surnameField = document.getElementById("surname_input_client_edit_page");
const emailField = document.getElementById("email_input_client_edit_page");
const telephoneField = document.getElementById("telephone_input_client_edit_page");
const zipField = document.getElementById("zip_input_client_edit_page");
const countryField = document.getElementById("country_input_client_edit_page");
const cityField = document.getElementById("city_input_client_edit_page");
const addressField = document.getElementById("address_input_client_edit_page");

const returnAllFields = function () {
    return [
        nameField, surnameField,
        emailField, telephoneField,
        zipField, countryField,
        cityField, addressField
    ];
}

function setMaxFieldContainerHeights() {
    for (field of returnAllFields()) {
         field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}

function removeAllErrorAttributes() {
    for (let item of returnAllFields()) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

function validateClientAdd() {
    removeAllErrorAttributes();
    setMaxFieldContainerHeights();
   return {
        'nameValidationResult': validateNameAndSurnameAsStrings(nameField.value),
        'surnameValidationResult': validateNameAndSurnameAsStrings(surnameField.value),
        'emailValidationResult': validateEmail(emailField.value),
        'telephoneValidationResult': validateTelephone(telephoneField.value),
        'zipValidationResult': validateZip(zipField.value),
        'countryValidationResult': validateCountry(countryField.value),
        'cityValidationResult': validateCity(cityField.value),
        'addressValidationResult': validateAddress(addressField.value),
    };
}

function validateNameAndSurnameAsStrings(strToValidate) {
    let strValidationResult
    if (!strToValidate) {
        strValidationResult = "This field can't be empty";
    } else if (strToValidate.includes(' ')) {
        strValidationResult = "No whitespaces";
    } else if (strToValidate.length > nameSurnMaxLength) {
        strValidationResult = `Max length – ${nameSurnMaxLength} chars`;
    } else if (!(/^[a-z]+$/i.test(strToValidate))) {
        strValidationResult = "Only latin letters";
    } else if (!(/[A-Z]/.test(strToValidate.charAt(0)))) {
        strValidationResult = "Has to begin with capital";
    } else if (strToValidate.replace(/[^A-Z]/g, "").length > 1) {
        strValidationResult = "No more than one capital"
    } else if (!/^[A-Z][a-z]+$/.test(strToValidate)) {
        strValidationResult = "At least one lowercase";
    } else {
        strValidationResult = '';
    }
    return strValidationResult;
}

function validateEmail(emailToValidate) {
    let isEmailValid
    if (emailToValidate === '') {
        isEmailValid = "This field can't be empty";
    } else if (!(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(emailToValidate))) {
        isEmailValid = "Invalid email format";
    } else if (emailToValidate.includes(' ')) {
        isEmailValid = "No whitespaces";
    } else {
        isEmailValid = '';
    }
    return isEmailValid;
}

function validateTelephone(telephoneToValidate) {
    let isTelephoneValid
    if (telephoneToValidate === '') {
        isTelephoneValid = "This field can't be empty";
    } else if (!(/^\+?1?\d{9,15}$/.test(telephoneToValidate))) {
        isTelephoneValid = "Invalid telephone format";
    } else if (telephoneToValidate.includes(' ')) {
        isTelephoneValid = "No whitespaces";
    } else {
        isTelephoneValid = '';
    }
    return isTelephoneValid;
}

function validateZip(zipToValidate) {
    let isZipValid
    if (zipToValidate === '') {
        isZipValid = "This field can't be empty";
    } else if (!(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(zipToValidate))) {
        isZipValid = "Invalid zip format";
    } else if (zipToValidate.includes(' ')) {
        isZipValid = "No whitespaces";
    } else {
        isZipValid = '';
    }
    return isZipValid;
}


function validateAddress(addressToValidate) {
    let isAddressValid;
    if (addressToValidate === '') {
        isAddressValid = "This field can't be empty";
    } else if (addressToValidate.length > addressMaxLength) {
        isAddressValid = `Max length – ${addressMaxLength} chars`;
    } else if (!/^[#./0-9a-zA-Z\s,-]+$/.test(addressToValidate)) {
        isAddressValid = "A-Z, a-z, 0-9 only"; 
    } else {
        isAddressValid = '';
    }
    return isAddressValid;
}