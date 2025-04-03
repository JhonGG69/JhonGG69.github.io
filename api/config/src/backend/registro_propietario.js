import { createClient } from "https://esm.sh/@supabase/supabase-js"; 

// Conectar con Supabase
const SUPABASE_URL = "https://bihypzdbzrgdaytaigwg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaHlwemRienJnZGF5dGFpZ3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDY0NjUsImV4cCI6MjA1OTIyMjQ2NX0.8RaRdpBSWzYSqh8nIQm36a-PTWxiaU4zZO89c-MI44Y";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("propietario_form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        // Obtener valores del formulario
        const name = document.getElementById("name").value;
        const firstSurname = document.getElementById("first_surname").value; 
        const secondSurname = document.getElementById("last_name").value; 
        const phone = document.getElementById("phone").value; 
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // 🔹 Registrar usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (authError) {
            console.error("Error registrando usuario en Auth:", authError.message);
            alert("Error registrando usuario: " + authError.message);
            return;
        }

        console.log("Usuario registrado en Auth:", authData);

        // 🔹 Insertar el usuario en la tabla personalizada 'propietario'
        const { error: insertError } = await supabase
            .from("propietario") 
            .insert([
                {
                    nombre: name,
                    primer_apellido: firstSurname,
                    segundo_apellido: secondSurname,
                    email: email,
                    telefono: phone
                }
            ]);

        if (insertError) {
            console.error("Error al insertar en la tabla propietario:", insertError.message);
            alert("Error guardando en la base de datos: " + insertError.message);
        } else {
            window.location.href = "Registro_Negocio.html"; // Cambia esto por la URL real de tu página de registro de local.
        }
    });
});
