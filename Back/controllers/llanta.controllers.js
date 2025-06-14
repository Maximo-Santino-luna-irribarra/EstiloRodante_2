import llantaservice from "../service/llanta.service.js";  


const createLlanta = async (req, res) => {
    const  llanta = req.body;
    const newLlanta = await llantaservice.setLlanta(llanta);
    return res.status(201).json(newLlanta);
}

const getCombined = async (req, res) => {
    const {id} = req.params;
    if(!id){
        const llantas = await llantaservice.getAll();
        return res.status(200).json(llantas);
    }

    const llantaFound = await llantaservice.getById(id);
    if(!llantaFound){
        return res.status(404).json({estado: "No Encontrado"});
    }
    return res.status(200).json(llantaFound);
}

const updateLlanta = async (req, res) => {
    const {id} = req.params;
    console.log("ID:", id);
    console.log("Body:", req.body);
    const {nombreLLanta, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG, activo} = req.body;
    
    if (!nombreLLanta || !precio || !marca || !modelo || !material || !diametro || !ancho || !alto || !stock || !urlIMG) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const upLlanta = await llantaservice.updateLlanta(id, nombreLLanta,precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG, activo);
    if(!upLlanta){
        return res.status(404).json({estado: "No Encontrado"});
    }
    return res.status(200).json(upLlanta);
}


const deletedLlanta = async (req, res) => {
    const {id} = req.params;
    const deletedLlanta = await llantaservice.deleteLlanta(id);
    if(!deletedLlanta){
        return res.status(404).json({estado: "No Encontrado o eliminado"});
    }
    return res.status(200).json(deletedLlanta);
}


export default { createLlanta, getCombined, updateLlanta, deletedLlanta };