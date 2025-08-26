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

function cargarLogs() {
  fetch('/auth/Logs')
    .then(res => res.json())
    .then(logs => {
      renderizarLogs(logs);
    })
    .catch(err => {
      console.error('Error al cargar logs:', err);
      mostrarMensaje('Error al obtener los logs', 'text-danger');
    });
}


  // Ajustar encabezados de tabla para logs
function renderizarLogs(logs) {
   
  const col2 = document.getElementById('2columna');
  const col3 = document.getElementById('3columna');
  const col4 = document.getElementById('4columna');
  const col5 = document.getElementById('5columna');
   tbody.innerHTML = '';
  if (col2) col2.textContent = 'Administrador';
  if (col3) col3.textContent = 'Email';
  if (col4) col4.textContent = 'ID Log';
  if (col5) col5.textContent = 'Fecha';


  logs.forEach((log, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${log.admin?.nombre || 'Desconocido'}</td>
      <td>${log.admin?.email || '-'}</td>
      <td>${ '-'}</td>
      <td>${log.fecha ? new Date(log.fecha).toLocaleString() : 'Sin fecha'}</td>
    `;

    tbody.appendChild(fila);
  });
}



function manejarOrdenamiento() {
  const criterio = ordenarSelect.value;

  if (criterio === 'mas-vendidos') {
    fetch('/api/ventas/top10Productos')
      .then(res => res.json())
      .then(data => {
        renderizarVentas(data, 'mas-vendidos');
      })
      .catch(err => {
        console.error('Error al cargar productos más vendidos:', err);
        mostrarMensaje('Error al obtener los productos más vendidos', 'text-danger');
      });
    return;
  }
  if (criterio === 'logs') {
    cargarLogs();
    return;
  }
  if (criterio === 'ganancia') {
    fetch('/api/ventas/top10Ventas')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        renderizarVentas(data, 'ventas-caras');
      })
      .catch(err => {
        console.error('Error al cargar ventas más caras:', err);
        mostrarMensaje('Error al obtener las ventas más caras', 'text-danger');
      });
    return;
  }

  if (criterio === 'ventas-caras') {
    const ventasOrdenadas = [...ventasGlobal];
    ventasOrdenadas.sort((a, b) => {
      const totalA = a.detalles.reduce((acc, d) => acc + d.subtotal, 0);
      const totalB = b.detalles.reduce((acc, d) => acc + d.subtotal, 0);
      return totalB - totalA;
    });
    renderizarVentas(ventasOrdenadas);
    return;
  }

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

  if (modo === 'mas-vendidos') {
    document.getElementById('2columna').textContent = 'Producto'
    document.getElementById('3columna').textContent = 'Marca'
    ventas.forEach((item, index) => {
      const producto = item.producto;
      const totalVendido = item.totalVendido;

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${producto?.nombre || 'Producto'}</td>
        <td>${producto?.marca || 'Marca no especificada'}</td>
        <td>${totalVendido} unidades</td>
        <td>${item.fecha_venta}</td>
      `;
      tbody.appendChild(fila);
    });
    return;
  }
  if (modo === 'ventas-caras') {
    document.getElementById('2columna').textContent = 'Producto';
    document.getElementById('3columna').textContent = 'Marca';

    ventas.forEach((item, index) => {
      const producto = item.producto;
      const totalGanancia = item.total_ganancia;

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${producto?.nombre || 'Producto'}</td>
        <td>${producto?.marca || 'Marca no especificada'}</td>
        <td>$${Number(totalGanancia).toLocaleString()}</td>
        <td>${item.fecha_venta}</td>
      `;
      tbody.appendChild(fila);
    });
    return;
  }

  document.getElementById('2columna').textContent = 'Cliente'
  document.getElementById('3columna').textContent = 'Productos'
  ventas.forEach((venta, index) => {
    let contenidoProductos = (venta.detalles ?? []).map(detalle => {
      const producto = detalle.producto;
      return `
        <div>
          ${producto?.nombre || 'Producto'} 
          (${detalle.cantidad} x $${detalle.precio_unitario}) = $${detalle.subtotal}
          - ${producto?.marca || 'Marca no especificada'}
        </div>
      `;
    }).join('');

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${venta.nombre_cliente}</td>
      <td>${contenidoProductos}</td>
      <td>$${venta.detalles.reduce((acc, d) => acc + d.subtotal, 0)}</td>
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


