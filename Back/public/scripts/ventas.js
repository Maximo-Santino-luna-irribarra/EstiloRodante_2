// ventas.js (ruta)
const express = require('express');
const router = express.Router();
const { obtenerVentas, obtenerLogs, top10Productos, top10Ventas } = require('../../src/api/controllers/venta.controllers');

router.get('/', async (req, res) => {
  const orden = req.query.orden || '';
  let datos = [];
  try {
    switch (orden) {
      case 'mas-vendidos':
        datos = await top10Productos();
        break;
      case 'ganancia':
        datos = await top10Ventas();
        break;
      
    }
    res.render('vista_ventas', { datos, orden });
  } catch (err) {
    console.error(err);
    res.render('vista_ventas', { datos: [], orden });
  }
});

module.exports = router;
