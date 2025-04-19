import { supabase } from "./conexionSupabase.js";
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    let emailValidationId = 0;

    // VALIDAR NOMBRE
    export function validateName() {
        const errorSpan = document.getElementById("name_error");
        const regex = /^[a-zA-Z]+$/;
        
        if(nameInput.value === ""){
        errorSpan.textContent = "El nombre no puede quedar vacio";
        errorSpan.style.color = "red"
        nameInput.style.borderColor = "red";
        nameInput.focus();
        return false;
        }else if (!regex.test(nameInput.value.trim())) {
            errorSpan.textContent = "El nombre solo debe contener letras.";
            nameInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        } else {
            errorSpan.textContent = "";
            nameInput.style.borderColor = "green";
            return true;
        }
    }

    nameInput.addEventListener("input", function () {
        if (nameInput.value !== "") {
            validateName();
        } else {
            document.getElementById("name_error").textContent = "";
            nameInput.style.borderColor = "";
        }
    });

    nameInput.addEventListener("blur", function () {
        const errorSpan = document.getElementById("name_error");
        if (nameInput.value === "") {
            errorSpan.textContent = "La contraseña no puede quedar vacía.";
            nameInput.style.borderColor = "red";
            errorSpan.style.color = "red";
        } else {
            validateName();
        }
    });

    // Variable global para controlar validaciones asíncronas

    // VALIDAR EMAIL Comprador
export async function validateEmailComprador() {
    const errorSpan = document.getElementById("email_error");
    const email = emailInput.value.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Incrementar ID y guardar para esta validación específica
    const thisValidation = ++emailValidationId;

    // Validación inicial
    if(emailInput.value === "") {
        errorSpan.textContent = "El email no puede quedar vacio";
        errorSpan.style.color = "red";
        emailInput.style.borderColor = "red";
        return false;
    }
    
    if (!regex.test(email)) {
        errorSpan.textContent = "Correo inválido.";
        emailInput.style.borderColor = "red";
        errorSpan.style.color = "red";
        return false;
    }

    try {
        // Mostrar estado "verificando" mientras se consulta la base de datos
        errorSpan.textContent = "Verificando...";
        emailInput.style.borderColor = "orange";

        // Validación en la base de datos
        const { data, error } = await supabase
            .from("comprador")
            .select("email")
            .eq("email", email);

        // Si esta no es la validación más reciente, ignorar resultados
        if (thisValidation !== emailValidationId) {
            //console.log("Validación obsoleta, ignorando resultados");
            return false;
        }

        if (error) {
            errorSpan.textContent = "Error al verificar el correo.";
            emailInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        }

        // Verificar si el correo ya está registrado
        if (data && data.length > 0) {
            errorSpan.textContent = "Este correo ya está registrado.";
            emailInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        }
        
        // Email válido y no registrado
        errorSpan.textContent = "";
        emailInput.style.borderColor = "green";
        return true;
    } catch (error) {
        if (thisValidation !== emailValidationId) return false;
        
        errorSpan.textContent = "Error al verificar el correo.";
        emailInput.style.borderColor = "red";
        errorSpan.style.color = "red";
        return false;
    }
}
   // Para el input, usar un debounce para no validar en cada pulsación
let emailInputTimeout;
emailInput.addEventListener("input", function() {
    const errorSpan = document.getElementById("email_error");
    
    // Limpiar el timeout anterior si existe
    if (emailInputTimeout) clearTimeout(emailInputTimeout);
    
    if (emailInput.value === "") {
        errorSpan.textContent = "";
        emailInput.style.borderColor = "";
        return;
    }
    
    // Establecer estado "verificando"
    errorSpan.textContent = "Verificando...";
    emailInput.style.borderColor = "orange";
    
    // Esperar 500ms después de que el usuario deje de escribir
    emailInputTimeout = setTimeout(async () => {
        await validateEmailComprador(); // o validateEmailComprador
    }, 500);
});

// Para el blur, validar siempre
emailInput.addEventListener("blur", async function() {
    const errorSpan = document.getElementById("email_error");
    if (emailInput.value === "") {
        errorSpan.textContent = "El email no puede quedar vacío.";
        emailInput.style.borderColor = "red";
        errorSpan.style.color = "red";
    } else {
        // Cancelar cualquier timeout pendiente
        if (emailInputTimeout) clearTimeout(emailInputTimeout);
        await validateEmailComprador(); // o validateEmailComprador
    }
});

    
        // VALIDAR CONTRASEÑA
        export async function validatePassword() {
            const password = passwordInput.value;
            const errorSpan = document.getElementById("password_error");
            let errors = [];

            if(passwordInput.value === ""){
                errorSpan.textContent = "La contraseña no puede quedar vacia";
                errorSpan.style.color = "red"
                passwordInput.style.borderColor = "red";
                passwordInput.focus();
                return false;
            }

            if (password.length < 8) errors.push("al menos 8 caracteres");
            if (!/[A-Z]/.test(password)) errors.push("una mayúscula");
            if (!/\d/.test(password)) errors.push("un número");
            if (!/[^A-Za-z0-9]/.test(password)) errors.push("un carácter especial");

            if (errors.length > 0) {
                errorSpan.textContent = "La contraseña debe tener " + errors.join(", ") + ".";
                passwordInput.style.borderColor = "red";
                errorSpan.style.color = "red";
                return false;
            } else {
                errorSpan.textContent = "";
                passwordInput.style.borderColor = "green";
                return true;
            }
        }

        passwordInput.addEventListener("input", function () {
            if (passwordInput.value !== "") {
                validatePassword();
            } else {
                document.getElementById("password_error").textContent = "";
                passwordInput.style.borderColor = "";
            }
            if (confirmPasswordInput.value !== "") {
                validatePasswords();  // Comprobar coincidencia en tiempo real
            }
        });

        passwordInput.addEventListener("blur", function () {
            const errorSpan = document.getElementById("password_error");
            if (passwordInput.value === "") {
                errorSpan.textContent = "La contraseña no puede quedar vacía.";
                passwordInput.style.borderColor = "red";
                errorSpan.style.color = "red";
            } else {
                validatePassword();
            }
        });

    // VALIDAR CONFIRMACIÓN DE CONTRASEÑA
    export function validatePasswords() {
        const errorSpan = document.getElementById("confPassword_error");
        if(confirmPasswordInput.value === ""){
            errorSpan.textContent = "Debe confirmar su contraseña";
            errorSpan.style.color = "red"
            confirmPasswordInput.style.borderColor = "red";
            confirmPasswordInput.focus();
            return false;
        }else if (passwordInput.value !== confirmPasswordInput.value) {
            errorSpan.textContent = "Las contraseñas no coinciden.";
            confirmPasswordInput.style.borderColor = "red";
            errorSpan.style.color = "red";
            return false;
        } else {
            errorSpan.textContent = "";
            confirmPasswordInput.style.borderColor = "green";
            return true;
        }
    }

    confirmPasswordInput.addEventListener("input", function () {
        if (confirmPasswordInput.value !== "") {
            validatePasswords();
        } else {
            document.getElementById("confPassword_error").textContent = "";
            confirmPasswordInput.style.borderColor = "";
        }
    });

    confirmPasswordInput.addEventListener("blur", function () {
        const errorSpan = document.getElementById("confPassword_error");
        if (confirmPasswordInput.value === "") {
            errorSpan.textContent = "Debe confirmar su contraseña.";
            confirmPasswordInput.style.borderColor = "red";
            errorSpan.style.color = "red";
        } else {
            validatePasswords();
        }
    
});
