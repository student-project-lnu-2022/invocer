import { host } from './utils_items.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    setMaxFieldContainerHeights,
    allAreFalse,
    validatePasswordAsString,
    validation, clearErrorAttributes,
} from './validation_utils.js'

const userEmail = document.getElementById("email_input_fp");
const newPass = document.getElementById("password_input_fp_pg");
const repeatNewPass = document.getElementById("repeat_password_input_fp_pg");

document.getElementById("send_button_fp").addEventListener("click", onSendCodeClick);

function onSendCodeClick() {
    const validationResult = validation(userEmail.value, /^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/);
    if (validationResult !== '') {
        userEmail.setAttribute("error", "true");
        userEmail.setAttribute("errorText", validationResult);
        return;
    }
    document.getElementById("input_email").style.display = "none";
    document.getElementById("second_step").style.display = "inline";
    const spanUserEmail = document.querySelector("#confirm_txt span");
    const confirmation_text = document.getElementById("confirm_txt");
    confirmation_text.style.display = "inline";
    confirmation_text.classList.add("animate__animated");
    confirmation_text.classList.add("animate__fadeInLeft");
    spanUserEmail.textContent = userEmail.value;
    sendConfirmationCode(userEmail.value);
}

document.getElementById("confirm_btn_fp_pg").addEventListener("click", onCodeConfirmClick);

async function onCodeConfirmClick() {
    const result = await confirmCode();
    if (!result) {
        return;
    }
    document.getElementById("confirm_txt").style.display = "none";
    document.getElementById("second_step").style.display = "none";
    document.getElementById("final_step").style.display = "inline";
}


async function sendConfirmationCode(userEmail) {
    let response;
    const data = { "email": userEmail };
    try {
        response = await fetch(host + '/user/reset_password/', {
            method: "POST",
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
    }
}

async function confirmCode() {
    let response;
    const confirmCodeText = document.getElementById("confirm_code_fp");
    const data = { "email": document.getElementById("email_input_fp").value, "code": confirmCodeText.value };
    try {
        response = await fetch(host + '/user/confirm_password/', {
            method: "POST",
            body: JSON.stringify(data)
        });
        if (response.status !== 200) {
            confirmCodeText.setAttribute("error", "true");
            confirmCodeText.setAttribute("errorText", i18next.t("wrong_confirmation_code"));
        }
    } catch (error) {
        console.error(error);
    }
    return response.status === 200;
}

document.getElementById("change_btn_fp_pg").addEventListener("click", changePassword);

const returnAllFields = function () {
    return [
        newPass, repeatNewPass
    ];
}

async function changePassword() {
    const validationFieldsList = validateUserPasswordEdit();
    if (allAreFalse(validationFieldsList)) {
        let response;
        const data = { "email": document.getElementById("email_input_fp").value, "new_password": newPass.value, "repeat_new_password": repeatNewPass.value };
        try {
            response = await fetch(host + '/user/reset_password/', {
                method: "PATCH",
                body: JSON.stringify(data)
            });
            if (response.status === 200) {
                window.location.href = host + '/user/login/';
            }
            else if (response.status === 400) {
                newPass.setAttribute("error", "true");
                newPass.setAttribute("errorText", i18next.t("match_error"));
                repeatNewPass.setAttribute("error", "true");
                repeatNewPass.setAttribute("errorText", i18next.t("match_error"));
            }
        } catch (error) {
            console.error(error);
        }
    }
    else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
}

function validateUserPasswordEdit() {
    removeAllErrorAttributes(returnAllFields());
    setMaxFieldContainerHeights(returnAllFields());
    return {
        'newPasswordValidationResult': validatePasswordAsString(newPass.value),
        'repeatNewPasswordValidationResult': validatePasswordAsString(repeatNewPass.value)
    };
}
const mdInputs = document.querySelectorAll('md-outlined-text-field');
clearErrorAttributes(mdInputs);
document.getElementById("resend_text").addEventListener("click", onSendCodeClick);
