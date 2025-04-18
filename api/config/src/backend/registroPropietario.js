import { supabase } from "./conexionSupabase.js";
import bcrypt from "https://esm.sh/bcryptjs";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("propietario_form");
    

    function validarName(name){
        const regex = /^[a-zA-Z]+$/;
        return regex.test(name); 
    }
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(email);
    }
    function validatePassword(password){
        let errors = [];
        if (password.length < 6) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return false;
        }

        if (errors.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirm_password");
            const name = nameInput.value.trim(); 
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Validar nombre
            if (name === "") {
                nameInput.focus();
                nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }else if(!validarName(name)){
                nameInput.focus();
                nameInput.scrollIntoView({behavior: "smooth", block: "center"});
                return; 
            }

            // Validar email
            if (!validarEmail(email)) {
                emailInput.focus();
                emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            // Validar contraseñas
            if(!validatePassword(password)){
                passwordInput.focus();
                passwordInput.scrollIntoView({behavior: "smooth", block: "center"});
                return;
            }
            if (password !== confirmPassword) {
                confirmPasswordInput.focus();
                confirmPasswordInput.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const { error: insertError } = await supabase
                    .from("propietario")
                    .insert([
                        { nombre: name, email: email, password: hashedPassword }
                    ]);

                if (insertError) {
                    throw new Error("Error guardando en la base de datos: " + insertError.message);
                }

                alert("Registro exitoso. Redirigiendo...");
                setTimeout(() => {
                    window.location.href = "/api/config/src/Registro_Negocio.html";
                }, 100);

            } catch (error) {
                console.error("Error:", error.message);
                alert(error.message);
            }
        });
    }
});

