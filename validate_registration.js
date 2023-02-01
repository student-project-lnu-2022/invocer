function validateRegistration() {
    var user_email=document.getElementById("email_input_registration_page").value;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email)))
    {
        document.getElementById("email_input_registration_page").setAttribute("errorText", "You entered an invalid email!");
        document.getElementById("email_input_registration_page").setAttribute("error", "true");
    }

}