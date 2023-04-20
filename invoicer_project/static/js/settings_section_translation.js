import {translateMenu} from "./items_section_translation.js";

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

window.onload = function () {
    updateContentSettings();
    translateMenu()
}

function updateContentSettings() {
    const settingsHeaderText = document.querySelector("#new_item_text");
    if (settingsHeaderText) {
        settingsHeaderText.textContent = getI18NDataFromAttribute(settingsHeaderText);
    }

    const nameInput = document.querySelector("#name_input_settings");
    if (nameInput) {
        nameInput.label = getI18NDataFromAttribute(nameInput);
    }
    const surnameInput = document.querySelector("#surname_input_settings");
    if (surnameInput) {
        surnameInput.label = getI18NDataFromAttribute(surnameInput);
    }

    const companyNameInput = document.querySelector("#company_name_input_settings");
    if (companyNameInput) {
        companyNameInput.label = getI18NDataFromAttribute(companyNameInput);
    }

    const countryInput = document.querySelector("#country_input_settings");
    if (countryInput) {
        countryInput.label = getI18NDataFromAttribute(countryInput);
    }

    const cityInput = document.querySelector("#city_input_settings");
    if (cityInput) {
        cityInput.label = getI18NDataFromAttribute(cityInput);
    }

    const addressInput = document.querySelector("#address_input_settings")
    if (addressInput) {
        addressInput.label = getI18NDataFromAttribute(addressInput);
    }

    const downloadAllData = document.querySelector("#download_all_data_button");
    if (downloadAllData) {
        downloadAllData.label = getI18NDataFromAttribute(downloadAllData);
    }

    const saveChangesButton = document.querySelector("#save_button_settings");
    if (saveChangesButton) {
        saveChangesButton.label = getI18NDataFromAttribute(saveChangesButton);
    }

    const changePasswordTextAccordion = document.querySelector("#change_password_accordion");
    if (changePasswordTextAccordion) {
        changePasswordTextAccordion.textContent = getI18NDataFromAttribute(changePasswordTextAccordion);
    }

    const oldPasswordInput = document.querySelector("#old_password_input_settings");
    if (oldPasswordInput) {
        oldPasswordInput.label = getI18NDataFromAttribute(oldPasswordInput);
    }

    const newPasswordInput = document.querySelector("#new_password_input_settings");
    if (newPasswordInput) {
        newPasswordInput.label = getI18NDataFromAttribute(newPasswordInput);
    }

    const repeatNewPasswordInput = document.querySelector("#repeat_new_password_input_settings");
    if (repeatNewPasswordInput) {
        repeatNewPasswordInput.label = getI18NDataFromAttribute(repeatNewPasswordInput);
    }

    const confirmChangesButton = document.querySelector("#save_new_password");
    if (confirmChangesButton) {
        confirmChangesButton.label = getI18NDataFromAttribute(confirmChangesButton);
    }

    const atLeast1LowercaseText = document.querySelector("#lower");
    if (atLeast1LowercaseText) {
        atLeast1LowercaseText.textContent = getI18NDataFromAttribute(atLeast1LowercaseText);
    }
    const atLeast1UppercaseText = document.querySelector("#upper");
    if (atLeast1UppercaseText) {
        atLeast1UppercaseText.textContent = getI18NDataFromAttribute(atLeast1UppercaseText);
    }
    const atLeast1DigitText = document.querySelector("#digit");
    if (atLeast1DigitText) {
        atLeast1DigitText.textContent = getI18NDataFromAttribute(atLeast1DigitText);
    }
    const from8to15Text = document.querySelector("#length");
    if (from8to15Text) {
        from8to15Text.textContent = getI18NDataFromAttribute(from8to15Text);
    }
}
