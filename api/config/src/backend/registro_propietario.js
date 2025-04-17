import { createClient } from "https://esm.sh/@supabase/supabase-js"; 
import bcrypt from "https://esm.sh/bcryptjs";

// Conectar con Supabase
const SUPABASE_URL = "https://wszzuzsuciipkjggymmi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzenp1enN1Y2lpcGtqZ2d5bW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTUzODcsImV4cCI6MjA1OTI3MTM4N30.k0_WUwnfXqBon3h9Tpr6D1VEo1SNV1J0qJ2lE6jPUSU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("propietario_form");

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(email);
    }
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); 

            // Obtener valores del formulario
            const name = document.getElementById("name").value;
            const firstSurname = document.getElementById("first_surname").value; 
            const secondSurname = document.getElementById("last_name").value; 
            const phone = document.getElementById("phone").value; 
            let email = document.getElementById("email").value;
            email = email.trim().toLowerCase();  // Normaliza el email
            const password = document.getElementById("password").value;

            if (!validarEmail(email)) {
                alert("Por favor, ingresa un correo válido (ej: ejemplo@dominio.com)");
                return;
            }
        
        try {
            // 🔹 Hashear la contraseña antes de guardarla en la BD
            const hashedPassword = await bcrypt.hash(password, 10);

            // 🔹 Insertar el usuario en la tabla 'propietario'
            const { error: insertError } = await supabase
                .from("propietario")
                .insert([
                    {
                        nombre: name,
                        primer_apellido: firstSurname,
                        segundo_apellido: secondSurname,
                        email: email,
                        phone: phone,
                        password: hashedPassword
                    }
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

