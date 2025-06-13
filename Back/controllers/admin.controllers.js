import adminService from '../service/admin.service.js'

const createAdmin = (req, res)=>{
    const admin = req.body;
    const newadmin = adminService.setAdmin(admin)
    return res.status(201).json(newadmin)
}

const getCombined = async (req, res) =>{
    const {id} = req.params
    if(!id){
        const admin = await adminService.getAll()
        return res.status(200).json(admin)
    }

    const adminFound = await adminService.getById(id)
    if(!adminFound){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(adminFound)
}

const updateAdmin = async(req, res) =>{
    const {id} = req.params
    const {name, email} = req.body
    const updatedAdmin = await adminService.updateAdmins(id, name, email)
    if(!updatedAdmin){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(updatedAdmin)
}

export default { createAdmin, getCombined, updateAdmin }