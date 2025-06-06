let min = -Infinity;
let max = Infinity;
let brand = '';
let model = '';
let tech = '';
let type = '';

const params = new URLSearchParams(window.location.search);
type = params.get("type") || '';

const select = document.querySelectorAll(".option")

for (let i = 0; i < select.length; i++) {
    select[i].addEventListener("input", (e) => {
        if (e.target.name == "brands") {
            brand = e.target.value;
        }
        if (e.target.name == "models") {
            model = e.target.value;
        }
        if (e.target.name == "type") {
            type = e.target.value;
        }
        if (e.target.name == "tech") {  // Agrega si tienes filtro de tecnologías
            tech = e.target.value;
        }
        updateProducts();
    });
}

const minPrice = document.querySelector(".minPrice");
const maxPrice = document.querySelector(".maxPrice");

minPrice.addEventListener("input", (e) => {
    min = parseFloat(e.target.value) || -Infinity;
    updateProducts();
});

maxPrice.addEventListener("input", (e) => {
    max = parseFloat(e.target.value) || Infinity;
    updateProducts();
});

let sortOrder = "";

document.getElementById("ordenar").addEventListener("input", (e) => {
    sortOrder = e.target.value;
    updateProducts();
});

const box = document.querySelector(".box");

const insertProducts = () => {
    fetch("/Front/objects/productos_combinados.json")
        .then(res => {
            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
            return res.json();
        })
        .then(data => {
            // Mostrar productos iniciales (puedes llamar updateProducts() para unificar)
            updateProducts(data);
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });
};

const updateProducts = (data) => {
    box.innerHTML = '';

    const fetchData = data ? Promise.resolve(data) : fetch("Front/objects/productos_combinados.json").then(res => res.json());

    fetchData.then(data => {
        const neumaticos = data.productos.neumaticos || [];
        const llantas = data.productos.llantas || [];

        // Combinar ambos arreglos en uno solo, con un campo "categoria" para distinguir
        const productosCombinados = [
            ...neumaticos.map(p => ({...p, categoria: "neumatico"})),
            ...llantas.map(p => ({...p, categoria: "llanta"}))
        ];

        const filtrados = productosCombinados.filter(p => {
            if (p.categoria === "neumatico") {
                return filterProducts(
                    p.type,
                    p.marca,
                    p.modelo,
                    p.caracteristicas?.tecnologias || '',
                    p.precio
                );
            } else if (p.categoria === "llanta") {
                // Para llantas el "tipo" es "Llantas"
                return filterProducts(
                    "Llantas",
                    p.marca,
                    p.modelo,
                    p.material || '',
                    p.precio
                );
            }
            return false;
        });

        filtrados.sort((a, b) => {
            switch (sortOrder) {
                case 'precio-asc':
                    return a.precio - b.precio;
                case 'precio-desc':
                    return b.precio - a.precio;
                case 'nombre-asc':
                    return (a.modelo || '').localeCompare(b.modelo || '');
                case 'nombre-desc':
                    return (b.modelo || '').localeCompare(a.modelo || '');
                default:
                    return 0;
            }
        });

        if (filtrados.length === 0) {
            box.innerHTML = `<div class="alert alert-warning text-center w-100">No se encontraron productos.</div>`;
        }

        filtrados.forEach(p => {
            if (p.categoria === "neumatico") {
                writeProduct(
                    p.type,
                    p.marca,
                    p.modelo,
                    p.medida,
                    p.indice_de_carga,
                    p.indice_de_velocidad,
                    p.precio,
                    p.caracteristicas?.tecnologias || ''
                );
            } else if (p.categoria === "llanta") {
                writeLlanta(
                    p.nombre,
                    p.marca,
                    p.modelo,
                    p.material,
                    p.diametro,
                    p.ancho,
                    p.stock,
                    p.alto,
                    p.url,
                    p.precio
                );
            }
        });
    })
    .catch(error => {
        console.error('Error en updateProducts:', error);
        box.innerHTML = `<div class="alert alert-danger text-center w-100">Error al cargar productos.</div>`;
    });
};


const writeProduct = (tipo, marca, modelo, medida, indiceCarga, indiceVelocidad, precio, tecnologias) => {
    if (!filterProducts(tipo, marca, modelo, tecnologias, precio)) return;

    const product = document.createElement("div");
    product.className = "col";
    product.innerHTML = `
        <div class="card h-100 shadow p-4 rounded-4 border-light">
            <div class="row g-4 align-items-start">
                <div class="col-md-4 text-center">
                    <img src="/Front/images/assets/primer-plano-de-pato-de-goma.jpg" alt="Producto" style="width: 140px; height: 140px;">
                    <p class="mt-3 fw-bold text-primary fs-5">$${precio}</p>
                </div>
                <div class="col-md-8">
                    <h5 class="card-title text-uppercase">${modelo} ${medida}</h5>
                    <ul class="list-unstyled ps-3 small">
                        <li><strong>Tipo:</strong> ${tipo}</li>
                        <li><strong>Marca:</strong> ${marca}</li>
                        <li><strong>Modelo:</strong> ${modelo}</li>
                        <li><strong>Medida:</strong> ${medida}</li>
                        <li><strong>Indice de carga:</strong> ${indiceCarga}</li>
                        <li><strong>Indice de Velocidad:</strong> ${indiceVelocidad}</li>
                        <li><strong>Tecnología:</strong> ${tecnologias}</li>
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

    box.appendChild(product);
};

const writeLlanta = (nombre, marca, modelo, material, diametro, ancho, stock, alto, url, precio) => {
    if (!filterProducts("Llantas", marca, modelo, material, precio)) return;

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
                        <li><strong>Material:</strong> ${material}</li>
                        <li><strong>Diámetro:</strong> ${diametro}</li>
                        <li><strong>Ancho:</strong> ${ancho}</li>
                        <li><strong>Alto:</strong> ${alto}</li>
                        <li><strong>Stock:</strong> ${stock}</li>
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
    box.appendChild(product);
};

const filterProducts = (tipo, marca, modelo, tecnologias, precio) => {
    precio = Number(precio);
    if (brand && brand !== 'Todos' && marca !== brand) {
        return false;
    }
    if (model && model !== 'Todos' && modelo !== model) {
        return false;
    }
    if (tech && tech !== '' && !tecnologias.toLowerCase().includes(tech.toLowerCase())) {
        return false;
    }
    if (precio < min || precio > max) {
        return false;
    }
    if (type && type !== 'Todos' && tipo !== type) {
        return false;
    }
    return true;
};

// Llamar insertProducts al cargar la página para mostrar productos
insertProducts();
