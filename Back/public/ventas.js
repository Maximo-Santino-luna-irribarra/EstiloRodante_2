    const tbody = document.getElementById('ventas-body');

    fetch('/api/ventas')
    .then(res => res.json())
    .then(ventas => {
    if (ventas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay ventas registradas.</td></tr>';
        return;
    }

    tbody.innerHTML = ''; // Limpiar fila de "Cargando..."
    ventas.forEach((venta, index) => {
        const fila = `
        <tr>
            <td>${index + 1}</td>
            <td>${venta.cliente || '---'}</td>
            <td>${venta.producto || '---'}</td>
            <td>${venta.cantidad}</td>
            <td>$${venta.precioUnitario}</td>
            <td>$${venta.total}</td>
            <td>${new Date(venta.createdAt).toLocaleDateString()}</td>
        </tr>
        `;
        tbody.innerHTML += fila;
    });
    })
    .catch(err => {
    console.error('Error al cargar ventas:', err);
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error al cargar los datos.</td></tr>';
    });


