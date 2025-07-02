const escribirTicket = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carritoActual.length === 0) {
        alert("El carrito está vacío. No se puede generar un ticket.");
        return;
    }
    localStorage.removeItem('carrito');
    carritoActual.forEach(element => {
        if(element.cantidad == undefined || element.cantidad <= 0) {
            element.cantidad = 1;
          }
        const ticket = document.createElement('div');
        ticket.className = "ticket-item shadow-sm";
        ticket.innerHTML = `
            <h5>${element.nombre} - ${element.marca}</h5>
            <p>Precio: <span class="price">$${element.precio}</span></p>
            <p>Cantidad: ${element.cantidad}</p>
            <hr class="border-light"/>
        `;
        document.querySelector('.ticket').appendChild(ticket);
        registrarVenta({
            nombre_cliente: localStorage.getItem('nombreCliente') || 'Cliente Anónimo',
            producto_id: element.id,
            tipo_producto: element.categoria,
            cantidad: element.cantidad,
            precio_unitario: element.precio,
            subtotal: element.precio * element.cantidad
        });
    });

}

function volverInicio() {
    window.location.href = "/Front/client/html/login.html";
}

function descargarTicket() {
  const elementos = document.querySelectorAll('.ticket-item');
  let texto = "===== TICKET =====\n";

  elementos.forEach(item => {
    const nombre = item.querySelector('h5')?.innerText || '';
    const precio = item.querySelector('.price')?.innerText || '';
    const cantidad = item.querySelector('p:nth-of-type(2)')?.innerText || '';
    
    texto += `${nombre}\n${precio}\n${cantidad}\n------------------\n`;
  });

  texto += "\nGracias por su compra!\nEstiloRodante";

  const blob = new Blob([texto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ticket.txt";
  a.click();
  URL.revokeObjectURL(url);
}

async function registrarVenta({ producto_id, tipo_producto, cantidad,precio_unitario, subtotal }) {
  try {

    const response = await fetch('http://localhost:3000/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre_cliente: localStorage.getItem('nombreCliente') || 'Cliente Anónimo',
            producto_id,
            tipo_producto,
            cantidad,
            precio_unitario,
            subtotal
      })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar la venta');
    }

    const ventaCreada = await response.json();
    console.log('Venta registrada:', ventaCreada);
    return ventaCreada;

  } catch (error) {
    console.error('Error en registrarVenta:', error);
    alert('No se pudo registrar la venta');
  }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("modoNoche", document.body.classList.contains("dark-mode"));
}

if (localStorage.getItem("modoNoche") === "true") {
    document.body.classList.add("dark-mode");
}

escribirTicket();