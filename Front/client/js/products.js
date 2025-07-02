// ==============================
// VARIABLES GLOBALES
// ==============================
const tipoSelect    = document.getElementById("types");
const marcaSelect   = document.querySelector('select[name="brands"]');
const modeloSelect  = document.querySelector('select[name="models"]');
const minPriceInput = document.querySelector(".minPrice");
const maxPriceInput = document.querySelector(".maxPrice");
const ordenarSelect = document.getElementById("ordenar");
const searchInput   = document.querySelector('input[type="text"]');
const contenedorProductos = document.querySelector(".box");
const modoBtn       = document.getElementById("modoNocheBtn");

const allProducts = [];
const productosPorPagina = 12;
let paginaActual = 1;
let productosFiltrados = [];
let carrito = cargarCarrito();
let allBrands = [];

// ------------------------------
// MODO OSCURO
// ------------------------------
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

// ==============================
// RENDERIZACIÓN DE PRODUCTOS
// ==============================
const writeProducto = (producto) => {
  const { id, nombre, marca, categoria, modelo, urlIMG, precio, activo } = producto;
  const product = document.createElement("div");
  product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
  product.innerHTML = `
    <div class="card product-box text-center p-3 shadow rounded-4">
      <div class="product-image-wrapper mx-auto mb-3">
        <img src="${urlIMG}" class="rounded-circle img-fluid product-image" alt="${modelo}">
      </div>
      <h5 class="fw-bold mb-1">${nombre}</h5>
      <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
      <p class="mb-3">Marca: ${marca}</p>
      <p class="mb-3">Categoría: ${categoria}</p>
      <div class="d-flex justify-content-end gap-2 mt-auto">
        <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
        <button class="btn btn-outline-success btn-sm btn-agregar">Agregar al carrito</button>
      </div>
    </div>`;

  product.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));
  product.querySelector(".btn-eliminar").addEventListener("click", () => eliminarDelCarrito(producto));
  contenedorProductos.appendChild(product);
};

function mostrarProductos(pagina) {
  contenedorProductos.innerHTML = "";
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productosFiltrados.slice(inicio, fin);
  if (!productosPagina.length) {
    contenedorProductos.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }
  productosPagina.forEach(writeProducto);
}

// ==============================
// FILTRADO & PAGINACIÓN
// ==============================
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
  let filtrados = productos.filter(p => p.activo);
  const tipo  = tipoSelect.value;
  const marca = marcaSelect.value;
  const modelo= modeloSelect.value;
  const min   = parseFloat(minPriceInput.value);
  const max   = parseFloat(maxPriceInput.value);
  const busq  = searchInput.value.toLowerCase();
  const orden = ordenarSelect.value;

  if (tipo !== "Todos")   filtrados = filtrados.filter(p => p.categoria.toLowerCase() === tipo.toLowerCase());
  if (marca !== "Todos")  filtrados = filtrados.filter(p => p.marca.toLowerCase() === marca.toLowerCase());
  if (modelo !== "Todos") filtrados = filtrados.filter(p => p.modelo === modelo);
  if (!isNaN(min))          filtrados = filtrados.filter(p => p.precio >= min);
  if (!isNaN(max))          filtrados = filtrados.filter(p => p.precio <= max);
  if (busq)                 filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(busq));

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

// ==============================
// SELECTS DINÁMICOS
// ==============================
function ingresarMarcas() {
  marcaSelect.innerHTML = `<option value="Todos" select>Todos</option>`;
  allBrands.slice(0,5).concat(allBrands.slice(-5)).filter(Boolean)
    .forEach(m => {
      const opt = document.createElement("option");
      opt.value = m; opt.textContent = m;
      marcaSelect.appendChild(opt);
    });
}

function ingresarTipos() {
  tipoSelect.innerHTML = `<option value="Todos">Todos</option>`;
  [...new Set(allProducts.map(p => p.categoria))]
    .filter(Boolean).sort()
    .forEach(c => {
      const opt = document.createElement("option");
      opt.value = c; opt.textContent = c;
      tipoSelect.appendChild(opt);
    });
}

function ingresarModelos(productos) {
  modeloSelect.innerHTML = `<option value="Todos">Todos</option>`;
  [...new Set(
    productos
      .filter(p => tipoSelect.value==='Todos' || p.categoria===tipoSelect.value)
      .filter(p => marcaSelect.value==='Todos' || p.marca===marcaSelect.value)
      .map(p => p.modelo)
  )].sort().forEach(m => {
    if (m) {
      const opt = document.createElement("option");
      opt.value = m; opt.textContent = m;
      modeloSelect.appendChild(opt);
    }
  });
}

// ==============================
// CARRITO & ALERTAS
// ==============================
function agregarAlCarrito(producto) {
  if (!carrito.some(p => p.id===producto.id)) {
    carrito.push(producto);
    guardarCarrito();
    actualizarContadorasaide();
    mostrarAlerta(producto.nombre);
  } else mostrarAlertaRepetido();
}
function eliminarDelCarrito(producto) {
  carrito = carrito.filter(p => p.id!==producto.id);
  guardarCarrito();
  actualizarContadorasaide();
  mostrarAlertaEliminado();
}
function guardarCarrito() { localStorage.setItem("carrito", JSON.stringify(carrito)); }
function cargarCarrito() { return JSON.parse(localStorage.getItem("carrito")) || []; }

function actualizarContadorasaide() {
  const span = document.getElementById("cart-count");
  if (span) span.textContent = carrito.length;
}

function mostrarAlerta(msg) {
  const alerta = document.getElementById("alerta-carrito");
  const contenido = document.getElementById("alerta-contenido");
  contenido.textContent = `Producto ${msg}`;
  alerta.style.display = "block";
  setTimeout(() => alerta.style.display = "none", 3000);
}
function mostrarAlertaRepetido() { mostrarAlerta("repetido"); }
function mostrarAlertaEliminado()  { mostrarAlerta("eliminado"); }

// ==============================
// INIT
// ==============================
async function init() {
  try {
    const productos = await fetch("http://localhost:3000/api/productos").then(res => res.json());
    allProducts.push(...productos);
    allBrands = Array.from(new Set(allProducts.map(p => p.marca))).sort();
    ingresarMarcas();
    ingresarTipos();
    ingresarModelos(allProducts);
    // Valores por defecto
    tipoSelect.value = new URLSearchParams(window.location.search).get("tipo") || "Todos";
    marcaSelect.value = "Todos";
    modeloSelect.value = "Todos";
    minPriceInput.value = "";
    maxPriceInput.value = "";
    ordenarSelect.value = "";
    searchInput.value = "";
    // Listeners
    tipoSelect.addEventListener("change", () => { ingresarModelos(allProducts); filtrar(allProducts); });
    marcaSelect.addEventListener("change", () => { ingresarModelos(allProducts); filtrar(allProducts); });
    modeloSelect.addEventListener("change", () => filtrar(allProducts));
    minPriceInput.addEventListener("input", () => filtrar(allProducts));
    maxPriceInput.addEventListener("input", () => filtrar(allProducts));
    ordenarSelect.addEventListener("change", () => filtrar(allProducts));
    searchInput.addEventListener("input", () => filtrar(allProducts));
    // Primera carga
    filtrar(allProducts);
  } catch (err) {
    console.error("Error al cargar productos:", err);
  }
}

init();
