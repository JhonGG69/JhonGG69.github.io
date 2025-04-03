import { createClient } from "https://esm.sh/@supabase/supabase-js";
import bcrypt from "https://esm.sh/bcryptjs";

// 🔹 Conectar con Supabase
const SUPABASE_URL = "https://wszzuzsuciipkjggymmi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzenp1enN1Y2lpcGtqZ2d5bW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTUzODcsImV4cCI6MjA1OTI3MTM4N30.k0_WUwnfXqBon3h9Tpr6D1VEo1SNV1J0qJ2lE6jPUSU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login_form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // 🔹 Obtener datos del formulario
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                // 🔹 Buscar el usuario en la tabla 'propietario'
                const { data: propietario, error } = await supabase
                    .from("propietario")
                    .select("*")
                    .eq("email", email)
                    .maybeSingle(); // Devuelve un solo resultado o null

                if (error) throw new Error("Error al buscar usuario: " + error.message);

                if (!propietario) {
                    alert("Usuario no encontrado");
                    return;
                }

                // 🔹 Comparar la contraseña ingresada con la hasheada en la BD
                const passwordMatch = await bcrypt.compare(password, propietario.password);

                if (!passwordMatch) {
                    alert("Contraseña incorrecta");
                    return;
                }

                // 🔹 Si la contraseña es correcta, guardar en localStorage y redirigir
                localStorage.setItem("usuario", JSON.stringify(propietario));
                alert("Inicio de sesión exitoso");
                window.location.href = "/api/config/src/perfilPropietario.html";

            } catch (error) {
                console.error("Error iniciando sesión:", error.message);
                alert(error.message);
            }
        });
    }
});



