const box = document.querySelector("#productsBox")
const listaProductos = []
localStorage.setItem("carro", `[{
        "nombre": "Llanta Fiat",
        "precio": 1750000,
        "marca": "Fiat",
        "modelo": "Argo",
        "material": "Aleación de aluminio",
        "diametro": 17,
        "ancho": null,
        "stock": "En stock",
        "alto": "111",
        "url": "introducir imagen"
      }]`)
let productosPrecios = 0
let productosContador = 0

const getProductos = () =>{
    return localStorage.getItem('carro')
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
            <div class="card shadow p-4 rounded-4" style="max-width: 500px; border: 2px solid #000; margin: auto;">
            <div class="row g-4 align-items-start">
            <div class="col-md-4 text-center">
            <img src="/Front/images/llantas/audi_r18-c451-618950a78f90f7c56616357782879910-640-0.png" class="rounded-circle" alt="Producto" style="width: 140px; height: 140px;">
            </div>
            <div class="col-md-8">
            <h5 class="card-title display-5">${element.nombre}</h5>
            <ul class="list-unstyled ps-3">
                <li class="h4 fw-lighter">Marca: ${element.marca}</li>
                <li class="h4 fw-lighter">Modelo: ${element.modelo}</li>
                <li class="h4">$${element.precio}</li>
            </ul>
            </div>
            </div> 
            <div class="d-flex justify-content-around mt-4">
            <div class="contador">
                <button class="boton btn-restar">-</button>
                <span id="cantidad" class="cantidad">${cantidad}</span>
                <button class="boton btn-sumar">+</button>
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

