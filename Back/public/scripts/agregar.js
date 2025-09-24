let urlIMG = "";

const tipoSelect = document.getElementById("tipo");
const restForm = document.querySelector(".restForm");

tipoSelect.addEventListener("change", () => {
  restForm.classList.toggle("d-none", !["Cubierta","Llanta"].includes(tipoSelect.value));
});

function initImagePreview() {
  const input = document.getElementById('imagen');
  const img = document.getElementById('previewImage');
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const blobURL = URL.createObjectURL(file);
    urlIMG = blobURL;
    img.src = blobURL;
  });
}
initImagePreview();

function getFormData() {
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value);
  
  // Validar que los valores numéricos sean válidos
  if (isNaN(precio) || precio <= 0) {
    alert("Por favor ingrese un precio válido mayor a 0");
    return null;
  }
  
  if (isNaN(stock) || stock < 0) {
    alert("Por favor ingrese una cantidad válida (0 o mayor)");
    return null;
  }

  return {
    nombre: document.getElementById("nombre").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    medida: document.getElementById("medida").value,
    precio: precio,
    stock: stock,
    urlIMG,
    categoria: tipoSelect.value,
    activo: true
  };
}

function updatePreview() {
  const file = document.getElementById('imagen').files[0];
  if (file) document.getElementById('previewImage').src = URL.createObjectURL(file);
  document.getElementById('previewNombre').textContent = document.getElementById('nombre').value;
  document.getElementById('previewMarca').textContent = `${document.getElementById('marca').value} – ${document.getElementById('modelo').value} – ${document.getElementById('medida').value}`;
  document.getElementById('previewType').textContent = tipoSelect.value;
  document.getElementById('previewPrecio').textContent = `$${parseFloat(document.getElementById('precio').value).toFixed(2)}`;
}

async function subirImagen() {
  const file = document.getElementById('imagen').files[0];
  if (!file) { alert('Selecciona una imagen'); return false; }
  const formData = new FormData();
  formData.append('imagen', file);
  const res = await fetch('/upload', { method: 'POST', body: formData });
  if (!res.ok) { alert('Error subiendo imagen'); return false; }
  const data = await res.json();
  urlIMG = data.file.path;
  return true;
}

async function agregarProducto() {
  const producto = getFormData();
  if (!producto) return; // Si hay error en la validación

  try {
    const res = await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al guardar producto");
    }
    
    alert("Producto agregado exitosamente");
    window.location.href = "/dashboard";
  } catch (error) {
    alert("Error: " + error.message);
  }
}

function bloquearEEnInputsNumber() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener("keydown", function(e) {
      // Permitir: backspace, delete, tab, escape, enter, punto decimal y números
      if ([46, 8, 9, 27, 13, 190].indexOf(e.keyCode) !== -1 ||
        // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode >= 35 && e.keyCode <= 39) || 
        // Permitir: punto decimal del teclado numérico
        (e.keyCode === 110)) {
        return;
      }
      // Bloquear cualquier tecla que no sea número
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
          (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  });
}

document.getElementById('productForm').addEventListener("submit", async (e) => {
  e.preventDefault();
  if (await subirImagen()) {
    agregarProducto();
  }
});

bloquearEEnInputsNumber()