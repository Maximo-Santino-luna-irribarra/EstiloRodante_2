// Obtener elementos del DOM necesarios para filtros, búsqueda y orden
const tipoSelect = document.getElementById("types");
const marcaSelect = document.querySelector('select[name="brands"]');
const modeloSelect = document.querySelector('select[name="models"]');
const minPriceInput = document.querySelector(".minPrice");
const maxPriceInput = document.querySelector(".maxPrice");
const ordenarSelect = document.getElementById("ordenar");
const searchInput = document.querySelector('input[type="text"]');
const contenedorProductos = document.querySelector(".box");

// Ruta al archivo JSON de productos
const url = "/Front/objects/productos_combinados.json"

// Configuraciones para paginación
const productosPorPagina = 12;
let paginaActual = 1;

// Variables para guardar productos y carrito
let productos = []
let carrito = cargarCarrito(); // Se carga el carrito desde localStorage
let productosFiltrados = [];   // Lista filtrada para mostrar en pantalla

// Función asíncrona que carga los productos desde el archivo JSON
async function ingresarMercaderia (url)
{
    const response = await fetch(url);     // Se hace la petición al archivo
    productos = await response.json();     // Se convierte la respuesta en JSON
    return productos
}

// Función que filtra productos según los campos seleccionados por el usuario
function filtrar(productos) {
    const tipo = tipoSelect.value;
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Number.POSITIVE_INFINITY;
    const ordenar = ordenarSelect.value;
    const search = searchInput.value.toLowerCase();

    // Se aplican todos los filtros
    let resultado = productos.filter(producto => {
        const cumpleTipo = tipo === "todos" || producto.tipo === tipo;
        const cumpleMarca = marca === "todas" || producto.marca === marca;
        const cumpleModelo = modelo === "todos" || producto.modelo === modelo;
        const cumplePrecio = producto.precio >= minPrice && producto.precio <= maxPrice;
        const cumpleBusqueda = producto.nombre.toLowerCase().includes(search);
        return cumpleTipo && cumpleMarca && cumpleModelo && cumplePrecio && cumpleBusqueda;
    });

    // Se aplica ordenamiento si corresponde
    if (ordenar === "precioAsc") {
        resultado.sort((a, b) => a.precio - b.precio);
    } else if (ordenar === "precioDesc") {
        resultado.sort((a, b) => b.precio - a.precio);
    } else if (ordenar === "alfabetico") {
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    productosFiltrados = resultado;
    mostrarProductos(paginaActual);
    generarPaginacion();
}

// Une productos de llantas y neumáticos en un solo array y les agrega un campo "tipo"
function combinarProductos(datosJson) {
    const llantas = datosJson.llantas.map(llanta => ({ ...llanta, tipo: "llanta" }));
    const neumaticos = datosJson.neumaticos.map(neumatico => ({ ...neumatico, tipo: "neumatico" }));
    return [...llantas, ...neumaticos]; // Retorna los productos combinados
}

// Crea una tarjeta de producto para un neumático
const writeneumatico = (neumatico) => {
    const neumaticoCard = document.createElement("div");
    neumaticoCard.classList.add("card");
    neumaticoCard.innerHTML = `
        <h2>${neumatico.nombre}</h2>
        <p>Precio: $${neumatico.precio}</p>
        <p>Marca: ${neumatico.marca}</p>
        <img src="${neumatico.imagen}" alt="${neumatico.nombre}">
        <button onclick="agregarAlCarrito(${neumatico.id}, 'neumatico')">Agregar al carrito</button>
        <button onclick="eliminarDelCarrito(${neumatico.id}, 'neumatico')">Eliminar del carrito</button>
    `;
    contenedorProductos.appendChild(neumaticoCard);
};

// Crea una tarjeta de producto para una llanta
const writeLlanta = (llanta) => {
    const llantaCard = document.createElement("div");
    llantaCard.classList.add("card");
    llantaCard.innerHTML = `
        <h2>${llanta.nombre}</h2>
        <p>Precio: $${llanta.precio}</p>
        <p>Marca: ${llanta.marca}</p>
        <img src="${llanta.imagen}" alt="${llanta.nombre}">
        <button onclick="agregarAlCarrito(${llanta.id}, 'llanta')">Agregar al carrito</button>
        <button onclick="eliminarDelCarrito(${llanta.id}, 'llanta')">Eliminar del carrito</button>
    `;
    contenedorProductos.appendChild(llantaCard);
};

// Muestra los productos de la página actual en pantalla
function mostrarProductos(pagina) {
    contenedorProductos.innerHTML = "";
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    productosPagina.forEach(producto => {
        if (producto.tipo === "neumatico") {
            writeneumatico(producto);
        } else {
            writeLlanta(producto);
        }
    });
}

// Crea la paginación en base a la cantidad de productos filtrados
function generarPaginacion() {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement("button");
        boton.textContent = i;
        boton.addEventListener("click", () => {
            paginaActual = i;
            mostrarProductos(paginaActual);
        });
        paginacion.appendChild(boton);
    }
}

// Agrega un producto al carrito
function agregarAlCarrito(productoId, tipo) {
    const producto = productos.find(p => p.id === productoId && p.tipo === tipo);
    if (producto) {
        carrito.push(producto);
        guardarCarrito();
        mostrarAlerta(producto.nombre, producto.precio);
    }
}

// Elimina un producto del carrito
function eliminarDelCarrito(productoId, tipo) {
    const index = carrito.findIndex(p => p.id === productoId && p.tipo === tipo);
    if (index !== -1) {
        carrito.splice(index, 1);
        guardarCarrito();
    }
}

// Guarda el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Carga el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Muestra una alerta cuando se agrega un producto al carrito
function mostrarAlerta(nombre, precio) {
    const alerta = document.getElementById("alerta");
    alerta.textContent = `Producto agregado: ${nombre} - $${precio}`;
    alerta.classList.remove("oculto");

    setTimeout(() => {
        alerta.classList.add("oculto");
    }, 3000);
}

// Modo Noche / Día
const modoBtn = document.getElementById("modoNocheBtn");
const modoActual = localStorage.getItem("modo") || "dia";

if (modoActual === "noche") {
    document.body.classList.add("modo-noche");
    modoBtn.textContent = "☀️";
} else {
    document.body.classList.remove("modo-noche");
    modoBtn.textContent = "🌙";
}

modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("modo-noche");

    if (document.body.classList.contains("modo-noche")) {
        localStorage.setItem("modo", "noche");
        modoBtn.textContent = "☀️";
    } else {
        localStorage.setItem("modo", "dia");
        modoBtn.textContent = "🌙";
    }
});
