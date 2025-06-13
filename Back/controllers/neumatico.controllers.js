import neumaticoService from '../service/neumatico.service.js'

const createNeumatico = (req, res)=>{
    const neumatico = req.body;
    const newneumatico = adminService.setNeumatico(neumatico)
    return res.status(201).json(newneumatico)
}

const getCombined = async (req, res) =>{
    const {id} = req.params
    if(!id){
        const admin = await neumaticoService.getAll()
        return res.status(200).json(admin)
    }

    const adminFound = await neumaticoService.getById(id)
    if(!adminFound){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(adminFound)
}

const updateNeumatico = async(req, res) =>{
    const {id} = req.params
    const {name, email} = req.body
    const updatedNeumatico = await neumaticoService.updateNeumaticos(id, name, email)
    if(!updatedNeumatico){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(updatedNeumatico)
}


const deleteNeumatico = async(req, res) =>{
    const {id} = req.params
    const deletedNeumatico = await neumaticoService.deleteNeumaticos(id)
    if(!deletedNeumatico){
        return res.status(404).json({estado: "No Encontrado o eliminado"})
    }
    return res.status(200).json(deleteNeumatico)
}
export default { createNeumatico, getCombined, updateNeumatico, deleteNeumatico };