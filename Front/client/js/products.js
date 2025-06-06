// Espera a que todo el contenido del DOM (la página HTML) esté cargado antes de ejecutar el script.
// Es una buena práctica para evitar errores si el script intenta acceder a elementos que aún no existen.
document.addEventListener('DOMContentLoaded', () => {

    //================================================================
    // 1. VARIABLES GLOBALES Y ESTADO DE LA APLICACIÓN
    //================================================================

    // Variable para almacenar todos los productos (neumáticos y llantas) después de cargarlos del JSON.
    // Esto evita tener que leer el archivo repetidamente.
    let productosCargados = [];

    // Objeto que almacena los valores actuales de los filtros.
    const filtros = {
        min: -Infinity,
        max: Infinity,
        brand: '',
        model: '',
        tech: '', // Para tecnologías de neumáticos o material de llantas
        type: '',
        sortOrder: '' // Para el orden de los productos
    };

    //================================================================
    // 2. REFERENCIAS A ELEMENTOS DEL DOM
    //================================================================

    // Contenedor principal donde se mostrarán las tarjetas de productos.
    const box = document.querySelector(".box");

    // Inputs de los filtros
    const selectFilters = document.querySelectorAll(".option"); // Selects de marca, modelo, tipo, etc.
    const minPriceInput = document.querySelector(".minPrice");
    const maxPriceInput = document.querySelector(".maxPrice");
    const sortOrderInput = document.getElementById("ordenar");

    //================================================================
    // 3. LISTENERS DE EVENTOS (MANEJO DE INTERACCIÓN DEL USUARIO)
    //================================================================

    // Lee el parámetro 'type' de la URL para pre-seleccionar un filtro al cargar la página.
    // Ejemplo: /productos.html?type=Llantas
    const params = new URLSearchParams(window.location.search);
    filtros.type = params.get("type") || ''; 

    // Agrega un listener a cada <select> de filtro.
    selectFilters.forEach(select => {
        select.addEventListener("input", (e) => {
            const { name, value } = e.target;
            // Actualiza el estado de los filtros según el 'name' del input.
            if (filtros.hasOwnProperty(name)) {
                filtros[name] = value;
            }
            // Llama a la función para actualizar la vista de productos.
            renderizarProductos();
        });
    });

    // Listener para el input de precio mínimo.
    minPriceInput.addEventListener("input", (e) => {
        filtros.min = parseFloat(e.target.value) || -Infinity;
        renderizarProductos();
    });

    // Listener para el input de precio máximo.
    maxPriceInput.addEventListener("input", (e) => {
        filtros.max = parseFloat(e.target.value) || Infinity;
        renderizarProductos();
    });

    // Listener para el <select> de ordenamiento.
    sortOrderInput.addEventListener("input", (e) => {
        filtros.sortOrder = e.target.value;
        renderizarProductos();
    });

    //================================================================
    // 4. FUNCIONES PRINCIPALES
    //================================================================

    /**
     * Función principal que se ejecuta al inicio.
     * Carga los datos del JSON, los procesa y los muestra por primera vez.
     */
    const inicializar = async () => {
        try {
            // Fetch para obtener los datos del archivo JSON. 'await' pausa la ejecución hasta que la promesa se resuelva.
            const response = await fetch("/Front/objects/productos_combinados.json");
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();

            // Extrae los neumáticos y llantas de los datos. Usa '|| []' como fallback por si no existen.
            const neumaticos = data.productos.neumaticos || [];
            const llantas = data.productos.llantas || [];

            // Combina ambos arreglos en uno solo. Se añade una propiedad 'categoria' para poder distinguirlos.
            productosCargados = [
                ...neumaticos.map(p => ({ ...p, categoria: "neumatico" })),
                ...llantas.map(p => ({ ...p, categoria: "llanta" }))
            ];

            // Llama a la función de renderizado para mostrar los productos en la página por primera vez.
            renderizarProductos();

        } catch (error) {
            console.error('Error al inicializar y cargar productos:', error);
            box.innerHTML = `<div class="alert alert-danger text-center w-100">Error fatal al cargar productos.</div>`;
        }
    };

    /**
     * Filtra, ordena y muestra los productos en el DOM.
     * Esta función es el corazón de la actualización de la vista.
     */
    const renderizarProductos = () => {
        // 1. FILTRADO: Aplica los filtros a la lista completa de productos.
        let productosFiltrados = productosCargados.filter(p => {
            const precio = Number(p.precio);

            // Condiciones de filtro. Si alguna no se cumple, el producto se descarta (retorna false).
            if (filtros.brand && filtros.brand !== 'Todos' && p.marca !== filtros.brand) return false;
            if (filtros.model && filtros.model !== 'Todos' && p.modelo !== filtros.model) return false;
            if (filtros.type && filtros.type !== 'Todos' && p.type !== filtros.type) return false;
            if (precio < filtros.min || precio > filtros.max) return false;
            
            // Filtro específico por tecnología/material.
            if (filtros.tech && filtros.tech !== '') {
                const techs = (p.categoria === 'neumatico' ? p.caracteristicas?.tecnologias : p.material) || '';
                if (!techs.toLowerCase().includes(filtros.tech.toLowerCase())) return false;
            }

            // Si pasa todos los filtros, el producto se incluye (retorna true).
            return true;
        });

        // 2. ORDENAMIENTO: Ordena la lista de productos ya filtrada.
        productosFiltrados.sort((a, b) => {
            switch (filtros.sortOrder) {
                case 'precio-asc': return a.precio - b.precio;
                case 'precio-desc': return b.precio - a.precio;
                case 'nombre-asc': return (a.modelo || '').localeCompare(b.modelo || '');
                case 'nombre-desc': return (b.modelo || '').localeCompare(a.modelo || '');
                default: return 0; // Sin orden específico.
            }
        });

        // 3. RENDERIZADO: Limpia la vista actual y dibuja los nuevos productos.
        box.innerHTML = '';

        if (productosFiltrados.length === 0) {
            // Muestra un mensaje si no hay productos que coincidan con los filtros.
            box.innerHTML = `<div class="alert alert-warning text-center w-100">No se encontraron productos.</div>`;
        } else {
            // Itera sobre los productos filtrados y ordenados para dibujarlos.
            productosFiltrados.forEach(p => {
                if (p.categoria === "neumatico") {
                    crearHtmlNeumatico(p);
                } else if (p.categoria === "llanta") {
                    crearHtmlLlanta(p);
                }
            });
        }
    };

    /**
     * Crea el HTML para una tarjeta de producto de tipo "neumático" y lo agrega al DOM.
     * @param {object} p - El objeto del producto neumático.
     */
    const crearHtmlNeumatico = (p) => {
        const productDiv = document.createElement("div");
        productDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        productDiv.innerHTML = `
        <div class="card product-box text-center p-3 shadow rounded-4 h-100">
            <div class="product-image-wrapper mx-auto mb-3">
                <img src="${p.url || '/Front/images/assets/primer-plano-de-pato-de-goma.jpg'}" class="rounded-circle img-fluid product-image" alt="${p.modelo}">
            </div>
            <h5 class="fw-bold text-dark mb-1">Modelo: ${p.modelo}</h5>
            <p class="text-primary fw-semibold fs-5 mb-3">Precio: $${p.precio}</p>
            <p class="mb-3">Marca: ${p.marca}</p>
            <div class="d-flex justify-content-end gap-2 mt-auto">
                <button class="btn btn-outline-danger btn-sm">Eliminar</button>
                <button class="btn btn-outline-success btn-sm">Agregar</button>
            </div>
        </div>`;
        box.appendChild(productDiv);
    };

    /**
     * Crea el HTML para una tarjeta de producto de tipo "llanta" y lo agrega al DOM.
     * @param {object} p - El objeto del producto llanta.
     */
    const crearHtmlLlanta = (p) => {
        const productDiv = document.createElement("div");
        productDiv.className = "col-12 col-md-6 col-lg-4 mb-4"; // Ajuste de columnas para un layout diferente
        productDiv.innerHTML = `
        <div class="card h-100 shadow p-4 rounded-4 border-light">
            <div class="row g-4 align-items-start">
                <div class="col-md-4 text-center">
                    <img src="${p.url || 'Front/images/assets/primer-plano-de-pato-de-goma.jpg'}" alt="Llanta ${p.modelo}" style="width: 140px; height: 140px;">
                    <p class="mt-3 fw-bold text-primary fs-5">$${p.precio}</p>
                </div>
                <div class="col-md-8">
                    <h5 class="card-title text-uppercase">${p.nombre}</h5>
                    <ul class="list-unstyled ps-3 small">
                        <li><strong>Marca:</strong> ${p.marca}</li>
                        <li><strong>Modelo:</strong> ${p.modelo}</li>
                        <li><strong>Material:</strong> ${p.material}</li>
                        <li><strong>Diámetro:</strong> ${p.diametro}"</li>
                        <li><strong>Ancho:</strong> ${p.ancho}"</li>
                        <li><strong>Stock:</strong> ${p.stock}</li>
                    </ul>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-danger btn-sm px-5">Eliminar</button>
                <button class="btn btn-primary btn-sm px-5">Editar</button>
            </div>
        </div>`;
        box.appendChild(productDiv);
    };

    //================================================================
    // 5. EJECUCIÓN INICIAL
    //================================================================

    // Llama a la función de inicialización para que comience todo el proceso.
    inicializar();
});