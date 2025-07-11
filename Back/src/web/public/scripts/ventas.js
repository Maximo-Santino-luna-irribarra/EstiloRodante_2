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
      renderizarVentas(ventas);
      ventasGlobal = ventas;

    })
    .catch(error => {
      console.error('Error al cargar ventas:', error);
    });
}

function manejarOrdenamiento() {
  const criterio = ordenarSelect.value;

  if (criterio === 'mas-vendidos') {
    fetch('/api/ventas/top10Productos')
      .then(res => res.json())
      .then(data => {
        renderizarVentas(data);
      })
      .catch(err => {
        console.error('Error al cargar productos más vendidos:', err);
        mostrarMensaje('Error al obtener los productos más vendidos', 'text-danger');
      });
    return;
  }

  if (criterio === 'ventas-caras') {
    fetch('/api/top10Ventas')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        renderizarVentas(data);
      })
      .catch(err => {
        console.error('Error al cargar ventas más caras:', err);
        mostrarMensaje('Error al obtener las ventas más caras', 'text-danger');
      });
    return;
  }

  // Si no es uno de los criterios especiales, usamos el ordenamiento local
  const ventasOrdenadas = [...ventasGlobal];

  const comparadores = {
    'mas-reciente': (a, b) => new Date(b.fecha_venta) - new Date(a.fecha_venta),
    'mas-viejo': (a, b) => new Date(a.fecha_venta) - new Date(b.fecha_venta)
  };

  if (comparadores[criterio]) ventasOrdenadas.sort(comparadores[criterio]);
  renderizarVentas(ventasOrdenadas);
}

function renderizarVentas(ventas, modo = '') {
  tbody.innerHTML = '';

  ventas.forEach((venta, index) => {
    if (!venta.detalles) return;

    let contenidoProductos = '';

    if (modo === 'mas-vendidos') {
      // Mostrar solo nombre del producto y cantidad
      contenidoProductos = venta.detalles.map(detalle => {
        console.log(producto)
        const producto = detalle.producto;
        return `<div>${producto?.nombre || 'Producto'}: ${detalle.cantidad} unidades</div>`;
      }).join('');
    } else {
      // Renderizado normal
      contenidoProductos = venta.detalles.map(detalle => {
        const producto = detalle.producto;
        return `
          <div>
            ${producto?.nombre || 'Producto'} 
            (${detalle.cantidad} x $${detalle.precio_unitario}) = $${detalle.subtotal}
            - ${producto?.marca || 'Marca no especificada'}
          </div>
        `;
      }).join('');
    }

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${venta.nombre_cliente}</td>
      <td>${contenidoProductos}</td>
      <td>${modo === 'mas-vendidos' ? '-' : `$${venta.detalles.reduce((acc, d) => acc + d.subtotal, 0)}`}</td>
      <td>${venta.fecha_venta?.slice(0, 10)}</td>
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
