// Elementos del DOM
const tipoSelect = document.getElementById("types");
const marcaSelect = document.querySelector('select[name="brands"]');
const modeloSelect = document.querySelector('select[name="models"]');
const minPriceInput = document.querySelector(".minPrice");
const maxPriceInput = document.querySelector(".maxPrice");
const ordenarSelect = document.getElementById("ordenar");
const searchInput = document.querySelector('input[type="text"]');
const contenedorProductos = document.querySelector(".box");
const url = "/Front/objects/productos_combinados.json"
const productosPorPagina = 12;
let paginaActual = 1;
let productos = []
let carrito = cargarCarrito();

async function ingresarMercaderia (url)
{
    const response = await fetch(url);
    productos = await response.json();
    return productos
}

function filtrar() {
    const busqueda = document.querySelector('.search-bar').value.toLowerCase();
    const filtrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
    MostrarProductos(filtrados);
    writeProduct(filtrados);
}

const writeneumatico = (neumatico) => {
    const { id, marca, modelo, precio, nombre } = neumatico;

    const product = document.createElement("div");
    product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    product.innerHTML = `
    <div class="card product-box text-center p-3 shadow rounded-4">
        <div class="product-image-wrapper mx-auto mb-3">
            <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image" alt="${modelo}">
        </div>
        <h5 class="fw-bold text-dark mb-1">Modelo: ${nombre}</h5>
        <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
        <p class="mb-3">Marca: ${marca}</p>
        <div class="d-flex justify-content-end gap-2 mt-auto">
            <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
            <button class="btn btn-outline-success btn-sm btn-agregar">Agregar al carrito</button>
        </div>
    </div>`;

    const btnAgregar = product.querySelector(".btn-agregar");
    const btnEliminar = product.querySelector(".btn-eliminar");

    btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(neumatico);
        }
    );

    btnEliminar.addEventListener("click", () => {
        eliminarDelCarrito(neumatico);
    });

    contenedorProductos.appendChild(product);
};

const writeLlanta = (llanta) => {
    const { id, nombre, marca, modelo, precio } = llanta;

    const product = document.createElement("div");
    product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    product.innerHTML = `
        <div class="card product-box text-center p-3 shadow rounded-4">
            <div class="product-image-wrapper mx-auto mb-3">
                <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image" alt="${modelo}">
            </div>
            <h5 class="fw-bold text-dark mb-1">Modelo: ${nombre}</h5>
            <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
            <p class="mb-3">Marca: ${marca}</p>
            <div class="d-flex justify-content-end gap-2 mt-auto">
                <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
                <button class="btn btn-outline-success btn-sm btn-agregar"> Agregar al carrito"</button>
            </div>
        </div>
    `;

    const btnAgregar = product.querySelector(".btn-agregar");
    const btnEliminar = product.querySelector(".btn-eliminar");

    btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(llanta);
    });

    btnEliminar.addEventListener("click", () => {
        eliminarDelCarrito(llanta);
    });

    contenedorProductos.appendChild(product);
};

function mostrarProductos(pagina) {
    contenedorProductos.innerHTML = "";

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    productosPagina.forEach((producto) => {
    if (producto.tipo === "llanta") {
        writeLlanta(producto);
    } else if (producto.tipo === "neumatico") {
        writeneumatico(producto);
    }
    });
}

function generarPaginacion() {
    const totalPaginas = productosFiltrados.length / productosPorPagina
    const paginacion = document.getElementById("pagination");
    paginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === paginaActual ? "active" : ""}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;

    li.querySelector("button").addEventListener("click", () => {
        paginaActual = i;
        mostrarProductos(paginaActual);
        generarPaginacion();
    });

    paginacion.appendChild(li);
}
}

function combinarProductos(datosJson) {
    const llantas = datosJson.productos.llantas.map(p => ({
        ...p,
        tipo: "llanta",
        nombre: p.nombre ?? `${p.marca} ${p.modelo}`
    }));

    const neumaticos = datosJson.productos.neumaticos.map(p => ({
        ...p,
        tipo: "neumatico",
        nombre: `${p.marca} ${p.modelo}`,
        precio: p.precio
    }));

    return [...llantas, ...neumaticos];
}

function filtrar(productos) {
    const tipo = tipoSelect.value;
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    const min = parseFloat(minPriceInput.value);
    const max = parseFloat(maxPriceInput.value);
    const busqueda = searchInput.value.toLowerCase();
    const orden = ordenarSelect.value;

    contenedorProductos.innerHTML = "";

    let filtrados = productos;

    if (tipo !== "Todos") filtrados = filtrados.filter(p => p.tipo === tipo);
    if (marca !== "Todos") filtrados = filtrados.filter(p => p.marca === marca);
    if (modelo !== "Todos") filtrados = filtrados.filter(p => p.modelo === modelo);
    if (!isNaN(min)) filtrados = filtrados.filter(p => p.precio >= min);
    if (!isNaN(max)) filtrados = filtrados.filter(p => p.precio <= max);
    if (busqueda) filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(busqueda));

    switch (orden) {
        case "precio-asc": filtrados.sort((a, b) => a.precio - b.precio); break;
        case "precio-desc": filtrados.sort((a, b) => b.precio - a.precio); break;
        case "nombre-asc": filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
        case "nombre-desc": filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
    }

    productosFiltrados = filtrados;
    paginaActual = 1;
    mostrarProductos(paginaActual);
    generarPaginacion();
}

function agregarAlCarrito(producto) {
    if (!carrito.find(p => p.id === producto.id)) {
        carrito.push(producto);
        guardarCarrito();
        console.log("Agregado al carrito:", producto);
    }
}

function eliminarDelCarrito(producto) {
    carrito = carrito.filter(p => p.id !== producto.id);
    guardarCarrito();
    console.log("Eliminado del carrito:", producto);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

function estaEnCarrito(id) {
    return carrito.some(p => p.id === id);
}

async function init() {
    const datos = await ingresarMercaderia(url);
    const productosCombinados = combinarProductos(datos);
    filtrar(productosCombinados);

    tipoSelect.addEventListener("change", () => filtrar(productosCombinados));
    marcaSelect.addEventListener("change", () => filtrar(productosCombinados));
    modeloSelect.addEventListener("change", () => filtrar(productosCombinados));
    minPriceInput.addEventListener("input", () => filtrar(productosCombinados));
    maxPriceInput.addEventListener("input", () => filtrar(productosCombinados));
    ordenarSelect.addEventListener("change", () => filtrar(productosCombinados));
    searchInput.addEventListener("input", () => filtrar(productosCombinados));

}

init();




function mostrarAlerta(nombre, precio) {
const alerta = document.getElementById("alerta-carrito");
const contenido = document.getElementById("alerta-contenido");

contenido.textContent = `Producto añadido: ${nombre} - $${precio}`;
alerta.style.display = "block";

// Ocultar automáticamente a los 3 segundos
setTimeout(() => {
    alerta.style.display = "none";
}, 3000);
}

function ocultarAlerta() {
document.getElementById("alerta-carrito").style.display = "none";
}

// Evento para detectar clicks en botones de agregar
document.addEventListener("click", function (e) {
if (e.target.classList.contains("btn-agregar")) {
    const card = e.target.closest(".card");
    const nombre = card.querySelector("h5").textContent.replace("Modelo: ", "");
    const precio = card.querySelector(".text-primary").textContent.replace("Precio: $", "");

    mostrarAlerta(nombre, precio);
}
});