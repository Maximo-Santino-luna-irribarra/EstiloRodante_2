import adminService from '../service/admin.service.js'

const admin= [];

const getAlladmins = (req, res) =>{
    const admin = adminService.getAll()
    res.status(200).json(admin)
}

const getadminById = (req, res) =>{
    const { id } = req.params;
    const admin = adminService.getById(id)
    res.status(200).json(admin);
}

const createadmin = (req, res)=>{
    const admin = req.body;
    const newadmin = adminService.create(admin)
    res.status(201).json(newadmin)
}

const getCombined = (req, res) =>{
    const {id} = req.params
    if(!id){
        const admin = adminService.getAll()
        res.status(200).json(admin)
    }

    const adminFound = adminService.getById(id)
    if(!adminFound){
        res.status(404).json({estado: "No Encontrado"})
    }
    res.status(200).json(adminFound)
}

export default { getAlladmins, getadminById, createadmin, getCombined }