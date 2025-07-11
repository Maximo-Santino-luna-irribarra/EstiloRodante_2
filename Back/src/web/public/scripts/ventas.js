const tbody = document.getElementById('ventas-body');
const ordenarSelect = document.getElementById('ordenar');
let ventasGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarVentas();
  ordenarSelect.addEventListener('change', manejarOrdenamiento);
});

function cargarVentas() {
  fetch('/api/ventas')
    .then(res => res.json())
    .then(ventas => {
      console.log('Ventas cargadas:', ventas);
      renderizarVentas(ventas);
      ventasGlobal = ventas;

    })
    .catch(error => {
      console.error('Error al cargar ventas:', error);
    });
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
    if (!venta.detalles) return;

   
    const totalVenta = venta.detalles.reduce((acc, detalle) => acc + detalle.subtotal, 0);

    const productosHTML = venta.detalles.map(detalle => {
      const producto = detalle.producto;

      return `
        <div>
          ${producto?.nombre || 'Producto'}
          (${detalle.cantidad} x $${detalle.precio_unitario}) = $${detalle.subtotal}
          - ${producto?.marca || 'Marca no especificada'}
        </div>
      `;
    }).join('');

    // Crear fila
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${venta.nombre_cliente}</td>
      <td>${productosHTML}</td>
      <td>$${totalVenta}</td>
      <td>${venta.fecha_venta?.slice(0, 10)}</td>
    `;
    tbody.appendChild(fila);
  
  })}

function mostrarMensaje(texto, clase) {
  tbody.innerHTML = `
    <tr>
      <td colspan="5" class="text-center ${clase}">${texto}</td>
    </tr>
  `;
}
