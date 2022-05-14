function signUpCheck() {
    let email = document.getElementById('login-input').value;
    let password = document.getElementById('password-input').value;
    let passwordAgain = document.getElementById('password-again-input').value;

    if (password != passwordAgain) {
        alert("Passwords are different")
        return;
    }
    if (password.length < 6) {
        alert("Password's length should be at least 6 symbols")
        return;
    }
    if (!(password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/) && password.match(/([a-zA-Z])/))) {
        alert("The password must contain at least 1 digit, 1 character, and 1 special symbol")
        return;
    }
    
    auth.signUp(email, password);
      
}


function logInCheck() {
    let email = document.getElementById('login-input').value;
    let password = document.getElementById('password-input').value;
    auth.logIn(email, password);
}