// LLANTAS
fetch('/api/llanta', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const llantasContainer = document.querySelector('.box');
    // NO limpiamos acá para no borrar lo de neumaticos

    data.forEach(llanta => {
        const product = document.createElement("div");
        product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        product.innerHTML = `
            <div class="card product-box text-center p-3 shadow rounded-4">
                <div class="product-image-wrapper mx-auto mb-3">
                    <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image" alt="${llanta.modelo}">
                </div>
                <h5 class="fw-bold text-dark mb-1">Modelo: ${llanta.nombreLLanta}</h5>
                <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${llanta.precio}</p>
                <p class="mb-3">Marca: ${llanta.marca}</p>
                <div class="d-flex justify-content-end gap-2 mt-auto">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
                    <button class="btn btn-outline-success btn-sm btn-agregar">Agregar al carrito</button>
                </div>
            </div>
        `;

        const btnAgregar = product.querySelector(".btn-agregar");
        const btnEliminar = product.querySelector(".btn-eliminar");

        btnAgregar.addEventListener("click", () => {
            console.log("Producto agregado al carrito");
        });

        btnEliminar.addEventListener("click", () => {
            console.log("Producto eliminado");
        });

        llantasContainer.appendChild(product);
    });
});


// NEUMÁTICOS
fetch('/api/neumatico', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const neumaticosContainer = document.querySelector('.box');
    // TAMPOCO limpiamos acá para que se sumen a los productos

    data.forEach(neumatico => {
        const product = document.createElement("div");
        product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        product.innerHTML = `
            <div class="card product-box text-center p-3 shadow rounded-4">
                <div class="product-image-wrapper mx-auto mb-3">
                    <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image" alt="xd">
                </div>
                <h5 class="fw-bold text-dark mb-1">Modelo: ${neumatico.modelo}</h5>
                <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${neumatico.precio}</p>
                <p class="mb-3">Marca: ${neumatico.marca}</p>
                <div class="d-flex justify-content-end gap-2 mt-auto">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
                    <button class="btn btn-outline-success btn-sm btn-agregar">Agregar al carrito</button>
                </div>
            </div>
        `;

        const btnAgregar = product.querySelector(".btn-agregar");
        const btnEliminar = product.querySelector(".btn-eliminar");

        btnAgregar.addEventListener("click", () => {
            console.log("Producto agregado al carrito");
        });

        btnEliminar.addEventListener("click", () => {
            console.log("Producto eliminado");
        });

        neumaticosContainer.appendChild(product);
    });
});
