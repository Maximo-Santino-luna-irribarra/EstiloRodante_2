
// Variables globales
let currentPage = 1;
const itemsPerPage = 9;
let allProducts = [];
let allBrands = [];
let totalProductos = 0;

// Elementos del DOM
const tipoFiltro = document.getElementById("brands");
const estadoFiltro = document.getElementById("estadoFiltro");
const marcaFiltro = document.getElementById("types");
const minPrecioInput = document.querySelector(".minPrice");
const maxPrecioInput = document.querySelector(".maxPrice");
const searchInput = document.querySelector(".form-control");
const paginacionContainer = document.getElementById("pagination");
const contenedorProductos = document.querySelector(".box");
const body = document.body;

// Cargar productos desde API
function cargarProductos() {
  const tipo = tipoFiltro?.value || "Todos";
  const marca = marcaFiltro?.value || "Todos";
  const estado = estadoFiltro?.value || "Todos";
  const min = parseFloat(minPrecioInput?.value);
  const max = parseFloat(maxPrecioInput?.value);
  const busqueda = searchInput?.value.toLowerCase().trim() || "";

  //Construye los parámetros de consulta (query string) que se van a enviar al backend como:
  const queryParams = new URLSearchParams({
    page: currentPage,
    limit: itemsPerPage,
    categoria: tipo,
    marca: marca,
    estado: estado,
    min,
    max,
    busqueda
  });

  fetch(`/api/productos/paginados?${queryParams}`)
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta del backend:", data);
      allProducts = data.productos;
      totalProductos = data.total;
      renderProductos();
      renderPaginacion();
    })
    .catch(err => console.error("Error cargando productos:", err));
}

// Inicializar eventos de filtros
function inicializarFiltros() {
  const filtros = [tipoFiltro, marcaFiltro, minPrecioInput, maxPrecioInput, estadoFiltro];
  filtros.forEach(filtro => {
    if (filtro) {
      filtro.addEventListener("change", actualizarVista);
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", actualizarVista);
  }
}

// Actualizar productos y paginación
function actualizarVista() {
  currentPage = 1;
  cargarProductos();
}

// Aplicar filtros


// Renderizar productos
function renderProductos() {

  contenedorProductos.innerHTML = "";
  allProducts.forEach(p => contenedorProductos.appendChild(renderCardProducto(p)));
}

// Crear tarjeta de producto
function renderCardProducto(producto) {
  const col = document.createElement("div");
  col.className = "col mb-4";

  const color_boton = producto.activo ? "btn-outline-success" : "btn-outline-secondary";
  const mensaje = producto.activo ? "Desactivar" : "Activar";

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
          <button class="btn btn-sm btn-outline-primary btn-editar w-100">✏️ Editar</button>
          <button class="btn btn-sm ${color_boton} btn-toggle w-100">${mensaje}</button>
        </div>
      </div>
    </div>
  `;

  col.querySelector(".btn-editar").addEventListener("click", () => editar(producto.id));
  col.querySelector(".btn-toggle").addEventListener("click", () => {
    mostrarModal(() => activarProducto(producto.id, producto.activo));
  });

  return col;
}

// Activar/Desactivar producto
async function activarProducto(id, activo) {
  try {
    console.log('1. Iniciando activación/desactivación del producto:', id);
    
    // Primero obtenemos el producto actual
    const getRes = await fetch(`/api/productos/${id}`);
    if (!getRes.ok) {
      console.error('2. Error al obtener el producto:', await getRes.text());
      throw new Error('No se pudo obtener el producto');
    }
    
    const productoActual = await getRes.json();
    console.log('3. Producto obtenido:', productoActual);
    
    const nuevoEstado = !activo;
    console.log('4. Nuevo estado a aplicar:', nuevoEstado);
    
    const datosActualizacion = {
      ...productoActual,
      activo: nuevoEstado
    };
    console.log('5. Datos que se enviarán en la actualización:', datosActualizacion);
    
    // Actualizamos solo cambiando el estado activo
    const res = await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosActualizacion)
    });

    console.log('6. Respuesta del servidor status:', res.status);
    const responseText = await res.text();
    console.log('7. Respuesta del servidor body:', responseText);

    if (!res.ok) {
      throw new Error(responseText || 'Error al actualizar el producto');
    }

    // Actualiza estado en allProducts
    const producto = allProducts.find(p => p.id === id || p.id === Number(id));
    if (producto) {
      const oldData = {...producto};
      producto.activo = nuevoEstado;
      console.log('8. Datos del producto antes de actualizar:', oldData);
      console.log('9. Datos del producto después de actualizar:', producto);
    }

    renderProductos();
    renderPaginacion();
  } catch (err) {
    console.error('10. Error en el proceso:', err);
    alert('Error al cambiar el estado del producto: ' + err.message);
  }
}
// Redirección a edición
function editar(id) {
  window.location.href = `/editar/${id}`;
}

// Modal de confirmación
function mostrarModal(onConfirmar) {
  const modal = document.getElementById('modal');
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
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add('show');

  const cerrar = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove('show');
  };

  modal.querySelector('#cancelarModal').addEventListener('click', cerrar);
  modal.querySelector('#confirmarCambios').addEventListener('click', () => {
    if (typeof onConfirmar === 'function') onConfirmar();
    cerrar();
  });
  modal.querySelector('.btn-close')?.addEventListener('click', cerrar);
}

// Renderizar paginación
function renderPaginacion() {
  const totalPaginas = Math.ceil(totalProductos / itemsPerPage);
  paginacionContainer.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.querySelector("button").addEventListener("click", () => {
      currentPage = i;
      cargarProductos(); // recarga esa página
    });
    paginacionContainer.appendChild(li);
  }
}




// Inicialización
inicializarFiltros();
cargarProductos();
