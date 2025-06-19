// Back/controllers/venta.controller.js
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
  const nueva = await ventaService.createVenta(req.body);
  res.status(201).json(nueva);
};

export const putVenta = async (req, res) => {
  const actualizada = await ventaService.updateVenta(req.params.id, req.body);
  if (!actualizada) return res.status(404).json({ error: 'Venta no encontrada' });
  res.json(actualizada);
};

export const deleteVenta = async (req, res) => {
  const eliminada = await ventaService.deleteVenta(req.params.id);
  if (!eliminada) return res.status(404).json({ error: 'Venta no encontrada' });
  res.json({ message: 'Venta eliminada correctamente' });
};

