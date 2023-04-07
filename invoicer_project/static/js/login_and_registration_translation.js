i18next.init({
        lng: navigator.language,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    "log_in": "Log in",
                    "password": "Password",
                    "forgot_password": "Forgot password?",
                    "create_an_account": "Create an account",
                    "name": "Name",
                    "surname": "Surname",
                    "repeat_password": "Repeat password",
                    "create_profile": "Create profile",
                    "have_account": "I have an account. Log in.",
                    "sign_up": "Sign up",
                    "lets_go": "Let's go",
                    "invalid_data": "Invalid data",
                    "incorrect_credentials": "Incorrect credentials",
                    "unknown_error": "Unknown error",
                }
            }
            ,
            uk: {
                translation: {
                    "log_in": "Вхід",
                    "password": "Пароль",
                    "forgot_password": "Забули пароль?",
                    "create_an_account": "Створити профіль",
                    "name": "Імʼя",
                    "surname": "Прізвище",
                    "repeat_password": "Повторити пароль",
                    "create_profile": "Зареєструватися",
                    "have_account": "У мене вже є акаунт. Увійти.",
                    "sign_up": "Реєстрація",
                    "lets_go": "Увійти",
                    "invalid_data": "Некоректні дані",
                    "incorrect_credentials": "Неправильний пароль або email",
                    "unknown_error": "Невідома помилка. Оновіть сторінку",
                }
            }
        }
    },

    function (err, t) {
        document.addEventListener('DOMContentLoaded', function () {
            updateContent();
        });
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