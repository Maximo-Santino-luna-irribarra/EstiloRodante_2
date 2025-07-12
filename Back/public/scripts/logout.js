//faltan agregar funciuones . utils
export function logout() {
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


