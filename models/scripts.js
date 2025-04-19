const productos = JSON.parse(localStorage.getItem('productos')) || [];

function cargarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>${producto.descripcion}</p>
            <button onclick="comprarProducto('${producto.id}')">Comprar</button>
            <button onclick="editarProducto('${producto.id}')">Editar</button>
            <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
            <div>
                <input type="text" placeholder="Comentario..." id="comentario-${producto.id}" />
                <button onclick="agregarComentario('${producto.id}')">Añadir Comentario</button>
            </div>
            <ul id="comentarios-${producto.id}">
                ${(producto.comentarios || []).map(com => `<li>${com.texto} <small>${com.fecha}</small></li>`).join('')}
            </ul>
        `;

        contenedor.appendChild(tarjeta);
    });

    generarEstadisticas();
}

function agregarProducto(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const descripcion = document.getElementById('descripcion').value;

    const nuevoProducto = {
        id: Date.now().toString(),
        nombre,
        precio,
        descripcion,
        comentarios: [],
        fecha: new Date().toISOString().split('T')[0]
    };

    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    cargarProductos();
    e.target.reset();
}

function agregarComentario(productoId) {
    const input = document.getElementById(`comentario-${productoId}`);
    const texto = input.value.trim();
    if (!texto) return;

    const producto = productos.find(p => p.id === productoId);
    producto.comentarios.push({
        texto,
        fecha: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem('productos', JSON.stringify(productos));
    cargarProductos();
}

function comprarProducto(id) {
    alert("¡Producto comprado con ID: " + id + "!");
}

function editarProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const nombre = prompt("Editar nombre:", producto.nombre);
    const precio = prompt("Editar precio:", producto.precio);
    const descripcion = prompt("Editar descripción:", producto.descripcion);

    if (nombre && precio && descripcion) {
        producto.nombre = nombre;
        producto.precio = parseFloat(precio);
        producto.descripcion = descripcion;

        localStorage.setItem('productos', JSON.stringify(productos));
        cargarProductos();
    }
}

function eliminarProducto(productoId) {
    const index = productos.findIndex(p => p.id === productoId);
    if (index !== -1) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        cargarProductos();
    }
}

function generarEstadisticas() {
    const ctx1 = document.getElementById('graficoProductos').getContext('2d');
    const ctx2 = document.getElementById('graficoComentarios').getContext('2d');

    const productosPorDia = {};
    const comentariosPorDia = {};

    productos.forEach(p => {
        productosPorDia[p.fecha] = (productosPorDia[p.fecha] || 0) + 1;
        (p.comentarios || []).forEach(c => {
            comentariosPorDia[c.fecha] = (comentariosPorDia[c.fecha] || 0) + 1;
        });
    });

    if (window.productosChart) window.productosChart.destroy();
    if (window.comentariosChart) window.comentariosChart.destroy();

    window.productosChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Object.keys(productosPorDia),
            datasets: [{
                label: 'Productos por día',
                data: Object.values(productosPorDia),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        }
    });

    window.comentariosChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Object.keys(comentariosPorDia),
            datasets: [{
                label: 'Comentarios por día',
                data: Object.values(comentariosPorDia),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'orange',
                fill: true
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formulario').addEventListener('submit', agregarProducto);
    cargarProductos();
});
