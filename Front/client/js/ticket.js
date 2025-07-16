import {VENTAS} from './constants.js'

const escribirTicket = async () => {
  const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
  const nombreCliente = localStorage.getItem('nombreCliente') || 'Cliente Anónimo';
  const ticketContainer = document.querySelector('.ticket');

  if (carritoActual.length === 0) {
    alert("El carrito está vacío. No se puede generar un ticket.");
    return;
  }

  const productos = carritoActual.map(item => {
    const cantidad = item.cantidad && item.cantidad > 0 ? item.cantidad : 1;

    const ticket = document.createElement('div');
    ticket.className = "ticket-item shadow-sm";
    ticket.innerHTML = `
      <h5>${item.nombre} - ${item.marca}</h5>
      <p>Precio: <span class="price">$${item.precio}</span></p>
      <p>Cantidad: ${cantidad}</p>
      <hr class="border-light"/>
    `;
    ticketContainer.appendChild(ticket);

    return {
      producto_id: item.id,
      tipo_producto: item.categoria,
      cantidad,
      precio_unitario: item.precio
    };
  });

  const ventaData = { nombre_cliente: nombreCliente, productos };

  try {
    const response = await fetch(VENTAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ventaData)
    });

    if (!response.ok) throw new Error("Error al registrar la venta");

    const nuevaVenta = await response.json();
    console.log("Venta creada:", nuevaVenta);
  } catch (error) {
    console.error("Error al enviar la venta:", error.message);
    alert("No se pudo registrar la venta");
  }

  // Agregar fecha al ticket
  const fecha = document.createElement('p');
  fecha.innerHTML = `<strong>Fecha:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  ticketContainer.appendChild(fecha);

  // Limpiar localStorage
  localStorage.removeItem('carrito');
  localStorage.removeItem('nombreCliente');
};

function volverInicio() {
    window.location.href = "./login.html";
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

    const response = await fetch(VENTAS, {
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


escribirTicket();
window.volverInicio = volverInicio;
