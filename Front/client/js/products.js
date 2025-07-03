// ========== VARIABLES ==========
const contenedorProductos = document.querySelector(".box");
const paginacion = document.getElementById("pagination");
const modoBtn = document.getElementById("modoNocheBtn");

const tipoSelect    = document.querySelector('select[name="type"]');
const marcaSelect   = document.querySelector('select[name="brands"]');
const modeloSelect  = document.querySelector('select[name="models"]');
const minPriceInput = document.querySelector(".minPrice");
const maxPriceInput = document.querySelector(".maxPrice");
const ordenarSelect = document.getElementById("ordenar");
const searchInput   = document.querySelector('input[type="text"]');

const productosPorPagina = 12;
let paginaActual = 1;
let totalProductos = 0;
let productos = [];

// ========== MODO OSCURO ==========
const modoActual = localStorage.getItem("modo") || "dia";
document.body.classList.toggle("dark-mode", modoActual === "noche");
modoBtn.textContent = modoActual === "noche" ? "☀️" : "🌙";

modoBtn.addEventListener("click", () => {
  const esNoche = document.body.classList.toggle("dark-mode");
  localStorage.setItem("modo", esNoche ? "noche" : "dia");
  modoBtn.textContent = esNoche ? "☀️" : "🌙";
});

// ========== CARD PRODUCTO ==========
function renderCardProducto(p) {
  p.urlIMG = null
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

  col.innerHTML = `
    <div class="card h-100 shadow-sm border-0 rounded-4 d-flex flex-column justify-content-between"
         style="max-height: 320px; overflow: hidden;">
      <div class="text-center p-3">
        <img src="http://localhost:3000/${p.urlIMG || '/images/primer-plano-de-pato-de-goma.jpg'}"
             class="rounded-circle img-fluid"
             alt="${p.nombre}" style="width: 120px; height: 120px; object-fit: cover;" />
      </div>
      <div class="px-3 pb-3">
        <h5 class="fw-bold text-dark mb-1 text-center"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${p.nombre}
        </h5>
        <p class="text-muted mb-0 text-center">${p.marca}</p>
        <p class="text-primary fw-semibold fs-5 mb-2 text-center">$${p.precio}</p>
        <p class="text-center text-secondary" style="font-size: 0.9rem;">Categoría: ${p.categoria}</p>
        <div class="d-flex justify-content-between gap-2">
          <button class="btn btn-sm btn-outline-danger w-100 btn-eliminar">🗑️ Eliminar</button>
          <button class="btn btn-sm btn-outline-success w-100 btn-agregar">🛒 Agregar</button>
        </div>
      </div>
    </div>
  `;
  contenedorProductos.appendChild(col);
}

// ========== MOSTRAR PRODUCTOS ==========
function renderProductos() {
  contenedorProductos.innerHTML = "";
  if (!productos.length) {
    contenedorProductos.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }
  productos.forEach(renderCardProducto);
}

// ========== PAGINACIÓN ==========
function renderPaginacion() {
  const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
  paginacion.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === paginaActual ? "active" : ""}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.querySelector("button").addEventListener("click", () => {
      paginaActual = i;
      cargarProductos();
    });
    paginacion.appendChild(li);
  }
}

// ========== FETCH Y FILTROS ==========
async function cargarProductos() {
  const tipo = tipoSelect?.value || "Todos";
  const marca = marcaSelect?.value || "Todos";
  const modelo = modeloSelect?.value || "Todos";
  const min = parseFloat(minPriceInput?.value);
  const max = parseFloat(maxPriceInput?.value);
  const busqueda = searchInput?.value.toLowerCase().trim() || "";
  const orden = ordenarSelect?.value;

  const queryParams = new URLSearchParams({
    page: paginaActual,
    limit: productosPorPagina,
    categoria: tipo,
    marca,
    modelo,
    min,
    max,
    busqueda,
    orden
  });

  try {
    const res = await fetch(`http://localhost:3000/api/productos/paginados?${queryParams}`);
    const data = await res.json();
    productos = data.productos;
    totalProductos = data.total;
    renderProductos();
    renderPaginacion();
  } catch (err) {
    console.error("Error al cargar productos:", err);
  }
}

// ========== INIT ==========
function agregarEventos() {
  [tipoSelect, marcaSelect, modeloSelect].forEach(select => {
    if (select) select.addEventListener("change", reiniciarYBuscar);
  });
  [minPriceInput, maxPriceInput].forEach(input => {
    if (input) input.addEventListener("input", reiniciarYBuscar);
  });
  if (ordenarSelect) ordenarSelect.addEventListener("change", reiniciarYBuscar);
  if (searchInput) searchInput.addEventListener("input", reiniciarYBuscar);
}

function reiniciarYBuscar() {
  paginaActual = 1;
  cargarProductos();
}

function init() {
  agregarEventos();
  cargarProductos();
}

init();
