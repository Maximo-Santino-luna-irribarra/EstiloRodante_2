const formHTML = `
  <div class="row g-3">
    <div class="col-md-6">
      <label for="nombre" class="form-label">Nombre</label>
      <input type="text" id="nombre" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label for="marca" class="form-label">Marca</label>
      <input type="text" id="marca" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label for="modelo" class="form-label">Modelo</label>
      <input type="text" id="modelo" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label for="medida" class="form-label">Medida</label>
      <input type="text" id="medida" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label for="precio" class="form-label">Precio</label>
      <input type="number" id="precio" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label for="stock" class="form-label">Stock</label>
      <input type="number" id="stock" class="form-control" required>
    </div>

    <div class="col-12">
      <label for="imagen" class="form-label">Imagen (URL)</label>
      <input type="file" id="imagen" class="form-control" name="imagen">
    </div>

    <div class="col-12">
      <button type="button" class="btn btn-primary w-100" onclick="updatePreview()">Cargar Vista Previa</button>
      <button type="submit" class="btn btn-success w-100">Agregar</button>
    </div>
  </div>
`;

// Renderizar formulario si se elige tipo válido
const tipoSelect = document.getElementById("tipo");
tipoSelect.addEventListener("change", (e) => {
  const container = document.querySelector(".restForm");
  const value = e.target.value;
  if (value === "Cubierta" || value === "Llanta") {
    container.innerHTML = formHTML;
  } else {
    container.innerHTML = `
      <div class="alert alert-danger mt-3" role="alert">
        Por favor, selecciona un tipo de producto válido.
      </div>
    `;
  }
});

// Función para obtener los valores del formulario
function getFormData() {
  return {
    nombre: document.getElementById("nombre")?.value || "",
    marca: document.getElementById("marca")?.value || "",
    modelo: document.getElementById("modelo")?.value || "",
    medida: document.getElementById("medida")?.value || "",
    precio: parseFloat(document.getElementById("precio")?.value) || 0,
    stock: parseInt(document.getElementById("stock")?.value) || 0,
    urlIMG: urlIMGU,
    categoria: tipoSelect.value,
    activo: 1
  };
}

// Vista previa
function updatePreview() {
  const data = getFormData();
  document.getElementById("previewNombre").textContent = data.nombre || "Nombre del Producto";
  document.getElementById("previewImage").src = data.urlIMG;
  document.getElementById("previewMarca").textContent = `${data.marca} - ${data.modelo} - ${data.medida}`;
  document.getElementById("previewType").textContent = data.categoria;
  document.getElementById("previewPrecio").textContent = `$${data.precio}`;
}

// Envío a la API unificada
function agregarProducto() {
  const producto = getFormData();
  console.log(producto)
  fetch("http://localhost:3000/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al agregar producto");
      return res.json();
    })
    .then(() => {
      alert("Producto agregado correctamente");
      window.location.href = "/dashboard";
    })
    .catch(err => {
      console.error(err);
      alert("Hubo un error al intentar guardar el producto.");
    });
}

const form = document.getElementById('productForm')
form.addEventListener("submit", async (e) =>{
  e.preventDefault();
  const subidaOK = await subirImagen(form);
  if (!subidaOK) return;
  agregarProducto()
})

const subirImagen = async (form) => {
    const fileInput = document.getElementById('imagen');
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecciona una imagen para subir.');
        return false;
    }

    const formData = new FormData();
    formData.append('imagen', file);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Error al subir la imagen');
        const data = await response.json();

        urlIMGU = data.file.path;
        return true;

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('No se pudo subir la imagen. Por favor, inténtelo más tarde.');
        return false;
    }
};
