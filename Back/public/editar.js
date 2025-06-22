const imagenInput = document.getElementById('editImagen');
const preview = document.getElementById('editPreviewImage');

const path = window.location.pathname;
const id = path.split('/')[2];

fetch(`/api/llanta/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    console.log(response)
    if (!response.ok) {
        throw new Error('Error al obtener el producto');
    } 
    return response.json();
}).then(producto => {
    console.log(producto);
   document.getElementById('editNombre').value = producto.nombreLLanta;
    document.getElementById('editMarca').value = producto.marca;
    document.getElementById('editModelo').value = producto.modelo;
    document.getElementById('editAlto').value = producto.alto;
    document.getElementById('editAncho').value = producto.ancho;
    document.getElementById('editDiametro').value = producto.diametro;
    document.getElementById('editMaterial').value = producto.material;
    document.getElementById('editPrecio').value = producto.precio;
    document.getElementById('editImagen').value = producto.urlIMG || '';
    document.getElementById('editPreviewImage').src = producto.urlIMG || '/logoPage.png';
}).catch(error => {
    console.error('Error al cargar el producto:', error);
    alert('No se pudo cargar el producto. Por favor, inténtelo más tarde.');
});

const form = document.querySelector("#editForm")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = e.target[0].value;
    const marca = e.target[1].value;
    const modelo = e.target[2].value;
    const alto = e.target[3].value;
    const ancho = e.target[4].value;
    const diametro = e.target[5].value;
    const material = e.target[6].value;
    const precio = e.target[7].value;
    const url = e.target[8].value;

    fetch(`/api/llanta/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombreLLanta: nombre,
            marca: marca,
            modelo: modelo,
            alto: alto,
            ancho: ancho,
            diametro: diametro,
            material: material,
            precio: precio,
            urlIMG: url,
            stock: 1,
            activo: true
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        return response.json();
    }).then(data => {
        console.log('Producto actualizado:', data);
        alert('Producto actualizado correctamente');
        window.location.href = '/dashboard';
    }).catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert('No se pudo actualizar el producto. Por favor, inténtelo más tarde.');
    });
})

const toggleBtn = document.getElementById('modoNocheBtn');
const body = document.body;

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