//presistencia
import venta from '../models/venta.js'

const getAll =async ()=>{
    return await venta.getVentas()
};

const getById = async (id) =>{
    return venta.getVentasByID(id)
}

const setVenta = (a) =>{
    return venta.setVentas(a.producto_id, a.tipo_producto, a.cantidad, a.subtotal)
}

const updateVentas = (id, producto_id, tipo_producto, cantidad, subtotal) =>{
    return venta.updateVentas(id, producto_id, tipo_producto, cantidad, subtotal)
}

const deleteVentas = async (id) =>{
    return venta.deleteVentas(id)
}


export default { getAll , getById, setVenta, updateVentas, deleteVentas };