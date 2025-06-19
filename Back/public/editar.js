const imagenInput = document.getElementById('editImagen');
        const preview = document.getElementById('editPreviewImage');

        imagenInput.addEventListener('input', () => {
            preview.src = "/Back/public/primer-plano-de-pato-de-goma.jpg"; // Simulación de carga de imagen
        });

        document.getElementById("editForm").addEventListener("submit", function(e) {
            e.preventDefault();
            const productoEditado = {
                nombre: document.getElementById('editNombre').value,
                tipo: document.getElementById('editTipo').value,
                descripcion: document.getElementById('editDescripcion').value,
                precio: document.getElementById('editPrecio').value,
                imagen: document.getElementById('editImagen').value
            };
            console.log("Producto editado:", productoEditado);
            alert("Cambios guardados (simulado)");
        });