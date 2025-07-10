document.getElementById("btn1").addEventListener("click", function() {
    window.location.href = "./products.html?tipo=Llanta";
});

document.getElementById("btn2").addEventListener("click", function() {
    window.location.href = "./products.html?tipo=Cubierta";
});

const nombre = localStorage.getItem('nombreCliente');
if (!nombre) {
    window.location.href = './login.html';
}
document.querySelector('.welcome').innerHTML = `
    <h1 class="text-white">¡Bienvenido ${nombre} a EstiloRodante!</h1>
    `;

const modoBtn = document.querySelector(".modo-btn");
const modoActual = localStorage.getItem("modo") || "dia";

if (modoActual === "noche") {
    document.body.classList.add("dark-mode");
    modoBtn.textContent = "☀️";
} else {
    document.body.classList.remove("dark-mode");
    modoBtn.textContent = "🌙";
}

modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("modo", "noche");
        modoBtn.textContent = "☀️";
        document.documentElement.style.setProperty('--color-fondo', '#222222');
    } else {
        localStorage.setItem("modo", "dia");
        modoBtn.textContent = "🌙";
    }
});