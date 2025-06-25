const updatePreview = () =>{
    const inputNombre = document.getElementById("nombre");
    const inputDescripcion = document.getElementById("descripcion");
    const image = document.getElementById("image");
    const type = document.getElementById("type");
    const precio = document.getElementById("price");

    const previewNombre = document.getElementById("previewNombre");
    const previewImage = document.getElementById("previewImage");
    const previewDescripcion = document.getElementById("previewDescripcion");
    const previewType = document.getElementById("previewType");
    const previewPrecio = document.getElementById("previewPrecio");

    previewNombre.textContent = inputNombre.value;
    previewDescripcion.textContent = inputDescripcion.value;
    previewType.textContent = type.value;
    previewPrecio.textContent = "$" + precio.value;
    console.log(image.value)
    previewImage.src = image.value

    return {
        nombre: inputNombre.value,
        descripcion: inputDescripcion.value,
        image: image.value,
        type: type.value,
        precio: precio.value
    };
}

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
    if (producto.type == "llanta"){
    fetch('http://localhost:5000/api/llanta/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            image: producto.image,
            type: producto.type,
            precio: producto.precio
        })
    })
}}