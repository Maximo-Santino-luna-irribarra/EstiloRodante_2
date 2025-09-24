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

function bloquearEEnInputsNumber() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    input.addEventListener("paste", function (e) {
      const pasteData = (e.clipboardData || window.clipboardData).getData("text");
      if (/[^0-9]/.test(pasteData)) {
        e.preventDefault();
      }
    });
  });
}


