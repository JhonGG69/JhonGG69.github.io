import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://bihypzdbzrgdaytaigwg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaHlwemRienJnZGF5dGFpZ3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDY0NjUsImV4cCI6MjA1OTIyMjQ2NX0.8RaRdpBSWzYSqh8nIQm36a-PTWxiaU4zZO89c-MI44Y";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase inicializado:", supabase); // 🔴 Prueba si está funcionando
/*
// Asegurar que el DOM está cargado antes de agregar el evento
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el formulario por ID correcto
    const form = document.getElementById("propietario_form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar que la página se recargue

        // Obtener valores del formulario
        const name = document.getElementById("name").value;
        const firstSrn = document.getElementById("first_Surname").value;
        const lastName = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Registrar usuario en Supabase
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    firstSurname: firstSrn,
                    lastName: lastName
                }
            }
        });

        // Manejo de errores y éxito
        if (error) {
            console.error("Error en el registro:", error.message);
            alert("Error: " + error.message);
        } else {
            console.log("Usuario registrado:", data.user);
            alert("Registro exitoso, revisa tu correo para confirmar.");
        }
    });
});
*/
