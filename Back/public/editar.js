const path = window.location.pathname;
const id = path.split('/')[2];
const form = document.querySelector("#editForm");

fetch(`http://localhost:3000/api/productos/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (!response.ok) {
        throw new Error('Error al obtener el producto');
    }
    return response.json();
}).then(producto => {
    const { categoria } = producto;
    console.log("Categoría del producto:", categoria);

    // Generar HTML del formulario dinámicamente
    let medidaHTML = '';
    if (categoria === 'cubierta') {
        medidaHTML = `
            <div class="col-md-6">
                <label class="form-label">Medida</label>
                <input type="text" id="editMedida" class="form-control" placeholder="Ej: 195/65R15">
            </div>
        `;
    }

    form.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">Nombre</label>
                <input type="text" id="editNombre" class="form-control" placeholder="Ej: Producto X">
            </div>

            <div class="col-md-6">
                <label class="form-label">Marca</label>
                <input type="text" id="editMarca" class="form-control" placeholder="Ej: Marca X">
            </div>

            <div class="col-md-6">
                <label class="form-label">Modelo</label>
                <input type="text" id="editModelo" class="form-control" placeholder="Ej: Modelo X">
            </div>

            ${medidaHTML}

            <div class="col-md-6">
                <label class="form-label">Precio</label>
                <input type="number" id="editPrecio" class="form-control" placeholder="Ej: 145000">
            </div>

            <div class="col-12">
                <label class="form-label">Imagen (URL)</label>
                <input type="url" id="editImagen" class="form-control" placeholder="https://...">
            </div>

            <div class="col-md-6">
                <label class="form-label">Stock</label>
                <input type="number" id="editStock" class="form-control" placeholder="Ej: 25">
            </div>

            <div class="text-center mt-4">
                <img id="editPreviewImagen" src="" class="img-fluid rounded mb-3" style="width: 300px; height: 200px; object-fit: cover;">
                <br>
                <button type="submit" class="btn-change btn btn-success px-5">
                    <i class="bi bi-check-circle"></i> Guardar Cambios
                </button>
            </div>
        </div>
    `;

    // Cargar los valores
    document.getElementById('editNombre').value = producto.nombre || '';
    document.getElementById('editMarca').value = producto.marca || '';
    document.getElementById('editModelo').value = producto.modelo || '';
    if (categoria === 'cubierta') {
        document.getElementById('editMedida').value = producto.medida || '';
    }
    document.getElementById('editPrecio').value = producto.precio || 0;
    document.getElementById('editStock').value = producto.stock || 0;
    document.getElementById('editImagen').value = producto.urlIMG || '';
    document.getElementById('editPreviewImagen').src = producto.urlIMG || '/logoPage.png';

    // Evento submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById('editNombre').value;
        const marca = document.getElementById('editMarca').value;
        const modelo = document.getElementById('editModelo').value;
        const precio = parseInt(document.getElementById('editPrecio').value);
        const urlIMG = document.getElementById('editImagen').value;
        const stock = parseInt(document.getElementById('editStock').value);
        const medida = categoria === 'cubierta' ? document.getElementById('editMedida').value : '';

        fetch(`http://localhost:3000/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                marca,
                modelo,
                precio,
                stock,
                urlIMG,
                medida,
                categoria,
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
    });

}).catch(error => {
    console.error('Error al cargar el producto:', error);
    alert('No se pudo cargar el producto. Por favor, inténtelo más tarde.');
});

// -------- Modo Noche --------
const toggleBtn = document.getElementById('modoNocheBtn');
const body = document.body;

const setTheme = (theme) => {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(theme);
    toggleBtn.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
};

toggleBtn?.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
    setTheme(newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'light-mode';
setTheme(savedTheme);
