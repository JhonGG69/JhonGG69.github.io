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
                // 🔹 Buscar primero en la tabla 'propietario'
                const { data: propietario, error: errorProp } = await supabase
                    .from("propietario")
                    .select("*")
                    .eq("email", email)
                    .maybeSingle();

                if (errorProp) throw new Error("Error al buscar propietario: " + errorProp.message);

                if (propietario) {
                    // 🔐 Verificar la contraseña
                    const validPassword = await bcrypt.compare(password, propietario.password);
                    if (!validPassword) {
                        alert("Contraseña incorrecta");
                        return;
                    }

                    // ✅ Usuario propietario autenticado
                    localStorage.setItem("usuario", JSON.stringify(propietario));
                    window.location.href = "/api/config/src/perfilPropietario.html";
                    return;
                }

                // 🔹 Si no está en propietario, buscar en 'usuario_comprador'
                const { data: comprador, error: errorComp } = await supabase
                    .from("usuario_comprador")
                    .select("*")
                    .eq("email", email)
                    .maybeSingle();

                if (errorComp) throw new Error("Error al buscar comprador: " + errorComp.message);

                if (comprador) {
                    // 🔐 Verificar la contraseña
                    const validPassword = await bcrypt.compare(password, comprador.password);
                    if (!validPassword) {
                        alert("Contraseña incorrecta");
                        return;
                    }

                    // ✅ Usuario comprador autenticado
                    localStorage.setItem("usuario", JSON.stringify(comprador));
                    window.location.href = "/api/config/src/perfilComprador.html";
                    return;
                }

                // ❌ Si no se encuentra en ninguna tabla
                alert("Usuario no encontrado en el sistema");

            } catch (error) {
                console.error("Error iniciando sesión:", error.message);
                alert(error.message);
            }
        });
    }
});

