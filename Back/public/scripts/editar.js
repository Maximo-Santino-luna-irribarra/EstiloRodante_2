document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const id = path.split('/')[2];
  console.log("ID del producto:", id);
  const form = document.querySelector("#editForm");

  fetch(`/api/productos/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener el producto");
      return res.json();
    })
    .then(producto => {
      form.innerHTML = generarFormulario(); // genera el form vacío
      cargarValores(producto);              // carga los valores del producto
      bloquearEEnInputsNumber();
      
      form.addEventListener("submit", async e => {
        e.preventDefault();

        const subidaOK = await subirImagen(producto.urlIMG);
        if (!subidaOK) return;

        const datos = obtenerDatosFormulario();
        if (!datos.nombre || !datos.marca || datos.precio <= 0) {
          alert("Por favor, complete los campos obligatorios correctamente.");
          return;
        }

        fetch(`/api/productos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        })
        .then(res => {
          if (!res.ok) throw new Error("Error al actualizar el producto");
          return res.json();
        })
        .then(() => {
          alert('Producto actualizado correctamente');
          window.location.href = '/dashboard';
        })
        .catch(err => {
          console.error(err);
          alert('No se pudo actualizar el producto.');
        });
      });
    })
    .catch(err => {
      console.error(err);
      alert('No se pudo cargar el producto.');
    });
});

// ---------------- Funciones auxiliares ----------------

function bloquearEEnInputsNumber() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    input.addEventListener("paste", function (e) {
      const pasteData = (e.clipboardData || window.clipboardData).getData("text");
      if (/[^0-9]/.test(pasteData)) {
        e.preventDefault();
      }
    });
  });
}

function generarFormulario() {
  const marcas = ["Pirelli","Goodyear","Bridgestone","Firestone","Micheline"];
  const opcionesMarca = marcas.map(m => `<option value="${m}">${m}</option>`).join('');

  return `
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input type="text" id="editNombre" class="form-control" placeholder="Ej: Producto X">
      </div>
      <div class="col-md-6">
        <label class="form-label">Marca</label>
        <select id="editMarca" class="form-select">
          ${opcionesMarca}
        </select>
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
        <input name="imagen" type="file" id="editImagen" class="form-control">
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
}

function cargarValores(producto) {
  document.getElementById('editNombre').value = producto.nombre || '';
  document.getElementById('editMarca').value = producto.marca || '';
  document.getElementById('editModelo').value = producto.modelo || '';
  document.getElementById('editMedida').value = producto.medida || '';
  document.getElementById('editPrecio').value = producto.precio || 0;
  document.getElementById('editStock').value = producto.stock || 0;
  document.getElementById('editPreviewImagen').src = producto.urlIMG || '/logoPage.png';
}

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById('editNombre').value,
    marca: document.getElementById('editMarca').value,
    modelo: document.getElementById('editModelo').value,
    precio: parseInt(document.getElementById('editPrecio').value),
    stock: parseInt(document.getElementById('editStock').value),
    medida: document.getElementById('editMedida').value,
    urlIMG
  };
}

// Subir imagen y actualizar variable global
let urlIMG = '';
async function subirImagen(img) {
  const fileInput = document.getElementById('editImagen');
  const file = fileInput.files[0];
  if (!file) {
    urlIMG = img;
    return true;
  }

  const formData = new FormData();
  formData.append('imagen', file);

  try {
    const res = await fetch('/upload', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Error al subir la imagen');
    const data = await res.json();
    urlIMG = data.file.path;
    document.getElementById('editPreviewImagen').src = urlIMG;
    return true;
  } catch (err) {
    console.error(err);
    alert('No se pudo subir la imagen.');
    return false;
  }
}
