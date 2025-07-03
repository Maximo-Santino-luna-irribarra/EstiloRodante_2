const tbody = document.getElementById('ventas-body');
const ordenarSelect = document.getElementById('ordenar');
let ventasGlobal = []; // Guardamos los datos para poder ordenarlos luego

fetch('/api/ventas')
  .then(res => res.json())
  .then(ventas => {
    console.log('Ventas cargadas:', ventas);

    if (ventas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay ventas registradas.</td></tr>';
      return;
    }

    ventasGlobal = ventas; 
    renderizarVentas(ventasGlobal); 
  })
  .catch(err => {
    console.error('Error al cargar ventas:', err);
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error al cargar los datos.</td></tr>';
  });

ordenarSelect.addEventListener('change', () => {
  const criterio = ordenarSelect.value;
  const ventasOrdenadas = [...ventasGlobal];

switch (criterio) {
    case 'precio-asc':
        ventasOrdenadas.sort((a, b) => a.precio_unitario - b.precio_unitario);
        break;
    case 'precio-desc':
        ventasOrdenadas.sort((a, b) => b.precio_unitario - a.precio_unitario);
        break;
    case 'mas-reciente':
        ventasOrdenadas.sort((a, b) => new Date(b.fecha_venta) - new Date(a.fecha_venta));
        break;
    case 'mas-viejo':
        ventasOrdenadas.sort((a, b) => new Date(a.fecha_venta) - new Date(b.fecha_venta));
        break;
    }

    renderizarVentas(ventasOrdenadas);
    });

function renderizarVentas(ventas) {
  tbody.innerHTML = '';
  ventas.forEach(venta => {
    const fila = `
    <tr>
        <td>${venta.id}</td>
        <td>${venta.nombre_cliente}</td>
        <td>${venta.tipo_producto}</td>
        <td>${venta.cantidad}</td>
        <td>${venta.subtotal}</td>
        <td>$${venta.precio_unitario}</td>
        <td>${venta.fecha_venta}</td>
    </tr>
    `;
    tbody.innerHTML += fila;
  });
}
