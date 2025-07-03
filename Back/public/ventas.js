    const tbody = document.getElementById('ventas-body');

    fetch('/api/ventas')
    .then(res => res.json())
    .then(ventas => {
        console.log('Ventas cargadas:', ventas);
    if (ventas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay ventas registradas.</td></tr>';
        return;
    }

    tbody.innerHTML = ''; // Limpiar fila de "Cargando..."
    ventas.forEach((venta, index) => {
        const fila = `
        <tr>
            <td>${venta.id}</td>
            <td>${venta.nombre_cliente }</td>
            <td>${venta.tipo_producto }</td>
            <td>${venta.cantidad }</td>
            <td>${venta.subtotal}</td>
            <td>$${venta.precio_unitario}</td>
            <td>${venta.fecha_venta}</td>
            
        </tr>
        `;
        tbody.innerHTML += fila;
    });
    })
    .catch(err => {
    console.error('Error al cargar ventas:', err);
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error al cargar los datos.</td></tr>';
    });


