const buttonLogin = document.querySelector('.btn-login');
const nombreUsuario = document.getElementById('nombre');

buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const nombre = nombreUsuario.value;

    if (!nombre) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreCliente: nombre })
        });

        if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }

        window.location.href = 'http://localhost:5500/Front/client/html/home.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
})