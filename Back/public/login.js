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


addEventListener('DOMContentLoaded', () => {
    const storedNombre = localStorage.getItem('nombreUsuario');
    const storedPassword = localStorage.getItem('password');

    if (storedNombre) {
        nombreUsuario.value = storedNombre;
    }
    if (storedPassword) {
        password.value = storedPassword;
    }
}
)
