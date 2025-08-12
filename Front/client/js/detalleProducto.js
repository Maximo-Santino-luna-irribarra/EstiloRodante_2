import { PRODUCTOS } from "./constantes/rutas.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("idProducto");

  if (!idProducto) {
    document.getElementById("detalle-container").innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger fs-5">No se especificó un producto válido.</p>
      </div>
    `;
    return;
  }

  try {
    const res = await fetch(`${PRODUCTOS}/${idProducto}`);
    if (!res.ok) throw new Error("Error al obtener el producto");
    const producto = await res.json();

    renderDetalle(producto);
  } catch (error) {
    console.error(error);
    document.getElementById("detalle-container").innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger fs-5">Error al cargar el producto.</p>
      </div>
    `;
  }
});

function renderDetalle(producto) {
  const { nombre, marca, categoria, modelo, medida, activo, urlIMG, precio, stock } = producto;

  const html = `
    <div class="col-md-6 text-center">
      <img src="http://localhost:3000/${urlIMG || '/images/primer-plano-de-pato-de-goma.jpg'}"
          alt="${nombre}"
          class="img-fluid rounded shadow"
          style="max-height: 400px; object-fit: cover;" />
    </div>

    <div class="col-md-6 d-flex flex-column justify-content-center">
      <h2 class="fw-bold mb-3">${nombre}</h2>
      <p class="mb-1"><strong>Marca:</strong> ${marca}</p>
      <p class="mb-1"><strong>Categoría:</strong> ${categoria}</p>
      <p class="mb-1"><strong>Modelo:</strong> ${modelo}</p>
      <p class="mb-1"><strong>Medida:</strong> ${medida || "N/A"}</p>
      <p class="mb-1"><strong>Stock:</strong> ${stock} unidades</p>
      <p class="fs-4 text-primary fw-bold mt-3">$${precio}</p>
      <p class="mb-3"><span class="badge ${activo ? "bg-success" : "bg-danger"}">
        ${activo ? "Disponible" : "No disponible"}
      </span></p>
      <button class="btn btn-success btn-lg w-100">Agregar al carrito 🛒</button>
    </div>
  `;

  document.getElementById("detalle-container").innerHTML = html;
}
