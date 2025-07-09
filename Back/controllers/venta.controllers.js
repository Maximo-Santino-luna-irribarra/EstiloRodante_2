import * as ventaService from '../service/venta.service.js';

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
