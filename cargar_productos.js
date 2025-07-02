// Back/scripts/cargar_productos.js
import fs from 'fs';
import fetch from 'node-fetch'; // Instala con: npm install node-fetch
const API_URL = 'http://localhost:3000/api/productos'; // Ajustá si usás otro puerto

const cargarProductos = async () => {
  try {
    const data = fs.readFileSync('./productos_seed.json', 'utf-8');
    const productos = JSON.parse(data);

    for (const producto of productos) {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });

      if (res.ok) {
        const creado = await res.json();
        console.log(`✅ Producto insertado: ${creado.nombre}`);
      } else {
        const error = await res.text();
        console.error(`❌ Error al insertar: ${producto.nombre} →`, error);
      }
    }

    console.log('🟢 Carga completa.');
  } catch (err) {
    console.error('❌ Error general:', err);
  }
};

cargarProductos();
