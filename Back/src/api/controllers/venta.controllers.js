import * as ventaService from '../service/venta.service.js';
import { fn, col, literal } from 'sequelize';
import { DetalleVenta, Producto, Venta } from '../models/relacionesl.js';

export const getAllVentas = async (req, res) => {
  try{
    const ventas = await ventaService.getVentas();

    res.status(200).json(ventas);
  }catch(error){
      console.error('Error al obtener Ventas:', error)
      res.status(500).json({ error:'Error del servidor' })
  }

};

export const getVenta = async (req, res) => {
  try{
  const venta = await ventaService.getVentaById(req.params.id);

  if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });

  res.status(200).json(venta);
  }catch(error){
      console.error('Error al obtener Venta:', error)
      res.status(500).json({ error:'Error del servidor' })
  }
};

export const postVenta = async (req, res) => {
  try{
    const { nombre_cliente, productos } = req.body;

    if (!nombre_cliente || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos o productos inválidos' });
    }

    const nueva = await ventaService.createVenta(req.body);

    res.status(201).json(nueva);
  }catch(error){
        console.error('Error al crear Venta:', error)
        res.status(500).json({ error:'Error del servidor' })
    }
};

export const deleteVenta = async (req, res) => {
  try{
  const eliminada = await ventaService.deleteVenta(req.params.id);

  if (!eliminada) return res.status(404).json({ error: 'Venta no encontrada' });
  
  res.status(201).json({ message: 'Venta eliminada correctamente' });
  }catch(error){
        console.error('Error al eliminar Venta:', error)
        res.status(500).json({ error:'Error del servidor' })
    }
};

export async function top10Productos(req, res) {
  try {
    const results = await DetalleVenta.findAll({
      attributes: [
        'producto_id',
        [fn('SUM', col('cantidad')), 'totalVendido'],
        [fn('MAX', col('fecha_venta')), 'fecha_venta']
      ],
      group: ['producto_id', 'producto.id'],
      order: [[literal('totalVendido'), 'DESC']],
      limit: 10,
      include: [{
        model: Producto,
        as: 'producto',
        attributes: ['nombre', 'marca', 'modelo']
      }]
    });

    res.json(results);
  } catch (error) {
    console.error('Error al obtener top 10 productos:', error);
    res.status(500).json({ error: 'Error al obtener top 10 productos' });
  }
}


export const top10Ventas = async (req, res) => {
  try {
    const topProductos = await DetalleVenta.findAll({
      attributes: [
        'producto_id',
        [fn('SUM', col('cantidad')), 'total_vendido'],
        [fn('SUM', col('subtotal')), 'total_ganancia'],
        [fn('MAX', col('fecha_venta')), 'fecha_venta']
      ],
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['nombre', 'marca', 'categoria']
        }
      ],
      group: ['producto_id', 'producto.id'],
      order: [[literal('total_ganancia'), 'DESC']],
      limit: 10
    });
    res.json(topProductos);
  } catch (error) {
    console.error('Error al obtener top 10 productos más vendidos:', error);
    res.status(500).json({ error: 'Error al obtener el top 10 de productos más vendidos' });
  }
};