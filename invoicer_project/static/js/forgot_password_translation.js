document.addEventListener('DOMContentLoaded', function () {
    forgotPasswordTranslation();
});

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

function forgotPasswordTranslation() {
    const forgotPasswordText = document.querySelector("#forgot_password_txt");
    if (forgotPasswordText) {
        forgotPasswordText.textContent = getI18NDataFromAttribute(forgotPasswordText);
    }

    const sendCodeButton = document.querySelector("#send_button_fp");
    if (sendCodeButton) {
        sendCodeButton.label = getI18NDataFromAttribute(sendCodeButton);
    }

    const confirmationSentText = document.querySelector("#confirm_txt").childNodes[0];
    if (confirmationSentText) {
        confirmationSentText.textContent = i18next.t("confirmation_sent");
    }

    const resendCodeText = document.querySelector("#resend_text");
    if (resendCodeText) {
        resendCodeText.textContent = getI18NDataFromAttribute(resendCodeText);
    }

    const confirmationCodeInput = document.querySelector("#confirm_code_fp");
    if (confirmationCodeInput) {
        confirmationCodeInput.label = getI18NDataFromAttribute(confirmationCodeInput);
    }


    const confirmButton = document.querySelector("#confirm_btn_fp_pg");
    if (confirmButton) {
        confirmButton.label = getI18NDataFromAttribute(confirmButton);
    }

    const repeatPasswordInput = document.querySelector("#repeat_password_input_fp_pg");
    if (repeatPasswordInput) {
        repeatPasswordInput.label = getI18NDataFromAttribute(repeatPasswordInput);
    }

    const newPasswordInput = document.querySelector("#password_input_fp_pg");
    if (newPasswordInput) {
        newPasswordInput.label = getI18NDataFromAttribute(newPasswordInput);
    }

    const changePasswordButton = document.querySelector("#change_btn_fp_pg");
    if (changePasswordButton) {
        changePasswordButton.label = getI18NDataFromAttribute(changePasswordButton);
    }

}

