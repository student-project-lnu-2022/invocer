document.addEventListener('DOMContentLoaded', function() {
  updateContent();
});
function updateContent() {
    loginTranslation();
    registrationTranslation();
}

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

function loginTranslation() {
    const loginText = document.querySelector("#log_in_text");
    if (loginText) {
        loginText.textContent = getI18NDataFromAttribute(loginText);
    }

    const passwordInput = document.querySelector("#password_input_lg_pg");
    if (passwordInput) {
        passwordInput.label = getI18NDataFromAttribute(passwordInput);
    }

    const loginConfirmationButton = document.querySelector("#log_in_confirmation_button_log_in_page");
    if (loginConfirmationButton) {
        loginConfirmationButton.label = getI18NDataFromAttribute(loginConfirmationButton);
    }

    const forgotPasswordHint = document.querySelector(".hint_text_lg_pg.forgot_password");
    if (forgotPasswordHint) {
        forgotPasswordHint.textContent = getI18NDataFromAttribute(forgotPasswordHint);
    }

    const createAnAccountHint = document.querySelector(".hint_text_lg_pg.create_account");
    if (createAnAccountHint) {
        createAnAccountHint.textContent = getI18NDataFromAttribute(createAnAccountHint);
    }
}

function registrationTranslation() {
    const signUpText = document.querySelector("#sign_up_text_rg_pg");
    if (signUpText) {
        signUpText.textContent = getI18NDataFromAttribute(signUpText);
    }

    const nameInput = document.querySelector("#name_input_rg_pg");
    if (nameInput) {
        nameInput.label = getI18NDataFromAttribute(nameInput);
    }

    const surnameInput = document.querySelector("#surname_input_rg_pg");
    if (surnameInput) {
        surnameInput.label = getI18NDataFromAttribute(surnameInput);
    }

    const passwordInput = document.querySelector("#password_input_rg_pg");
    if (passwordInput) {
        passwordInput.label = getI18NDataFromAttribute(passwordInput);
    }

    const repeatPasswordInput = document.querySelector("#repeat_password_input_rg_pg");
    if (repeatPasswordInput) {
        repeatPasswordInput.label = getI18NDataFromAttribute(repeatPasswordInput);
    }

    const createProfileButton = document.querySelector("#sign_up_confirm_btn_rg_pg");
    if (createProfileButton) {
        createProfileButton.label = getI18NDataFromAttribute(createProfileButton);
    }

    const hintHaveAccount = document.querySelector(".hint_text_rg_pg");
    if (hintHaveAccount) {
        hintHaveAccount.textContent = getI18NDataFromAttribute(hintHaveAccount);
    }
}
