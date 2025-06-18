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
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

        col.innerHTML = `
        <div class="card h-100 shadow-sm border-0 rounded-4 d-flex flex-column justify-content-between">
            <div class="text-center p-3">
            <img src="primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid" style="width: 120px; height: 120px; object-fit: cover;" alt="Producto">
            </div>
            <div class="px-3 pb-3">
            <h5 class="fw-bold text-dark mb-1 text-center">${producto.nombre}</h5>
            <p class="text-muted mb-0 text-center">${producto.marca}</p>
            <p class="text-primary fw-semibold fs-5 mb-2 text-center">$${producto.precio.toLocaleString()}</p>
            <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-primary btn-editar w-100 me-2">✏️ Editar</button>
                <button class="btn btn-sm btn-outline-success btn-toggle w-100">🔁 Activar</button>
            </div>
            </div>
        </div>
        `;

        contenedor.appendChild(col);

        // Eventos de botones
        const btnEditar = col.querySelector(".btn-editar");
        const btnToggle = col.querySelector(".btn-toggle");

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



