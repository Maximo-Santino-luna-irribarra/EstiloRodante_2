document.getElementById("btn1").addEventListener("click", function() {
    window.location.href = "/Front/client/html/products.html";
});

document.getElementById("btn2").addEventListener("click", function() {
    window.location.href = "/Front/client/html/products.html";
});

const nombre = localStorage.getItem('nombreCliente');
if (!nombre) {
    window.location.href = 'http://localhost:5500/Front/client/html/login.html';
}
document.querySelector('.welcome').innerHTML = `
    <h1 class="text-white">¡Bienvenido ${nombre} a EstiloRodante!</h1>
    `;