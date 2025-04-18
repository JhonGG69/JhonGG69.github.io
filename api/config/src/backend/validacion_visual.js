document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    function validateName() {
        const errorSpan = document.getElementById("name_error");
        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(nameInput.value)) {
            errorSpan.textContent = "El nombre solo debe contener letras.";
            nameInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        } else {
            errorSpan.textContent = "";
            nameInput.style.borderColor = "";
            return true;
        }
    }
    nameInput.addEventListener("input", function() {
        if (nameInput.value !== "") {
            validateName();
        } else {
            document.getElementById("name_error").textContent = "";
            nameInput.style.borderColor = "";
        }
    });
    nameInput.addEventListener("blur", function() {
        const errorSpan = document.getElementById("name_error");
        if (nameInput.value === "") {
            errorSpan.textContent = "El nombre no puede quedar vacio.";
            nameInput.style.borderColor = "red";
            errorSpan.style.color = "red";
        } else {
            validateName();
        }
    });
    

    function validateEmail() {
        const errorSpan = document.getElementById("email_error");
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!regex.test(emailInput.value)) {
            errorSpan.textContent = "Correo inválido.";
            emailInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        } else {
            errorSpan.textContent = "";
            emailInput.style.borderColor = "";
            return true;
        }
    }
    emailInput.addEventListener("input", function() {
        if (emailInput.value !== "") {
            validateEmail();
        } else {
            document.getElementById("email_error").textContent = "";
            emailInput.style.borderColor = "";
        }
    });

    emailInput.addEventListener("blur", function(){
        const errorSpan = document.getElementById("email_error")
        if (emailInput.value === "") {
            errorSpan.textContent = "El email no puede quedar vacío.";
            emailInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        }else{
            validateEmail();
        }
    });

    function validatePassword() {
        const password = passwordInput.value;
        const errorSpan = document.getElementById("password_error");
        let errors = [];

        if (password.length < 6) {
            errors.push("al menos 6 caracteres");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("una mayúscula");
        }
        if (!/\d/.test(password)) {
            errors.push("un número");
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.push("un carácter especial");
        }

        if (errors.length > 0) {
            errorSpan.textContent = "La contraseña debe tener " + errors.join(", ") + ".";
            passwordInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        } else {
            errorSpan.textContent = "";
            passwordInput.style.borderColor = "";
            return true;
        }
    }

    passwordInput.addEventListener("input", function() {
        if (passwordInput.value !== "") {
            validatePassword();
        } else {
            document.getElementById("password_error").textContent = "";
            passwordInput.style.borderColor = "";
        }
        if (confirmPasswordInput.value !== "") {
            validatePasswords();  // Valida coincidencia
        }
    });

    passwordInput.addEventListener("blur", function(){
        const errorSpan = document.getElementById("password_error")
        if (passwordInput.value === "") {
            errorSpan.textContent = "La contraseña no puede quedar vacía.";
            passwordInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        }else{
            validatePassword();
        }
    });

    function validatePasswords() {
        const errorSpan = document.getElementById("confPassword_error");
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorSpan.textContent = "Las contraseñas no coinciden.";
            confirmPasswordInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        } else {
            errorSpan.textContent = "";
            confirmPasswordInput.style.borderColor = "";
            return true;
        }
    }
    confirmPasswordInput.addEventListener("input", function() {
        if (confirmPasswordInput.value !== "") {
            validatePasswords();
        } else {
            document.getElementById("confPassword_error").textContent = "";
            confirmPasswordInput.style.borderColor = "";
        }
    });

    confirmPasswordInput.addEventListener("blur", function(){
        const errorSpan = document.getElementById("confPassword_error")
        if (confirmPasswordInput.value === "") {
            errorSpan.textContent = "Debes confirmar tu contraseña.";
            confirmPasswordInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        }else{
            validatePasswords();
        }
    });


});
