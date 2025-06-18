// Variables de control de página y productos
let currentPage = 1;
const itemsPerPage = 8;
let allProducts = []; // Acá se guardan llantas y neumáticos combinados

// Elementos de filtros y paginación
const tipoFiltro = document.getElementById("filtroTipo");
const marcaFiltro = document.getElementById("filtroMarca");
const modeloFiltro = document.getElementById("filtroModelo");
const paginacionContainer = document.getElementById("pagination");

// 🌙 MODO NOCHE
const modoBtn = document.getElementById("modoNocheBtn");
const modoActual = localStorage.getItem("modo") || "dia";

// Aplicamos el modo guardado en localStorage al cargar la página
if (modoActual === "noche") {
    document.body.classList.add("dark-mode");
    modoBtn.textContent = "☀️";
} else {
    document.body.classList.remove("dark-mode");
    modoBtn.textContent = "🌙";
}

// Cambiar de modo (día/noche) al hacer click
modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("modo", document.body.classList.contains("dark-mode") ? "noche" : "dia");
    modoBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// 🚚 FETCH LLANTAS (NO combinado)
fetch('/api/llanta')
    .then(res => res.json())
    .then(data => {
        // Agregamos tipo y normalizamos el nombre
        const productos = data.map(l => ({
            ...l,
            tipo: "llanta",
            nombre: l.nombreLLanta
        }));
        allProducts.push(...productos); // Se suman al array general
        cargarYRenderizar();
    });

// 🚚 FETCH NEUMÁTICOS (NO combinado)
fetch('/api/neumatico')
    .then(res => res.json())
    .then(data => {
        // Agregamos tipo y normalizamos el nombre
        const productos = data.map(n => ({
            ...n,
            tipo: "neumatico",
            nombre: n.modelo
        }));
        allProducts.push(...productos); // Se suman al array general
        cargarYRenderizar();
    });

// Función principal para aplicar filtros y mostrar productos
function cargarYRenderizar() {
    cargarFiltros(allProducts);    // Carga las opciones de tipo/marca/modelo
    renderProductos();             // Muestra los productos
    renderPaginacion();           // Muestra botones de paginación
}

// 🎛️ Cargar filtros dinámicamente según los productos disponibles
function cargarFiltros(productos) {
    const tipos = ["Todos", ...new Set(productos.map(p => p.tipo))];
    const marcas = ["Todos", ...new Set(productos.map(p => p.marca))];
    const modelos = ["Todos", ...new Set(productos.map(p => p.nombre))];

    tipoFiltro.innerHTML = tipos.map(t => `<option value="${t}">${t}</option>`).join('');
    marcaFiltro.innerHTML = marcas.map(m => `<option value="${m}">${m}</option>`).join('');
    modeloFiltro.innerHTML = modelos.map(mo => `<option value="${mo}">${mo}</option>`).join('');

    // Al cambiar un filtro, reiniciamos a la página 1
    tipoFiltro.addEventListener("change", reiniciar);
    marcaFiltro.addEventListener("change", reiniciar);
    modeloFiltro.addEventListener("change", reiniciar);
}

// Reinicia la página y vuelve a renderizar
function reiniciar() {
    currentPage = 1;
    renderProductos();
    renderPaginacion();
}

// 💡 Aplica filtros seleccionados sobre el array general
function filtrarProductos() {
    const tipo = tipoFiltro.value;
    const marca = marcaFiltro.value;
    const modelo = modeloFiltro.value;

    return allProducts.filter(p =>
        (tipo === "Todos" || p.tipo === tipo) &&
        (marca === "Todos" || p.marca === marca) &&
        (modelo === "Todos" || p.nombre === modelo)
    );
}

// 🖼️ Renderizar productos de la página actual
function renderProductos() {
    const contenedor = document.querySelector(".box");
    contenedor.innerHTML = "";

    const filtrados = filtrarProductos();
    const inicio = (currentPage - 1) * itemsPerPage;
    const pagina = filtrados.slice(inicio, inicio + itemsPerPage);

    pagina.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        card.innerHTML = `
            <div class="card product-box text-center p-3 shadow rounded-4">
                <div class="product-image-wrapper mx-auto mb-3">
                    <img src="primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image">
                </div>
                <h5 class="fw-bold text-dark mb-1">Modelo: ${producto.nombre}</h5>
                <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${producto.precio}</p>
                <p class="mb-3">Marca: ${producto.marca}</p>
                <div class="d-flex justify-content-end gap-2 mt-auto">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar">Editar</button>
                    <button class="btn btn-outline-success btn-sm btn-agregar">Activar/Desactivar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// 🔢 Renderizar paginación con botones
function renderPaginacion() {
    const totalItems = filtrarProductos().length;
    const totalPaginas = Math.ceil(totalItems / itemsPerPage);
    paginacionContainer.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<button class="page-link">${i}</button>`;
        li.querySelector("button").addEventListener("click", () => {
            currentPage = i;
            renderProductos();
            renderPaginacion();
        });
        paginacionContainer.appendChild(li);
    }
}
