function onSendCodeClick() {
    const user_email = document.getElementById("input_forgot_password_page").value;
    const span_user_email = document.getElementById("user_email_forgot_password_page");
    span_user_email.textContent = user_email
    document.getElementById("confirmation_text").style.display = "inline"
    document.getElementById("input_email").innerHTML = `
            <div class="row justify-content-center">
                <div class="d-flex flex-wrap flex-column align-items-center col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-10 col-10"
                     id="background_input_forgot_password_page">
                    <md-outlined-text-field class="col-12" id="input_forgot_password_page" label="Confirmation code"></md-outlined-text-field>
                </div>
            </div>
             <div class="row justify-content-center">
                <md-filled-button onclick='onCodeConfirmClick()' id="log_in_confirmation_button_log_in_page"
                                  class="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-8 col-8"
                                  label="Confirm"></md-filled-button>
            </div>
            `;
}

function onCodeConfirmClick() {
    document.getElementById("confirmation_text").style.display = "none"
    document.getElementById("input_email").innerHTML = `
            <div class="row justify-content-center">
                <div class="d-flex flex-wrap flex-column align-items-center col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-10 col-10"
                     id="background_input_forgot_password_page">
                    <md-outlined-text-field class="col-12" id="password_input_forgot_password_page" label="New password"></md-outlined-text-field>
                    <md-outlined-text-field class="col-12" id="input_forgot_password_page" label="Repeat password"></md-outlined-text-field>
                </div>
            </div>
             <div class="row justify-content-center">
                <md-filled-button id="log_in_confirmation_button_log_in_page"
                                  class="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-8 col-8"
                                  label="Change password"></md-filled-button>
            </div>
            `;
}