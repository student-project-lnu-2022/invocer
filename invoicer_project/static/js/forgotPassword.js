import {makeVisibilityOff} from "./validation_utils.js";

document.getElementById("send_button_fp").addEventListener("click", onSendCodeClick);

function onSendCodeClick() {
    document.getElementById("input_email").style.display = "none";
    document.getElementById("second_step").style.display = "inline";
    const userEmail = document.getElementById("#email_input_fp").value;
    const spanUserEmail = document.querySelector("#confirm_txt span");
    const confirmation_text = document.getElementById("confirm_txt");
    confirmation_text.style.display = "inline";
    confirmation_text.classList.add("animate__animated");
    confirmation_text.classList.add("animate__fadeInLeft");
    spanUserEmail.textContent = userEmail;
}

document.getElementById("confirm_btn_fp_pg").addEventListener("click", onCodeConfirmClick);

function onCodeConfirmClick() {
    document.getElementById("confirm_txt").style.display = "none";
    document.getElementById("second_step").style.display = "none";
    document.getElementById("final_step").style.display = "inline";

}

const newPasswordInput = document.getElementById('password_input_fp_pg');
const repeatPasswordInput = document.getElementById('repeat_password_input_fp_pg');
const newPasswordVisibilityToggleButton = document.getElementById('new_password_visibility_toggle_button');
const repeatPasswordVisibilityToggleButton = document.getElementById('repeat_password_visibility_toggle_button');
makeVisibilityOff(newPasswordVisibilityToggleButton, newPasswordInput);
makeVisibilityOff(repeatPasswordVisibilityToggleButton, repeatPasswordInput);