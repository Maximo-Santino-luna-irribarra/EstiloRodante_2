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

export async function top10Productos() {
  try {
    const results = await DetalleVenta.findAll({
      attributes: [
        'producto_id',
        [fn('SUM', col('cantidad')), 'totalVendido'],
        [fn('SUM', col('subtotal')), 'total_ganancia'],
      ],
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['nombre', 'marca', 'modelo']
        }
      ],
      group: ['producto_id', 'producto.id'],
      // ordenar por la suma directamente:
      order: [[literal('SUM(cantidad)'), 'DESC']],
      limit: 10
    });

    return results.map(r => ({
      producto: r.get('producto'), // garantiza que producto esté accesible
      totalVendido: Number(r.get('totalVendido') || 0),
      total_ganancia: Number(r.get('total_ganancia') || 0)
    }));
  } catch (error) {
    console.error('top10Productos error:', error);
    return [];
  }
}

export async function top10Ventas() {
  try {
    const results = await DetalleVenta.findAll({
      attributes: [
        'producto_id',
        [fn('SUM', col('cantidad')), 'totalVendido'],
        [fn('SUM', col('subtotal')), 'total_ganancia'],
      ],
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['nombre', 'marca']
        }
      ],
      group: ['producto_id', 'producto.id'],
      order: [[literal('SUM(subtotal)'), 'DESC']],
      limit: 10
    });


    return results.map(r => ({
      producto: r.get('producto'),
      totalVendido: Number(r.get('totalVendido') || 0),
      total_ganancia: Number(r.get('total_ganancia') || 0)
    }));
  } catch (error) {
    console.error('top10Ventas error:', error);
    return [];
  }
}
