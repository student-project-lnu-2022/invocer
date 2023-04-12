import { host } from './utils_items.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    setMaxFieldContainerHeights,
    allAreFalse,
    validatePasswordAsString
} from './validation_utils.js'
document.getElementById("send_button_fp").addEventListener("click", onSendCodeClick);

function onSendCodeClick() {
    document.getElementById("input_email").style.display = "none";
    document.getElementById("second_step").style.display = "inline";
    const userEmail = document.getElementById("email_input_fp").value;
    const spanUserEmail = document.querySelector("#confirm_txt span");
    const confirmation_text = document.getElementById("confirm_txt");
    confirmation_text.style.display = "inline";
    confirmation_text.classList.add("animate__animated");
    confirmation_text.classList.add("animate__fadeInLeft");
    spanUserEmail.textContent = userEmail;
    sendConfirmationCode(userEmail);
}

document.getElementById("confirm_btn_fp_pg").addEventListener("click", onCodeConfirmClick);

function onCodeConfirmClick() {
    document.getElementById("confirm_txt").style.display = "none";
    document.getElementById("second_step").style.display = "none";
    document.getElementById("final_step").style.display = "inline";
    confirmCode();
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
    const data = { "email": document.getElementById("email_input_fp").value, "code": document.getElementById("confirm_code_fp").value };
    try {
        response = await fetch(host + '/user/confirm_password/', {
            method: "POST",
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.error(error);
    }
}

document.getElementById("change_btn_fp_pg").addEventListener("click", changePassword);

const newPass = document.getElementById("password_input_fp_pg");
const repeatNewPass = document.getElementById("repeat_password_input_fp_pg");

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
                newPass.setAttribute("errorText", 'Password and Confirm Password don\'t match');
                repeatNewPass.setAttribute("error", "true");
                repeatNewPass.setAttribute("errorText", 'Password and Confirm Password don\'t match');
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