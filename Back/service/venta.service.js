//presistencia
import venta from '../models/venta.js'

const getAll =async ()=>{
    return await venta.getVentas()
};

const getById = async (id) =>{
    return venta.getVentasByID(id)
}

const setVenta = (a) =>{
    return venta.setVentas(a.name, a.email)
}

const updateVentas = (id, nombre, email) =>{
    return venta.updateVentas(id, nombre, email)
}

const deleteVentas = async (id) =>{
    return venta.deleteVentas(id)
}


export default { getAll , getById, setVenta, updateVentas, deleteVentas };