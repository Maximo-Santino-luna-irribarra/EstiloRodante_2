const rinForm = `
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

        <div class="col-md-4">
            <label for="alto" class="form-label">Alto</label>
            <input type="number" id="alto" class="form-control" required>
        </div>

        <div class="col-md-4">
            <label for="ancho" class="form-label">Ancho</label>
            <input type="number" id="ancho" class="form-control" required>
        </div>

        <div class="col-md-4">
            <label for="diametro" class="form-label">Diámetro</label>
            <input type="number" id="diametro" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label for="material" class="form-label">Material</label>
            <input type="text" id="material" class="form-control" required>
        </div>

        <div class="col-md-6">
            <label for="precio" class="form-label">Precio</label>
            <input type="number" id="precio" class="form-control" required>
        </div>

        <div class="col-12">
            <label for="imagen" class="form-label">Imagen (URL)</label>
            <input type="url" id="imagen" class="form-control">
        </div>

        <div class="col-12">
            <button type="button" class="btn btn-primary w-100" onclick="updatePreview()">Cargar</button>
            <button type="button" class="btn btn-primary w-100" onclick="agregarProducto()">Agregar</button>
        </div>
    </div>
`

const cubiertaForm = `
    <div class="row g-3">

    <div class="col-md-6">
      <label for="nombreNeumatico" class="form-label">Nombre</label>
      <input type="text" id="nombreNeumatico" class="form-control" required>
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
      <label for="tecnologia" class="form-label">Tecnología</label>
      <input type="text" id="tecnologia" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label for="precio" class="form-label">Precio</label>
      <input type="number" id="precio" class="form-control" required>
    </div>

    <div class="col-12">
            <label for="imagen" class="form-label">Imagen (URL)</label>
            <input type="url" id="imagen" class="form-control">
    </div>

    <div class="col-12">
        <button type="button" class="btn btn-primary w-100" onclick="updatePreview()">Cargar</button>
        <button type="button" class="btn btn-primary w-100" onclick="agregarProducto()">Agregar</button>
    </div>

  </div>
`
const type = document.getElementById("tipo");
type.addEventListener("change", (e) => {
    if(e.target.value === "Rin") {
    document.querySelector(".restForm").innerHTML = rinForm;
    }else if(e.target.value === "Cubierta") {
    document.querySelector(".restForm").innerHTML = cubiertaForm;
    }else{
    document.querySelector(".restForm").innerHTML = `
        <div class="alert alert-danger" role="alert">
            Por favor, selecciona un tipo de producto válido.
        </div>
    `;
    }
});


const updatePreview = () => {
    const previewNombre = document.getElementById("previewNombre");
    const previewImage = document.getElementById("previewImage");
    const previewMarca = document.getElementById("previewMarca");
    const previewType = document.getElementById("previewType");
    const previewPrecio = document.getElementById("previewPrecio");

    if (type.value === "Rin") {
        const inputNombre = document.getElementById("nombre");
        const inputMarca = document.getElementById("marca");
        const inputModelo = document.getElementById("modelo");
        const inputAlto = document.getElementById("alto");
        const inputAncho = document.getElementById("ancho");
        const inputDiametro = document.getElementById("diametro");
        const inputMaterial = document.getElementById("material");
        const image = document.getElementById("imagen");
        const precio = document.getElementById("precio");

        previewNombre.textContent = inputNombre?.value || "Nombre del producto";
        previewMarca.textContent = `${inputMarca?.value} - ${inputModelo?.value} - ${inputAlto?.value} - ${inputAncho?.value} - ${inputDiametro?.value} - ${inputMaterial?.value}`;
        previewType.textContent = type.value;
        previewPrecio.textContent = "$" + (precio?.value || "0");
        previewImage.src = image?.value || "https://acdn-us.mitiendanube.com/stores/001/854/324/products/virtus_5x1121-6ff73022adbf2348f816611838077220-640-0.jpg";

        return {
            nombre: inputNombre?.value,
            marca: inputMarca?.value,
            modelo: inputModelo?.value,
            alto: inputAlto?.value,
            ancho: inputAncho?.value,
            diametro: inputDiametro?.value,
            material: inputMaterial?.value,
            precio: precio?.value,
            urlIMG: image?.value,
            type: type.value
        };

    } else if (type.value === "Cubierta") {
        const inputNombre = document.getElementById("nombreNeumatico");
        const inputMarca = document.getElementById("marca");
        const inputModelo = document.getElementById("modelo");
        const inputMedida = document.getElementById("medida");
        const inputTecnologia = document.getElementById("tecnologia");
        const precio = document.getElementById("precio");
        const image = document.getElementById("imagen");

        previewNombre.textContent = inputNombre?.value || "Nombre del producto";
        previewMarca.textContent = `${inputMarca?.value} - ${inputModelo?.value} - ${inputMedida?.value} - ${inputTecnologia?.value}`;
        previewType.textContent = type.value;
        previewPrecio.textContent = "$" + (precio?.value || "0");
        previewImage.src = image?.value || "https://acdn-us.mitiendanube.com/stores/001/854/324/products/virtus_5x1121-6ff73022adbf2348f816611838077220-640-0.jpg";

        return {
            nombreNeumatico: inputNombre?.value,
            marca: inputMarca?.value,
            modelo: inputModelo?.value,
            medida: inputMedida?.value,
            tecnologia: inputTecnologia?.value,
            precio: precio?.value,
            urlIMG: image?.value,
            type: type.value
        };
    }
};


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

const agregarProducto = () => {
    const producto = updatePreview();
    console.log(producto);
    if (producto.type == "llanta"){
    fetch('http://localhost:5000/api/llanta/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePreview())
    })
    }else if (producto.type == "Cubierta") {
    fetch('http://localhost:5000/api/neumatico/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePreview())
    })}
}