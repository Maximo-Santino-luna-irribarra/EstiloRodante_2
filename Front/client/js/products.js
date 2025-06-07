// Elementos del DOM
const tipoSelect = document.getElementById("types");
const marcaSelect = document.querySelector('select[name="brands"]');
const modeloSelect = document.querySelector('select[name="models"]');
const minPriceInput = document.querySelector(".minPrice");
const maxPriceInput = document.querySelector(".maxPrice");
const ordenarSelect = document.getElementById("ordenar");
const searchInput = document.querySelector('input[type="text"]');
const contenedorProductos = document.querySelector(".box");
const url = "/Front/objects/productos_combinados.json"
let productos = []
let carrito = [];


async function ingresarMercaderia (url)
{
    console.log(url)
    const response = await fetch(url);
        productos = await response.json();
        return productos
}
function filtrar(){
        const busqueda = document.querySelector('.search-bar').value.toLowerCase();
        const filtrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
        MostrarProductos(filtrados);

        writeProduct(filtrados);
    
}

const writeneumatico = (neumatico) => {
    const {marca,modelo,medida,indice_de_carga,indice_de_velocidad,precio,caracteristicas} = neumatico;

    const product = document.createElement("div");
    product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    product.innerHTML = `
    <div class="card product-box text-center p-3 shadow rounded-4">
        <div class="product-image-wrapper mx-auto mb-3">
            <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image" alt="${modelo}">
        </div>
        <h5 class="fw-bold text-dark mb-1">Modelo: ACA VA EL NOMBRE QUE NO TIENEN</h5>
        <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
        <p class="mb-3">Marca: ${marca}</p>
        <div class="d-flex justify-content-end gap-2 mt-auto">
            <button class="btn btn-outline-danger btn-sm">Eliminar</button>
            <button class="btn btn-outline-success btn-sm">Agregar</button>
        </div>
    </div>`;
    contenedorProductos.appendChild(product);
};
const writeLlanta = (llanta) => {
    const {nombre,marca,modelo,material,diametro,ancho,stock,alto,url,precio} = llanta;

    const product = document.createElement("div");
    product.className = "col";
    product.innerHTML = `
        <div class="card h-100 shadow p-4 rounded-4 border-light">
            <div class="row g-4 align-items-start">
                <div class="col-md-4 text-center">
                    <img src="${url || 'Front/images/assets/primer-plano-de-pato-de-goma.jpg'}" alt="Llanta" style="width: 140px; height: 140px;">
                    <p class="mt-3 fw-bold text-primary fs-5">$${precio}</p>
                </div>
                <div class="col-md-8">
                    <h5 class="card-title text-uppercase">${nombre}</h5>
                    <ul class="list-unstyled ps-3 small">
                        <li><strong>Tipo:</strong> Llantas</li>
                        <li><strong>Marca:</strong> ${marca}</li>
                        <li><strong>Modelo:</strong> ${modelo}</li>
                        <li><strong>Ancho:</strong> ${ancho}</li>
                        <li><strong>Alto:</strong> ${alto}</li>
                        <li><strong>Precio:</strong> $${precio}</li>
                    </ul>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-danger btn-sm px-5">Eliminar</button>
                <button class="btn btn-primary btn-sm px-5">Editar</button>
            </div>
        </div>
    `;
    contenedorProductos.appendChild(product);
};

function combinarProductos(datosJson) {
    console.log("Datos recibidos:", datosJson);
    const llantas = datosJson.productos.llantas.map(p => ({
        ...p,
        tipo: "llanta",
        nombre: p.nombre ?? `${p.marca} ${p.modelo}`
    }));

    const neumaticos = datosJson.productos.neumaticos.map(p => ({
        ...p,
        tipo: "neumatico",
        nombre: `${p.marca} ${p.modelo}`,
        precio: p.precio
    }));

    return [...llantas, ...neumaticos];
}
// para usar el filtrado tenes que llamar antes a la funcion combinar productos 
function filtrar(productos) {
    const tipo = tipoSelect.value;
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    const min = parseFloat(minPriceInput.value);
    const max = parseFloat(maxPriceInput.value);
    const busqueda = searchInput.value.toLowerCase();
    const orden = ordenarSelect.value;

    contenedorProductos.innerHTML = "";

    let filtrados = productos;

    if (tipo !== "Todos") filtrados = filtrados.filter(p => p.tipo === tipo);
    if (marca !== "Todos") filtrados = filtrados.filter(p => p.marca === marca);
    if (modelo !== "Todos") filtrados = filtrados.filter(p => p.modelo === modelo);
    if (!isNaN(min)) filtrados = filtrados.filter(p => p.precio >= min);
    if (!isNaN(max)) filtrados = filtrados.filter(p => p.precio <= max);
    if (busqueda) filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(busqueda));

    switch (orden) {
        case "precio-asc":
            filtrados.sort((a, b) => a.precio - b.precio); break;
        case "precio-desc":
            filtrados.sort((a, b) => b.precio - a.precio); break;
        case "nombre-asc":
            filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
        case "nombre-desc":
            filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
    }

    // Mostrar productos
    filtrados.forEach(p => {
        p.tipo === "llanta" ? writeLlanta(p) : writeneumatico(p);
    });
}


// Función inicializadora
async function init() {
    const datos = await ingresarMercaderia(url);
    const productosCombinados = combinarProductos(datos);
    console.log("JSON recibido12:", datos); // 👈 agrega esto
   
    // Render inicial
    filtrar(productosCombinados);

    // Listeners para filtros
    tipoSelect.addEventListener("change", () => filtrar(productosCombinados));
    marcaSelect.addEventListener("change", () => filtrar(productosCombinados));
    modeloSelect.addEventListener("change", () => filtrar(productosCombinados));
    minPriceInput.addEventListener("input", () => filtrar(productosCombinados));
    maxPriceInput.addEventListener("input", () => filtrar(productosCombinados));
    ordenarSelect.addEventListener("change", () => filtrar(productosCombinados));
    searchInput.addEventListener("input", () => filtrar(productosCombinados));
}
    


init()

/*codigo que falta refactorizar para poder usarlo y tengo que refactorizar el json por que soy un capo y me olvide el id  y nombre de los neumaticos re capo 

function agregarAlCarrito(producto) {
    if (!carrito.find(p => p.nombre === producto.nombre)) {
        carrito.push(producto);
        console.log("Producto agregado:", producto);
    }
}

function eliminarDelCarrito(producto) {
    carrito = carrito.filter(p => p.nombre !== producto.nombre);
    console.log("Producto eliminado:", producto);
}

const writeneumatico = (neumatico) => {
    const {marca,modelo,precio,nombre} = neumatico;

    const product = document.createElement("div");
    product.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

    const estaEnCarrito = carrito.some(p => p.nombre === nombre);

    product.innerHTML = `
    <div class="card product-box text-center p-3 shadow rounded-4">
        <div class="product-image-wrapper mx-auto mb-3">
            <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="rounded-circle img-fluid product-image" alt="${modelo}">
        </div>
        <h5 class="fw-bold text-dark mb-1">Modelo: ${nombre}</h5>
        <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${precio}</p>
        <p class="mb-3">Marca: ${marca}</p>
        <div class="d-flex justify-content-end gap-2 mt-auto">
            <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
            <button class="btn btn-outline-success btn-sm btn-agregar">
                ${estaEnCarrito ? "Quitar del carrito" : "Agregar al carrito"}
            </button>
        </div>
    </div>`;

    const btnAgregar = product.querySelector(".btn-agregar");
    const btnEliminar = product.querySelector(".btn-eliminar");

    btnAgregar.addEventListener("click", () => {
        if (carrito.find(p => p.nombre === nombre)) {
            eliminarDelCarrito(neumatico);
            btnAgregar.textContent = "Agregar al carrito";
        } else {
            agregarAlCarrito(neumatico);
            btnAgregar.textContent = "Quitar del carrito";
        }
    });

    btnEliminar.addEventListener("click", () => {
        product.remove(); // Elimina el producto de la vista
    });

    contenedorProductos.appendChild(product);
};
*/