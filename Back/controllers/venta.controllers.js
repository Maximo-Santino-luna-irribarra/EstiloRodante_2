import * as ventaService from '../service/venta.service.js';

export const getAllVentas = async (req, res) => {

  const ventas = await ventaService.getVentas();

  res.json(ventas);

};

export const getVenta = async (req, res) => {
  const venta = await ventaService.getVentaById(req.params.id);

  if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });

  res.json(venta);
};

export const postVenta = async (req, res) => {

  const { nombre_cliente, productos } = req.body;

  if (!nombre_cliente || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Datos incompletos o productos inválidos' });
  }

  const nueva = await ventaService.createVenta(req.body);

  res.status(201).json(nueva);
};

export const deleteVenta = async (req, res) => {

  const eliminada = await ventaService.deleteVenta(req.params.id);

  if (!eliminada) return res.status(404).json({ error: 'Venta no encontrada' });
  
  res.json({ message: 'Venta eliminada correctamente' });
};
