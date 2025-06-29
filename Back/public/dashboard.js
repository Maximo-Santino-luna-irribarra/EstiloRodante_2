
// Paginación
let currentPage = 1;
const itemsPerPage = 8;
let allProducts = [];
let allBrands = [];

// Filtros existentes en el HTML
const tipoFiltro = document.getElementById("brands");
const estadoFiltro = document.getElementById("estadoFiltro");
const marcaFiltro = document.getElementById("types");
const minPrecioInput = document.querySelector(".minPrice");
const maxPrecioInput = document.querySelector(".maxPrice");

// Contenedor para paginación
const paginacionContainer = document.getElementById("pagination");

// 🌙 MODO NOCHE
const toggleBtn = document.getElementById('modoNocheBtn');
    const body = document.body;

    const setTheme = (theme) => {
      body.classList.remove('light-mode', 'dark-mode');
      body.classList.add(theme);
      toggleBtn.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
      localStorage.setItem('theme', theme);
    };

    toggleBtn.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
      setTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    setTheme(savedTheme);

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
    allBrands.push(...new Set(productos.map(p => p.marca)));
    renderProductos();
    renderPaginacion();
    ingresarMarcas()
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
    ingresarMarcas()
  });

// Eventos para filtros
[tipoFiltro, marcaFiltro, minPrecioInput, maxPrecioInput,estadoFiltro].forEach(filtro => {
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
  const estado = estadoFiltro?.value || "Todos";
  const min = parseFloat(minPrecioInput?.value) || 0;
  const max = parseFloat(maxPrecioInput?.value) || Infinity;

  return allProducts.filter(p =>
    (tipo === "Todos" || p.tipo === tipo) &&
    (marca === "Todos" || p.marca === marca) &&
    (
      estado === "Todos" ||
      (estado === "Activo" && p.activo === true) ||
      (estado === "Desactivado" && p.activo === false)
    ) &&
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
        col.className = "col mb-4";
        const color_boton = producto.activo === true ? "btn-outline-success" : "btn-outline-secondary";
        const mensaje = producto.activo === true ? "Desactivar" : "Activar";
        col.innerHTML = `
        <div class="card h-100 shadow-sm border-0 rounded-4 d-flex flex-column justify-content-between"
      style="height: 100%; max-height: 320px; overflow: hidden;">
          <div class="text-center p-3">
            <img src="${producto.urlIMG || 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'}"
                class="rounded-circle img-fluid"
                alt="Producto"
                style="width: 120px; height: 120px; object-fit: cover;" />
          </div>
          <div class="px-3 pb-3">
            <h5 class="fw-bold text-dark mb-1 text-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${producto.nombre}
            </h5>
            <p class="text-muted mb-0 text-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${producto.marca}
            </p>
            <p class="text-primary fw-semibold fs-5 mb-2 text-center">
              $${producto.precio}
            </p>
            <div class="d-flex justify-content-between gap-2">
              <button class="btn btn-sm btn-outline-primary btn-editar w-100" onClick="editar('${producto.id}')">
                ✏️ Editar
              </button>
              <button class="btn btn-sm ${color_boton} btn-toggle w-100"
                data-id="${producto.id}"
                data-tipo="${producto.tipo}"
                data-activo="${producto.activo}">
                ${mensaje}
              </button>
            </div>
          </div>
      </div>
        `;

        contenedor.appendChild(col);

        // Eventos de botones
        const btnEditar = col.querySelector(".btn-editar");
        const btnToggle = col.querySelector(".btn-toggle");

        btnEditar.addEventListener("click", () => {
            editar(producto.id, producto.tipo);
        });

        btnToggle.addEventListener("click", () => {
            mostrarModal(() => {
      activarProducto(producto.id, producto.tipo, producto.activo);
    });
           
              
                
              
        

        });
    });
}

const editar = (e, f) => {
  window.location.href = `/editar/${e}?tipo=${f}`;
}

const activarProducto = (id, tipo, activo) => {
  const nuevoEstado = !activo;
  fetch(`/api/${tipo}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ activo: nuevoEstado })
  })
  .then(response => {
    if (response.ok) {
      const producto = allProducts.find(p => p.id === id && p.tipo === tipo);
      if (producto) producto.activo = nuevoEstado;
      renderProductos();
      renderPaginacion();
    } else {
      console.error('Error al activar/desactivar el producto');
    }
  })
  .catch(error => console.error('Error en la solicitud:', error));
};



function mostrarModal(onConfirmar) {
  const modal = document.getElementById('modal');

  // Asegurarse de que exista
  if (!modal) return;

  modal.querySelector('.modal-title').textContent = 'Confirmar Cambios';
  modal.querySelector('.modal-body').innerHTML = `
    <p>¿Estás seguro de que deseas cambiar el estado del producto?</p>
    <p>Este cambio afectará la visibilidad del producto en la tienda.</p>
  `;

  modal.querySelector('.modal-footer').innerHTML = `
    <button type="button" class="btn btn-secondary" id="cancelarModal">Cancelar</button>
    <button type="button" class="btn btn-primary" id="confirmarCambios">Confirmar</button>
  `;

  modal.style.display = 'block';
  modal.classList.add('show');

  // Cierre del modal
  const cerrar = () => {
    modal.style.display = 'none';
    modal.classList.remove('show');
  };

  // Cancelar
  modal.querySelector('#cancelarModal').addEventListener('click', cerrar);

  // Confirmar
  modal.querySelector('#confirmarCambios').addEventListener('click', () => {
    if (typeof onConfirmar === 'function') onConfirmar();
    cerrar();
  });

  // Botón X
  modal.querySelector('.btn-close')?.addEventListener('click', cerrar);
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

function ingresarMarcas(){
  const marcaFiltro = document.querySelector(".form-select");
  
  if (marcaFiltro) {
    marcaFiltro.innerHTML = `<option value="Todos">Todos</option>`;
    for (let index = 0; index < 5; index++) {
      const marca = allBrands[index];
      if(!marca) continue;
      const option = document.createElement("option");
      option.value = marca;
      option.textContent = marca;
      marcaFiltro.appendChild(option);
    }
    for (let index = allBrands.length; index > allBrands.length - 5; index--) {
      const marca = allBrands[index];
      if(!marca) continue; // Evitar marcas vacías
      const option = document.createElement("option");
      option.value = marca;
      option.textContent = marca;
      marcaFiltro.appendChild(option);
    }
  }
}
