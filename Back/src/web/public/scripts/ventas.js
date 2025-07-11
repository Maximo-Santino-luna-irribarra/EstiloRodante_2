const tbody = document.getElementById('ventas-body');
const ordenarSelect = document.getElementById('ordenar');
let ventasGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarVentas();
  ordenarSelect.addEventListener('change', manejarOrdenamiento);
});

async function cargarVentas() {
  try {
    const res = await fetch('/api/ventas');
    if (!res.ok) throw new Error("Error en la carga");

    const ventas = await res.json();
    console.log('Ventas cargadas:', ventas);

    if (!ventas.length) {
      mostrarMensaje('No hay ventas registradas.', 'text-muted');
      return;
    }

    ventasGlobal = ventas;
    renderizarVentas(ventasGlobal);
  } catch (error) {
    console.error('Error al cargar ventas:', error);
    mostrarMensaje('Error al cargar los datos.', 'text-danger');
  }
}

function manejarOrdenamiento() {
  const criterio = ordenarSelect.value;
  const ventasOrdenadas = [...ventasGlobal];

  const comparadores = {
    'mas-reciente': (a, b) => new Date(b.fecha_venta) - new Date(a.fecha_venta),
    'mas-viejo': (a, b) => new Date(a.fecha_venta) - new Date(b.fecha_venta)
  };

  if (comparadores[criterio]) ventasOrdenadas.sort(comparadores[criterio]);
  renderizarVentas(ventasOrdenadas);
}

function renderizarVentas(ventas) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  ventas.forEach((venta) => {
    if (!venta.detalles) return;

   
    const productosHTML = venta.detalles.map(detalle => {
      const producto = detalle.Producto;
      const nombre = producto?.nombre || 'Producto';
      const marca = producto?.marca || 'Sin marca';
      const cantidad = detalle.cantidad;
      const precio = detalle.precio_unitario;

      return `<div><strong>${nombre}</strong> (${cantidad} x $${precio}) - ${marca}</div>`;
    }).join('');

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${venta.nombre_cliente}</td>
      <td>${venta.fecha_venta?.slice(0, 10) || ''}</td>
      <td>${productosHTML}</td>
    `;
    tbody.appendChild(fila);
  });
}


function mostrarMensaje(texto, clase) {
  tbody.innerHTML = `
    <tr>
      <td colspan="5" class="text-center ${clase}">${texto}</td>
    </tr>
  `;
}
