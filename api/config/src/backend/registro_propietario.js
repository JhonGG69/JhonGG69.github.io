import { createClient } from "https://esm.sh/@supabase/supabase-js"; 
import bcrypt from "https://esm.sh/bcryptjs";

// Conectar con Supabase
const SUPABASE_URL = "@@SUPABASE_URL@@";
const SUPABASE_ANON_KEY = "@@SUPABASE_ANON_KEY@@";
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
});

