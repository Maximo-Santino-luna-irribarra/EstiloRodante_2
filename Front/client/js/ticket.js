const escribirTicket = () =>{
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carritoActual.length === 0) {
        alert("El carrito está vacío. No se puede generar un ticket.");
        return;
    }

    console.log(carritoActual)

    carritoActual.forEach(element => {
        const ticket = document.createElement('div');
        ticket.className = "ticket-item shadow-sm";
        ticket.innerHTML = `
            <h5>${element.nombre} - ${element.marca}</h5>
            <p>Precio: $${element.precio}</p>
            <p>Cantidad: ${element.cantidad}</p>
            <hr class="border-light"/>
        `;
        document.querySelector('.ticket').appendChild(ticket);
    });

}

escribirTicket();