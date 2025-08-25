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
  return {
    nombre: document.getElementById("nombre").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    medida: document.getElementById("medida").value,
    precio: parseFloat(document.getElementById("precio").value),
    stock: parseInt(document.getElementById("stock").value),
    urlIMG,
    categoria: tipoSelect.value,
    activo: 1
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
  const res = await fetch("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error("Error al guardar producto");
  alert("Producto agregado");
  window.location.href = "/dashboard";
}

function bloquearEEnInputsNumber() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener("input", function () {
      // reemplaza cualquier carácter que no sea dígito
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

document.getElementById('productForm').addEventListener("submit", async (e) => {
  e.preventDefault();
  if (await subirImagen()) {
    agregarProducto();
  }
});

bloquearEEnInputsNumber()