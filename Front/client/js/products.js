// ==============================
// VARIABLES GLOBALES
// ==============================
const tipoSelect = document.getElementById("types");
const marcaSelect = document.querySelector('select[name="brands"]'); // ✅ Usar el select correcto
const modeloSelect = document.querySelector('select[name="models"]');
const minPriceInput = document.querySelector(".minPrice");
const maxPriceInput = document.querySelector(".maxPrice");
const ordenarSelect = document.getElementById("ordenar");
const searchInput = document.querySelector('input[type="text"]');
const contenedorProductos = document.querySelector(".box");
const modoBtn = document.getElementById("modoNocheBtn");

const allProducts = [];
const productosPorPagina = 12;
let paginaActual = 1;
let productosFiltrados = [];
let carrito = cargarCarrito();
let itemsTotales = 0;
let allBrands = [];


const modoActual = localStorage.getItem("modo") || "dia";

if (modoActual === "noche") {
    document.body.classList.add("dark-mode");
    modoBtn.textContent = "☀️";
} else {
    document.body.classList.remove("dark-mode");
    modoBtn.textContent = "🌙";
}

modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("modo", "noche");
        modoBtn.textContent = "☀️";
        document.documentElement.style.setProperty('--color-fondo', '#222222');
    } else {
        localStorage.setItem("modo", "dia");
        modoBtn.textContent = "🌙";
    }
});

const writeneumatico = (neumatico) => {
    const { id, marca, modelo, precio, nombre, urlIMG } = neumatico;

    const product = document.createElement("div");
    product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    product.innerHTML = `
    <div class="card product-box text-center p-3 shadow rounded-4">
        <div class="product-image-wrapper mx-auto mb-3">
            <img src="${urlIMG}" class="rounded-circle img-fluid product-image" alt="${modelo}">
        </div>
        <h5 class="fw-bold mb-1">Modelo: ${nombre}</h5>
        <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
        <p class="mb-3">Marca: ${marca}</p>
        <div class="d-flex justify-content-end gap-2 mt-auto">
            <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
            <button class="btn btn-outline-success btn-sm btn-agregar">Agregar al carrito</button>
        </div>
    </div>`;

    const btnAgregar = product.querySelector(".btn-agregar");
    const btnEliminar = product.querySelector(".btn-eliminar");

    btnAgregar.addEventListener("click", () => agregarAlCarrito(neumatico));
    btnEliminar.addEventListener("click", () => eliminarDelCarrito(neumatico));

    contenedorProductos.appendChild(product);
};

const writeLlanta = (llanta) => {
    const { id, nombre, marca, modelo, precio, urlIMG } = llanta;

    const product = document.createElement("div");
    product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    product.innerHTML = `
    <div class="card product-box text-center p-3 shadow rounded-4">
        <div class="product-image-wrapper mx-auto mb-3">
            <img src="${urlIMG}" class="rounded-circle img-fluid product-image" alt="${modelo}">
        </div>
        <h5 class="fw-bold mb-1">Modelo: ${nombre}</h5>
        <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
        <p class="mb-3">Marca: ${marca}</p>
        <div class="d-flex justify-content-end gap-2 mt-auto">
            <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
            <button class="btn btn-outline-success btn-sm btn-agregar">Agregar al carrito</button>
        </div>
    </div>`;

    const btnAgregar = product.querySelector(".btn-agregar");
    const btnEliminar = product.querySelector(".btn-eliminar");

    btnAgregar.addEventListener("click", () => agregarAlCarrito(llanta));
    btnEliminar.addEventListener("click", () => eliminarDelCarrito(llanta));

    contenedorProductos.appendChild(product);
};

function mostrarProductos(pagina) {
    contenedorProductos.innerHTML = "";

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);
    
    if (productosPagina.length === 0) {
        contenedorProductos.innerHTML = "<p>No hay productos para mostrar.</p>"; 
        return; 
    }
    productosPagina.forEach((producto) => {
        if (producto.tipo === "llanta") {
            writeLlanta(producto);
        } else if (producto.tipo === "neumatico") {
            writeneumatico(producto);
            console.log(producto)
        }
    });
}

function ingresarMarcas() {
    const marcaFiltro = document.querySelector('select[name="brands"]');

    if (!marcaFiltro) return;

    marcaFiltro.innerHTML = `<option value="Todos">Todos</option>`;

    const primeras = allBrands.slice(0, 5);
    const ultimas = allBrands.slice(-5);

    const marcasUnicas = [...new Set([...primeras, ...ultimas])];

    marcasUnicas.forEach(marca => {
        if (!marca) return;
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaFiltro.appendChild(option);
    });
}




function generarPaginacion() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina); 
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


function filtrar(productos) {

    const tipo = tipoSelect.value;
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    const min = parseFloat(minPriceInput.value);
    const max = parseFloat(maxPriceInput.value);
    const busqueda = searchInput.value.toLowerCase();
    const orden = ordenarSelect.value;

    contenedorProductos.innerHTML = "";

    let filtrados = productos.filter(p => p.activo === true);
    if (tipo !== "Todos") {
        filtrados = filtrados.filter(p => {
            if (tipo === "cubierta") return p.tecnologia != null; 
            if (tipo === "Rin") return p.material != null;         
            return true;
        });
    }
    if (marca !== "Todos") filtrados = filtrados.filter(p => p.marca.toLowerCase() === marca.toLowerCase());
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

    console.log("Productos filtrados re anashe mal:", productosFiltrados); 
    paginaActual = 1;
    
    mostrarProductos(paginaActual);
    generarPaginacion();
 
}


function agregarAlCarrito(producto) {
    if (!productoExisteEnCarrito(producto)) {
        carrito.push(producto);
        guardarCarrito();
        actualizarContadorasaide();
        mostrarAlerta(producto.nombre, producto.precio);
        console.log("Agregado al carrito:", producto);
    } else {
        mostrarAlertaRepetido();
        console.log("El producto ya está en el carrito:", producto);
    }
}

function eliminarDelCarrito(producto) {
    carrito = carrito.filter(p => p.id !== producto.id);
    guardarCarrito();
    actualizarContadorasaide();
    mostrarAlertaEliminado();
    console.log("Eliminado del carrito:", producto);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

function productoExisteEnCarrito(producto) {
    return carrito.some(p => p.id === producto.id);
}

function actualizarContadorasaide() {
    const contadorSpan = document.getElementById("cart-count"); 
    if (contadorSpan) {
        contadorSpan.textContent = carrito.length;
    }
}


function mostrarAlerta(nombre, precio) {
    const alerta = document.getElementById("alerta-carrito");
    const contenido = document.getElementById("alerta-contenido");

    contenido.textContent = `Producto añadido: ${nombre} - $${precio}`;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}

function mostrarAlertaRepetido() {
    const alerta = document.getElementById("alerta-carrito");
    const contenido = document.getElementById("alerta-contenido");
    contenido.textContent = "Ya se ha añadido un producto al carrito";
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}

function mostrarAlertaEliminado() {
    const alerta = document.getElementById("alerta-carrito");
    const contenido = document.getElementById("alerta-contenido");

    contenido.textContent = "Producto eliminado del carrito";
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}

function ocultarAlerta() {
    document.getElementById("alerta-carrito").style.display = "none";
}

async function init() {
    try {
        const [llantas, neumaticos] = await Promise.all([
            fetch('http://localhost:5000/api/llanta').then(res => res.json()),
            fetch('http://localhost:5000/api/neumatico').then(res => res.json())
        ]);

        const llantasFormateadas = llantas.map(l => ({
            ...l,
            tipo: "llanta",
            nombre: l.nombre ?? `${l.marca} ${l.modelo} ${l.activo ? "Activo" : "Inactivo"}`
        }));

        const neumaticosFormateados = neumaticos.map(n => ({
            ...n,
            tipo: "neumatico",
            nombre: n.modelo ?? `${n.marca} ${n.medida} ${n.activo ? "Activo" : "Inactivo"}` 
        }));

        allProducts.push(...llantasFormateadas, ...neumaticosFormateados);
        
        allBrands = Array.from(new Set(allProducts.map(p => p.marca))).sort();
        ingresarMarcas();

        const params = new URLSearchParams(window.location.search);
        const tipo = params.get("tipo");
        document.getElementById("types").value = tipo || "Todos";
        marcaSelect.value = "Todos";
        modeloSelect.value = "Todos";
        minPriceInput.value = "";
        maxPriceInput.value = "";
        ordenarSelect.value = "";
        searchInput.value = "";

        filtrar(allProducts);
        
        ingresarMarcas();
        tipoSelect.addEventListener("change", () => filtrar(allProducts));
        marcaSelect.addEventListener("change", () => filtrar(allProducts));
        modeloSelect.addEventListener("change", () => filtrar(allProducts));
        minPriceInput.addEventListener("input", () => filtrar(allProducts));
        maxPriceInput.addEventListener("input", () => filtrar(allProducts));
        ordenarSelect.addEventListener("change", () => filtrar(allProducts));
        searchInput.addEventListener("input", () => filtrar(allProducts));
    } catch (error) {
        console.error("Error al cargar productos desde API:", error);
    }
}

init();

