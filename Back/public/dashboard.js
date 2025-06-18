// Paginación
let currentPage = 1;
const itemsPerPage = 8;
let allProducts = [];

// Filtros existentes en el HTML
const tipoFiltro = document.getElementById("brands");
const marcaFiltro = document.getElementById("types");
const minPrecioInput = document.querySelector(".minPrice");
const maxPrecioInput = document.querySelector(".maxPrice");

// Contenedor para paginación
const paginacionContainer = document.getElementById("pagination");

// 🌙 MODO NOCHE
const modoBtn = document.getElementById("modoNocheBtn");
if (modoBtn) {
  const modoActual = localStorage.getItem("modo") || "dia";
  document.body.classList.toggle("dark-mode", modoActual === "noche");
  modoBtn.textContent = modoActual === "noche" ? "☀️" : "🌙";

  modoBtn.addEventListener("click", () => {
    const esNoche = document.body.classList.toggle("dark-mode");
    localStorage.setItem("modo", esNoche ? "noche" : "dia");
    modoBtn.textContent = esNoche ? "☀️" : "🌙";
  });
}

// FETCH LLANTAS
fetch('/api/llanta')
  .then(res => res.json())
  .then(data => {
    const productos = data.map(l => ({
      ...l,
      tipo: "llanta",
      nombre: l.nombreLLanta
    }));
    allProducts.push(...productos);
    renderProductos();
    renderPaginacion();
  });

// FETCH NEUMÁTICOS
fetch('/api/neumatico')
  .then(res => res.json())
  .then(data => {
    const productos = data.map(n => ({
      ...n,
      tipo: "neumatico",
      nombre: n.modelo
    }));
    allProducts.push(...productos);
    renderProductos();
    renderPaginacion();
  });

// Eventos para filtros
[tipoFiltro, marcaFiltro, minPrecioInput, maxPrecioInput].forEach(filtro => {
  if (filtro) {
    filtro.addEventListener("change", () => {
      currentPage = 1;
      renderProductos();
      renderPaginacion();
    });
  }
});

// Función para aplicar filtros
function filtrarProductos() {
  const tipo = tipoFiltro?.value;
  const marca = marcaFiltro?.value;
  const min = parseFloat(minPrecioInput?.value) || 0;
  const max = parseFloat(maxPrecioInput?.value) || Infinity;

  return allProducts.filter(p =>
    (tipo === "Todos" || p.tipo === tipo) &&
    (marca === "Todos" || p.marca === marca) &&
    p.precio >= min &&
    p.precio <= max
  );
}

// Renderizado de productos
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
          <button class="btn btn-outline-danger btn-sm btn-editar">Editar</button>
          <button class="btn btn-outline-success btn-sm btn-toggle">Activar/Desactivar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);

    // Asignar eventos a los botones del card
    const btnEditar = card.querySelector(".btn-editar");
    const btnToggle = card.querySelector(".btn-toggle");

    btnEditar.addEventListener("click", () => {
      console.log(`Editar producto con ID: ${producto.id} y tipo: ${producto.tipo}`);
    });

    btnToggle.addEventListener("click", () => {
      activarProducto(producto.id, producto.tipo);
    });
  });
}

// Paginación
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

// Activar/desactivar producto (simulado)
function activarProducto(id, tipo) {
  console.log(`Activar/Desactivar producto con ID: ${id} y tipo: ${tipo}`);
  // Aquí podrías hacer un fetch PUT o PATCH al backend
}
