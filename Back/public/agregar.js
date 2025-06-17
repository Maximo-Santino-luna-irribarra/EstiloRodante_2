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
    previewPrecio.textContent = precio.value;
    console.log(image.value)
    previewImage.src = image.value
}