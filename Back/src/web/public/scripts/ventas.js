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
    const productosHTML = venta.detalle_venta.map(detalle => {
    const producto = detalle.Producto || {};
      console.log(producto)
    return `
      <div class="mb-1">
        <strong>${producto.nombre || detalle.tipo_producto || 'Producto'}</strong> 
        (${detalle.cantidad} x $${detalle.precio_unitario})<br>
        Marca: ${producto.marca || '-'} | Modelo: ${producto.modelo || '-'} | Medida: ${producto.medida || '-'}
      </div>
    `;
  }).join('')

    const totalVenta = venta.detalle_venta.reduce((sum, d) => sum + d.subtotal, 0);

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${venta.nombre_cliente}</td>
      <td>${productosHTML}</td>
      <td>$${totalVenta}</td>
      <td>${new Date(venta.fecha_venta).toLocaleDateString()}</td>
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
