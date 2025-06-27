const toggleBtn = document.getElementById('modoNocheBtn');
const body = document.body;
const nombreUsuario = document.getElementById('nombre');
const password = document.getElementById('password');

const setTheme = (theme) => {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(theme);
    toggleBtn.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
};

toggleBtn.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
    setTheme(newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'light-mode';
setTheme(savedTheme);

const autocompleteButton = document.querySelector('.autocomplete');
autocompleteButton.addEventListener('click', () => {
    nombreUsuario.value = 'UsuarioPrueba';
    password.value = '123';
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