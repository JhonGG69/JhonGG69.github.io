document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
    alert("Debes iniciar sesión primero");
    window.location.href = "/login.html";
    return;
    }

    document.getElementById("nombre").textContent = `Hola, ${usuario.nombre} ${usuario.primer_apellido}`;
    document.getElementById("email").textContent = usuario.email || "Sin email";
    document.getElementById("telefono").textContent = usuario.telefono || "Sin teléfono";
});

function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "/login.html";
}