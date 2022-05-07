function getURLParam(param) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(param);
    return value;
}

function setEventListeners() {
    const signupLink = document.querySelector('#signup-link');
    const loginLink = document.querySelector('#login-link');
    const logoutLink = document.querySelector('#logout-link');

    const catalogLink = document.querySelector('#catalog-link');
    const createLink = document.querySelector('#create-link');
    const imageLink = document.querySelector('#image-link');

    signupLink.addEventListener("click", function (e) {
        onNavigate('/register');
        e.preventDefault();
    }, true);

    loginLink.addEventListener("click", function (e) {
        onNavigate('/login');
        e.preventDefault();
    }, true);

    logoutLink.addEventListener("click", function (e) {
        auth.logOut();
        e.preventDefault();
    }, true);

    createLink.addEventListener("click", function (e) {
        onNavigate('/create');
        e.preventDefault();
    }, true);
    
    imageLink.addEventListener("click", function (e) {
        onNavigate('/');
        e.preventDefault();
    }, true);

    catalogLink.addEventListener("click", function (e) {
        onNavigate('/');
        e.preventDefault();
    }, true);
}

setEventListeners();