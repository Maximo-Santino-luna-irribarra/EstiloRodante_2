import { mostrarAsistencias } from '../controllers/admin.controllers.js';
import { getVentas } from '../service/venta.service.js';
import {top10Productos, top10Ventas} from '../controllers/venta.controllers.js'


export const renderLogin = (req, res) => res.render('login');
export const renderDashboard = (req, res) => res.render('dashboard');
export const renderEditar = (req, res) => res.render('editar');
export const renderAgregar = (req, res) => res.render('agregar');
export const renderVentas = async (req, res) => {
  try {
    const orden = req.query.orden || '';
    let datos = [];

      if (orden === 'mas-vendidos') {
        datos = await top10Productos();
      } else if (orden === 'ganancia') {
        datos = await top10Ventas();
      }else {
      datos = await getVentas();
      if (orden === 'mas-reciente') {
        datos.sort((a, b) => new Date(b.fecha_venta) - new Date(a.fecha_venta));
      } else if (orden === 'mas-viejo') {
        datos.sort((a, b) => new Date(a.fecha_venta) - new Date(b.fecha_venta));
      } else if (orden === 'ventas-caras') {
        datos.sort((a, b) => {
          const totalA = a.detalles.reduce((acc, d) => acc + d.subtotal, 0);
          const totalB = b.detalles.reduce((acc, d) => acc + d.subtotal, 0);
          return totalB - totalA;
        });
      }
    }

    res.render('vista_ventas', { datos, orden });
  } catch (error) {
    console.error('Error renderizando ventas:', error);
    res.status(500).send('Error al cargar la vista de ventas');
  }
};


export const renderClientes = (req, res) => res.render('vista_clientes');
export const renderAsistencias = (req, res) => mostrarAsistencias(req, res);

