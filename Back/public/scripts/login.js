const body = document.body;
const nombreUsuario = document.getElementById('nombre');
const password = document.getElementById('password');

const autocompleteButton = document.querySelector('.autocomplete');
autocompleteButton.addEventListener('click', () => {
    nombreUsuario.value = 'UsuarioPrueba@email.com';
    password.value = 'qwerty';
})

const loginButton = document.querySelector('.login');
loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const nombre = nombreUsuario.value;
    const pass = password.value;
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:nombre, password: pass })
    }).then(response => {
        console.log('Response:', response);
        console.log('Response status:', response.status);
        if (response.ok) {
            alert('Inicio de sesión exitoso');
            location.href = '/dashboard';
        }else{
            alert('Error al iniciar sesión. Verifica tus credenciales.');
           
        }
}).catch(error => {
        console.error('Error:', error);
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    });
});