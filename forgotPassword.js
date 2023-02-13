document.getElementById("send_code_btn_fp_pg").addEventListener("click", onSendCodeClick);

function onSendCodeClick() {
    document.getElementById("input_email").style.display = "none";
    document.getElementById("second_step").style.display = "inline";
    const userEmail = document.getElementById("em_input_fp_pg").value;
    const spanUserEmail = document.querySelector("#confirm_txt span");
    document.getElementById("confirm_txt").style.display = "inline";
    document.getElementById("confirm_txt").classList.add("animate__animated");
    document.getElementById("confirm_txt").classList.add("animate__fadeInLeft");
    spanUserEmail.textContent = userEmail;
    document.getElementById("confirm_btn_fp_pg").addEventListener("click", onCodeConfirmClick);
}

function onCodeConfirmClick() {
    document.getElementById("confirm_txt").style.display = "none";
    document.getElementById("second_step").style.display = "none";
    document.getElementById("final_step").style.display = "inline";

}