import { supabase } from "./conexionSupabase.js";
import bcrypt from "https://esm.sh/bcryptjs";
import { validateName, validatePasswords, validateEmailComprador,validatePassword } from "./validacion.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("comprador_form");

    if (form){
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); 

        // Obtener valores del formulario
            const name = document.getElementById("name").value.trim(); 
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm_password").value;

            if (!validateName(name)) {
                return;
            } // Llamada a la función de validación del nombre

            if (!(await validateEmailComprador(email))){
                return;
            }
            
            if(!(await validatePassword(password))){
                return;
            }
            
            if(!validatePasswords(password,confirmPassword)){
                return;
            }

            // 🔹 Hashear la contraseña antes de guardarla en la BD
            const hashedPassword = await bcrypt.hash(password, 10);

            // 🔹 Insertar el usuario en la tabla 'propietario'
            const { error: insertError } = await supabase
                .from("comprador")
                .insert([
                    {
                        nombre: name,
                        email: email,
                        password: hashedPassword,
                    }
                ]);

            if (insertError) {
                throw new Error("Error guardando en la base de datos: " + insertError.message);
            }

            alert("Registro exitoso. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "/api/config/login_form.html";
            }, 100);
        });
    }
});
