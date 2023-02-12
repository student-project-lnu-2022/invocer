document.getElementById("send_code_btn_fp_pg").addEventListener("click", onSendCodeClick);

function onSendCodeClick() {

    const userEmail = document.getElementById("em_input_fp_pg").value;
    const spanUserEmail = document.querySelector("#confirm_txt span");
    document.getElementById("confirm_txt").style.display = "inline";
    document.getElementById("confirm_txt").classList.add("animate__animated");
    document.getElementById("confirm_txt").classList.add("animate__fadeInLeft");
    spanUserEmail.textContent = userEmail;
    const emailInputForm = document.getElementById("input_email");
    while (emailInputForm.firstChild) {
        emailInputForm.removeChild(emailInputForm.firstChild);
    }
    emailInputForm.insertAdjacentHTML("afterbegin", "            <div class=\"row justify-content-center animate__animated animate__fadeInLeft\">\n" +
        "                <div class=\"bg_input_fp_pg d-flex flex-wrap flex-column align-items-center col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-10 col-10\"\n" +
        "                     >\n" +
        "                    <md-outlined-text-field class=\"col-12\" id=\"em_input_fp_pg\" label=\"Confirmation code\"></md-outlined-text-field>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "             <div class=\"row justify-content-center\">\n" +
        "                <md-filled-button id=\"confirm_btn_fp_pg\"\n" +
        "                                  class=\"col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-8 col-8\"\n" +
        "                                  label=\"Confirm\"></md-filled-button>\n" +
        "            </div>")
    document.getElementById("confirm_btn_fp_pg").addEventListener("click", onCodeConfirmClick);
}
function onCodeConfirmClick() {
    document.getElementById("confirm_txt").style.display = "none"
    const emailInputForm = document.getElementById("input_email");
    while (emailInputForm.firstChild) {
        emailInputForm.removeChild(emailInputForm.firstChild);
    }
    emailInputForm.insertAdjacentHTML("afterbegin", "            <div class=\"row justify-content-center animate__animated animate__fadeInLeft\">\n                <div class=\"bg_input_fp_pg d-flex flex-wrap flex-column align-items-center col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-10 col-10\"\n                     >\n                    <md-outlined-text-field class=\"col-12\" id=\"password_input_fp_pg\" label=\"New password\"></md-outlined-text-field>\n                    <md-outlined-text-field class=\"col-12\" id=\"em_input_fp_pg\" label=\"Repeat password\"></md-outlined-text-field>\n                </div>\n            </div>\n             <div class=\"row justify-content-center\">\n                <md-filled-button id=\"confirm_btn_fp_pg\"\n                                  class=\"col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-8 col-8\"\n                                  label=\"Change password\"></md-filled-button>\n            </div>");
}