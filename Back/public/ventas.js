    const tbody = document.getElementById('ventas-body');

    fetch('/api/ventas')
    .then(res => res.json())
    .then(ventas => {
        console.log('Ventas cargadas:', ventas);
    if (ventas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay ventas registradas.</td></tr>';
        return;
    }

    tbody.innerHTML = ''; 
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

function logout() {
    const logoutBtn = document.getElementById("LogOut");
    if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        fetch('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
        if (res.ok) {
            localStorage.clear()
            window.location.href = "/login";
        } else {
            console.error("Error al cerrar sesión");
        }
        })
        .catch(err => console.error("Error en la solicitud de cierre de sesión:", err));
    });
    }
}


