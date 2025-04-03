import { createClient } from "https://esm.sh/@supabase/supabase-js";

// 🔹 Conectar con Supabase
const SUPABASE_URL = "https://bihypzdbzrgdaytaigwg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaHlwemRienJnZGF5dGFpZ3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDY0NjUsImV4cCI6MjA1OTIyMjQ2NX0.8RaRdpBSWzYSqh8nIQm36a-PTWxiaU4zZO89c-MI44Y";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login_form");
    const forgotPasswordLink = document.getElementById("forgot_password");

    // 🔹 Verificar si el formulario de login existe antes de agregar eventos
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // 🔹 Obtener datos del formulario
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // 🔹 Autenticar con Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error("Error iniciando sesión:", error.message);
                alert("Error: " + error.message);
                return;
            }

            console.log("Usuario autenticado:", data);

            // 🔹 Buscar en la tabla 'propietario'
            let { data: propietario, error: propietarioError } = await supabase
                .from("propietario")
                .select("*")
                .eq("email", email)
                .limit(1)
                .maybeSingle();
            console.log("Resultado de búsqueda en propietario:", propietario, propietarioError);

            if (propietario) {
                console.log("Usuario es un propietario:", propietario);
                localStorage.setItem("usuario", JSON.stringify(propietario)); // Guardar en localStorage
                window.location.href = "perfilPropietario.html";
                return;
            }
        });
    }

    // 🔹 Evento para "Olvidé mi contraseña"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", async function (event) {
            event.preventDefault(); // Evita que el enlace recargue la página

            const email = prompt("Ingresa tu correo para recuperar la contraseña:");

            if (email) {
                const { error } = await supabase.auth.resetPasswordForEmail(email);
                if (error) {
                    alert("Error al enviar el correo: " + error.message);
                } else {
                    alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
                }
            }
        });
    }
});


