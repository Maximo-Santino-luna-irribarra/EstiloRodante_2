import ventaService from '../service/venta.service.js'

const createVenta = (req, res)=>{
    const venta = req.body;
    const newventa = ventaService.setVenta(venta)
    return res.status(201).json(newventa)
}

const getCombined = async (req, res) =>{
    const {id} = req.params
    if(!id){
        const venta = await ventaService.getAll()
        return res.status(200).json(venta)
    }

    const ventaFound = await ventaService.getById(id)
    if(!ventaFound){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(ventaFound)
}

const updateVenta = async(req, res) =>{
    const {id} = req.params
    const {producto_id, tipo_producto, cantidad, subtotal} = req.body
    const updatedVenta = await ventaService.updateVentas(id, producto_id, tipo_producto, cantidad, subtotal)
    if(!updatedVenta){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(updatedVenta)
}


const deleteVenta = async(req, res) =>{
    const {id} = req.params
    const deletedVenta = await ventaService.deleteVentas(id)
    if(!deletedVenta){
        return res.status(404).json({estado: "No Encontrado o eliminado"})
    }
    return res.status(200).json(deleteVenta)
}

const getByTipo = async (req, res) => {
    const {tipo} = req.params;
    const ventasByTipo = await ventaService.getByTipo(tipo);
    if (!ventasByTipo) {
        return res.status(404).json({ estado: "No Encontrado" });
    }
    return res.status(200).json(ventasByTipo);
};

const getByProductoID = async (req, res) => {
    const {id} = req.params;
    const ventasByProductoID = await ventaService.getByProductoID(id);
    if (!ventasByProductoID) {
        return res.status(404).json({ estado: "No Encontrado" });
    }
    return res.status(200).json(ventasByProductoID);
};

export default { createVenta, getCombined, updateVenta, deleteVenta, getByTipo, getByProductoID };