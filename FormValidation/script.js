const form = document.getElementById("form");

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const passwordError = document.getElementById("passwordError")

form.addEventListener("submit", function(e){
    e.preventDefault();

    let isValid = true;

    //name validation
    if(nameInput.value.trim()==="") {
        nameError.innerText = "Name is required";
        isValid=false;
    }
    else {
        nameError.innerText=""
    }

    //email validation
    if(!validateEmail(emailInput.value)){
        emailError.innerText="Invalid email";
        isValid=false
    }else {
        emailError.innerText=""
    }

    //password validation
    if(passwordInput.value.length < 6) {
        passwordError.innerText = "password must be at least 6 letter"
        isValid = false
    } else {
        passwordError.innerText = ""
    }

    if(isValid) {
        alert("form submitted successfully")
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}