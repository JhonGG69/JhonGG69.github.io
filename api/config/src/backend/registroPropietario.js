import { supabase } from "./conexionSupabase.js";
import bcrypt from "https://esm.sh/bcryptjs";
import { validateName, validatePasswords, validateEmailPropietario,validatePassword } from "./validacionPropietario.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("propietario_form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm_password").value;

            // Validaciones finales antes de enviar
            
            if (!validateName(name)) {
                const nameInput = document.getElementById("name");
                nameInput.focus();
                return;
            } // Llamada a la función de validación del nombre

            if (!(await validateEmailPropietario(email))){
                const emailInput = document.getElementById("email");
                emailInput.focus();
                return;
            }
            
            if(!(await validatePassword(password))){
                const passwordInput = document.getElementById("password");
                passwordInput.focus();
                return;
            }
            
            if(!validatePasswords(password,confirmPassword)){
                const confirmPasswordInput = document.getElementById("confirm_password");
                confirmPasswordInput.focus();
                return;
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo propietario en la base de datos
            const { error: insertError } = await supabase
                .from("propietario")
                .insert([
                    { nombre: name,
                    email: email,
                    password: hashedPassword 
                    }]);

            if (insertError) {
                throw new Error("Error guardando en la base de datos: " + insertError.message);
            }

            alert("Registro exitoso. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "/api/config/src/Registro_Negocio.html";
            }, 100);
        });
    }
});




