const box = document.querySelector("#productsBox")
const listaProductos = []

const getNeumaticos = () =>{
    fetch('/Front/objects/neumaticos.json')
    .then(res =>{
        return res.json()
    })
    .then(productos =>{
        productos.forEach(element => {
            listaProductos.push(element)
            console.log(listaProductos)
        });
    }
)}

const getLlantas = () =>{
    fetch('/Front/objects/llantas.json')
    .then(res =>{
        return res.json()
    })
    .then(productos =>{
        productos.forEach(element => {
            listaProductos.push(element)
            console.log(element)
        });
    }
)}
getLlantas()

const insertProducto = () =>{
    getNeumaticos()
    getLlantas()
    listaProductos.forEach(element => {
        crearProducto(element)
    });
}

const crearProducto = (element) =>{
    let product = document.createElement('div')
    product.className = 'col'
    product.innerHTML = `
            <div class="card shadow p-4 rounded-4" style="max-width: 500px; border: 2px solid #000; margin: auto;">
            <div class="row g-4 align-items-start">
            <div class="col-md-4 text-center">
            <img src="/Front/images/llantas/audi_r18-c451-618950a78f90f7c56616357782879910-640-0.png" class="rounded-circle" alt="Producto" style="width: 140px; height: 140px;">
            <p class="mt-3 fw-bold">Precio</p>
            </div>
            <div class="col-md-8">
            <h5 class="card-title">Nombre de producto</h5>
            <ul class="list-unstyled ps-3">
                <li><strong>Rodado:</strong></li>
                <li><strong>Marca y modelo: </strong></li>
                <li><strong>Rango de carga:</strong></li>
                <li><strong>Alto y ancho:</strong></li>
                <li><strong>Nombre:</strong></li>
                <li><strong>Tecnología:</strong></li>
            </ul>
            </div>
            </div> 
            <div class="d-flex justify-content-around mt-4">
            <div class="contador">
                <button class="boton"">-</button>
                <span id="cantidad" class="cantidad">1</span>
                <button class="boton"">+</button>
            </div>
            </div>
            `
            box.appendChild(product)
    }



const verificarVacio = () =>{
    if(box.innerHTML == ''){
        box.innerHTML = `
        <div class="alert text-center fw-semibold shadow-sm" style="background-color: var(--second-color); color: var(--main-color); border-radius: 10px;">
            No hay productos en el carrito
        </div>
        `
    }
}


