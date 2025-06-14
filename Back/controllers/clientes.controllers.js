import clienteService from '../service/cliente.service.js';



const createCliente = async (req, res) => {
    try {
        console.log('Body recibido:', req.body);  // Para verificar
        const cliente = req.body;
        if (!cliente.nombre) {
        return res.status(400).json({ error: 'Falta el nombre del cliente' });
        }
        const newCliente = await clienteService.setClientes(cliente);
        return res.status(201).json(newCliente);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear cliente' });
    }
    };
const getCombined = async (req, res) =>{
    const {id} = req.params
    if(!id){
        const cliente = await clienteService.getAll()
        return res.status(200).json(cliente)
    }

    const clienteFound = await clienteService.getById(id)
    if(!clienteFound){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(clienteFound)
}

const updateCliente = async(req, res) =>{
    const {id} = req.params
    const {nuevoNombre} = req.body
    const upCliente = await clienteService.updateClientes(id, nuevoNombre)
    if(!upCliente){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(upCliente)
}


const deletedCliente = async(req, res) =>{
    const {id} = req.params
    const deletedCliente = await clienteService.deleteClientes(id)
    if(!deletedCliente){
        return res.status(404).json({estado: "No Encontrado o eliminado"})
    }
    return res.status(200).json(deletedCliente)


}
export default { createCliente, getCombined, updateCliente, deletedCliente};