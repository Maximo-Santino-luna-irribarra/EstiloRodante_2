const path = window.location.pathname;
const id = path.split('/')[2];
const form = document.querySelector("#editForm");

fetch(`/api/productos/${id}`, {
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

            <div class="col-md-6">
                <label class="form-label">Precio</label>
                <input type="number" id="editPrecio" class="form-control" placeholder="Ej: 145000">
            </div>

            <div class="col-12">
                <label class="form-label">Imagen (URL)</label>
                <input name="imagen" type="file" id="editImagen" class="form-control" placeholder="https://...">
            </div>

            <div class="col-md-6">
                <label class="form-label">Stock</label>
                <input type="number" id="editStock" class="form-control" placeholder="Ej: 25">
            </div>

            <div class="col-md-6">
                <label class="form-label">Medida</label>
                <input type="text" id="editMedida" class="form-control" placeholder="Ej: 40cm">
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
    document.getElementById('editMedida').value = producto.medida || '';
    document.getElementById('editPrecio').value = producto.precio || 0;
    document.getElementById('editStock').value = producto.stock || 0;
    document.getElementById('editPreviewImagen').src = producto.urlIMG || '/logoPage.png';

    // Evento submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const subidaOK = await subirImagen(form, producto.urlIMG);
        if (!subidaOK) return;

        const nombre = document.getElementById('editNombre').value;
        const marca = document.getElementById('editMarca').value;
        const modelo = document.getElementById('editModelo').value;
        const precio = parseInt(document.getElementById('editPrecio').value);
        const stock = parseInt(document.getElementById('editStock').value);
        const medida = document.getElementById('editMedida').value;

        if (!nombre || !marca || precio <= 0) {
            alert("Por favor, complete los campos obligatorios correctamente.");
            return;
        }

        fetch(`/api/productos/${id}`, {
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
                medida
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

const subirImagen = async (form, img) => {
    const fileInput = document.getElementById('editImagen');
    const file = fileInput.files[0];
    if (!file) {
        urlIMG = img;
        return true;
    }

    const formData = new FormData();
    formData.append('imagen', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Error al subir la imagen');
        const data = await response.json();

        urlIMG = data.file.path;
        document.getElementById('editPreviewImagen').src = urlIMG;
        return true;

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('No se pudo subir la imagen. Por favor, inténtelo más tarde.');
        return false;
    }
};
