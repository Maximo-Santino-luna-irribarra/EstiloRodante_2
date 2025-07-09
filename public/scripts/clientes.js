const tbody = document.getElementById('clientes-body');

fetch('/api/cliente')
    .then(res => res.json())
    .then(clientes => {
        if (clientes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay clientes registrados.</td></tr>';
            return;
        }

    tbody.innerHTML = ''; 
        clientes.forEach((cliente, index) => {
            const fila = `
            <tr>
                <td>#${cliente.id} - ${cliente.nombreCliente}</td>
            </tr>
            `;
            tbody.innerHTML += fila;
        });
        })
    .catch(err => {
        console.error('Error al cargar :', err);
            tbody.innerHTML = '<tr><td colspan="1"> class="text-center text-danger">Error al cargar los datos.</td></tr>';});


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