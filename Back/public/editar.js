const path = window.location.pathname;
const id = path.split('/')[2];
const params = new URLSearchParams(window.location.search);
const tipo = params.get('tipo');
const form = document.querySelector("#editForm")
console.log("Tipo de producto:", tipo);

fetch(`/api/${tipo}/${id}`, {
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
    if(tipo == "llanta") {
    document.getElementById("editForm").innerHTML = `
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre</label>
            <input type="text" id="editNombre" class="form-control" value="Llanta Fiat">
          </div>

          <div class="col-md-6">
            <label class="form-label">Marca</label>
            <input type="text" id="editMarca" class="form-control" value="Fiat">
          </div>

          <div class="col-md-6">
            <label class="form-label">Modelo</label>
            <input type="text" id="editModelo" class="form-control" value="Uno 2015">
          </div>

          <div class="col-md-4">
            <label class="form-label">Alto</label>
            <input type="number" id="editAlto" class="form-control" value="60">
          </div>

          <div class="col-md-4">
            <label class="form-label">Ancho</label>
            <input type="number" id="editAncho" class="form-control" value="185">
          </div>

          <div class="col-md-4">
            <label class="form-label">Diámetro</label>
            <input type="number" id="editDiametro" class="form-control" value="14">
          </div>

          <div class="col-md-6">
            <label class="form-label">Material</label>
            <input type="text" id="editMaterial" class="form-control" value="Aleación">
          </div>

          <div class="col-md-6">
            <label class="form-label">Precio</label>
            <input type="number" id="editPrecio" class="form-control" value="175000">
          </div>

          <div class="col-12">
            <label class="form-label">Imagen (URL)</label>
            <input type="url" id="editImagen" class="form-control" value="https://via.placeholder.com/300x200">
          </div>

          <div class="text-center mt-4">
            <img id="editPreviewImagen" src="/Back/public/primer-plano-de-pato-de-goma.jpg" class="img-fluid rounded mb-3" style="width: 300px; height: 200px; object-fit: cover;">
            <br>
            <button type="submit" class="btn-change btn btn-success px-5">
              <i class="bi bi-check-circle"></i> Guardar Cambios
            </button>
          </div>
        </div>
    `
    document.getElementById('editNombre').value = producto.nombreLLanta;
    document.getElementById('editMarca').value = producto.marca;
    document.getElementById('editModelo').value = producto.modelo;
    document.getElementById('editAlto').value = producto.alto;
    document.getElementById('editAncho').value = producto.ancho;
    document.getElementById('editDiametro').value = producto.diametro;
    document.getElementById('editMaterial').value = producto.material;
    document.getElementById('editPrecio').value = producto.precio;
    document.getElementById('editImagen').value = producto.urlIMG || '';
    document.getElementById('editPreviewImagen').src = producto.urlIMG || '/logoPage.png';
    // ----------

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
    //----------
    } else if(tipo == "neumatico") {
    document.getElementById("editForm").innerHTML = `
    <div class="row g-3">
        <div class="col-md-6">
            <label for="nombreNeumatico" class="form-label">Nombre</label>
            <input type="text" id="editNombre" class="form-control" placeholder="Ej: Neumático Goodyear">
        </div>

        <div class="col-md-6">
            <label for="marca" class="form-label">Marca</label>
            <input type="text" id="editMarca" class="form-control" placeholder="Ej: Goodyear">
        </div>

        <div class="col-md-6">
            <label for="modelo" class="form-label">Modelo</label>
            <input type="text" id="editModelo" class="form-control" placeholder="Ej: EfficientGrip Performance">
        </div>

        <div class="col-md-6">
            <label for="medida" class="form-label">Medida</label>
            <input type="text" id="editMedida" class="form-control" placeholder="Ej: 195/65R15">
        </div>

        <div class="col-md-6">
            <label for="tecnologia" class="form-label">Tecnología</label>
            <input type="text" id="editTecnologia" class="form-control" placeholder="Ej: Run Flat, Radial, etc.">
        </div>

        <div class="col-md-6">
            <label for="precio" class="form-label">Precio</label>
            <input type="number" id="editPrecio" class="form-control" placeholder="Ej: 145000">
        </div>

        <div class="col-12">
            <label for="imagen" class="form-label">Imagen (URL)</label>
            <input type="url" id="editImagen" class="form-control" placeholder="https://...">
        </div>

        <div class="text-center mt-4">
            <img id="editPreviewImagen" src="https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg" class="img-fluid rounded mb-3" style="width: 300px; height: 200px; object-fit: cover;">
            <br>
            <button type="submit" class="btn-change btn btn-success px-5">
              <i class="bi bi-check-circle"></i> Guardar Cambios
            </button>
        </div>
        </div>

    `
    document.getElementById('editNombre').value = producto.nombreNeumatico;
    document.getElementById('editMarca').value = producto.marca;
    document.getElementById('editModelo').value = producto.modelo;
    document.getElementById('editMedida').value = producto.medida;
    document.getElementById('editTecnologia').value = producto.tecnologia;
    document.getElementById('editPrecio').value = producto.precio;
    document.getElementById('editImagen').value = producto.urlIMG || 'no tiene';
    document.getElementById('editPreviewImagen').src = producto.urlIMG || '/logoPage.png';
    }

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = e.target[0].value;
    const marca = e.target[1].value;
    const modelo = e.target[2].value;
    const medida = e.target[3].value;
    const tecnologia = e.target[4].value;
    const precio = e.target[5].value;
    const url = e.target[6].value;

    fetch(`/api/neumatico/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombreNeumatico: nombre,
            marca: marca,
            modelo: modelo,
            medida: medida,
            tecnologia: tecnologia,
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
});

}).catch(error => {
    console.error('Error al cargar el producto:', error);
    alert('No se pudo cargar el producto. Por favor, inténtelo más tarde.');
});

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