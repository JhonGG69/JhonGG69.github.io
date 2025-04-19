import { supabase } from "./conexionSupabase.js";
import bcrypt from "https://esm.sh/bcryptjs";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login_form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // 🔹 Obtener datos del formulario
            const email = document.getElementById("email").value.trim().toLowerCase();
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
                    .from("comprador")
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

