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
  tbody.innerHTML = '';

  ventas.forEach((venta, index) => {
    // Combinar los productos en un string
    const productos = venta.detalle_venta.map(detalle => {
      return `${detalle.tipo_producto} (${detalle.cantidad})`;
    }).join(', ');

    // Combinar los precios unitarios
    const precios = venta.detalle_venta.map(detalle => {
      return `$${detalle.precio_unitario}`;
    }).join(', ');

    // Calcular totales
    const totalCantidad = venta.detalle_venta.reduce((sum, d) => sum + d.cantidad, 0);
    const totalVenta = venta.detalle_venta.reduce((sum, d) => sum + d.subtotal, 0);

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${venta.nombre_cliente}</td>
      <td>${productos}</td>
      <td>${totalCantidad}</td>
      <td>${precios}</td>
      <td>$${totalVenta}</td>
      <td>${new Date(venta.fecha_venta).toLocaleDateString()}</td>
    `;
    tbody.appendChild(fila);
  });
}
function mostrarMensaje(texto, clase) {
  tbody.innerHTML = `
    <tr>
      <td colspan="7" class="text-center ${clase}">${texto}</td>
    </tr>
  `;
}
