const box = document.querySelector(".box")
const listaProductos = []
let productosPrecios = 0
let productosContador = 0

const getProductos = () =>{
    return localStorage.getItem('carrito')
}

const setProductos = () =>{
    lista = JSON.parse(getProductos())
    lista.forEach(element => {
        productosPrecios += element.precio
        productosContador += 1
        crearProducto(element)
    })};

const crearProducto = (element) =>{
    let cantidad = 1
    let product = document.createElement('div')
    product.className = 'col'
    product.innerHTML = `
            <div class="card product-box text-center p-3 shadow rounded-4">
            <div class="product-image-wrapper mx-auto mb-3">
                <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" class="product-image" alt="${element.modelo}">
            </div>
            <h5 class="fw-bold text-dark mb-1">Modelo: ${element.nombre}</h5>
            <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${element.precio}</p>
            <p class="mb-3">Marca: ${element.marca}</p>
            <div class="d-flex justify-content-end gap-2 mt-auto">
                <div class="contador">
                <button class="boton btn-restar">-</button>
                <span id="cantidad" class="cantidad">${cantidad}</span>
                <button class="boton btn-sumar">+</button>
                </div>
            </div>
            </div>
            
            `
            box.appendChild(product)
            const btnSumar = product.querySelector('.btn-sumar')
            const btnRestar = product.querySelector('.btn-restar')
            const spanCantidad = product.querySelector('.cantidad')
            
            btnSumar.addEventListener('click', () => {
                cantidad++
                spanCantidad.textContent = cantidad
                productosContador++
                productosPrecios += element.precio
                actualizarResumen()
            })

            btnRestar.addEventListener('click', () => {
                if (cantidad > 1) {
                    cantidad--
                    spanCantidad.textContent = cantidad
                    productosContador--
                    productosPrecios -= element.precio
                    actualizarResumen()
                }
            })
        }


const ticketBox = document.querySelector(".ticket")

const crearResumen = () =>{
    ticket = document.createElement('div')
    ticket.className = "aside-ticket shadow"
    ticket.innerHTML = `
          <h5>Resumen</h5>
          <p>Productos: $${productosPrecios}</p>
          <p>Impuestos: $${productosContador * 500}</p>
          <hr class="border-light"/>
          <p class="fw-bold">Total: $${productosPrecios + productosContador * 500}</p>
        `
        if(verificarVacio()){
            ticket.innerHTML += `<button class="btn btn-light w-100 mt-2">Generar Ticket</button>`
        }else{
             ticket.innerHTML += `<button class="btn btn-light w-100 mt-2" disabled>Generar Ticket</button>`
        }
    ticketBox.appendChild(ticket)
    }

const actualizarResumen = () => {
    ticketBox.innerHTML = ''

    ticket = document.createElement('div')
    ticket.className = "aside-ticket shadow"
    ticket.innerHTML = `
        <h5>Resumen</h5>
        <p>Productos: $${productosPrecios}</p>
        <p>Impuestos: $${productosContador * 500}</p>
        <hr class="border-light"/>
        <p class="fw-bold">Total: $${productosPrecios + productosContador * 500}</p>
        <button class="btn btn-light w-100 mt-2" ${productosContador > 0 ? '' : 'disabled'}>Generar Ticket</button>
    `
    ticketBox.appendChild(ticket)
}


const verificarVacio = () =>{
    if(box.innerHTML == ''){
        box.innerHTML = `
        <div class="alert text-center fw-semibold shadow-sm" style="background-color: var(--second-color); color: var(--main-color); border-radius: 10px;">
            No hay productos en el carrito
        </div>
        `
    }else{
        return true
    }
}

setProductos()
verificarVacio()
actualizarResumen() 

