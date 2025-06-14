import llantas from "../models/llanta.js"; 



const getAll = async () => {
    return await llantas.getLlantas();
}
const getById = async (id) => {
    return await llantas.getLlantaById(id);
}
const setLlanta = async (llanta) => {
    return await llantas.crearLlanta(llanta);
}
const updateLlanta = async (id,  nombreLLanta, precio, marca, modelo,material, diametro, ancho, alto, stock, urlIMG, activo) => {
    return await llantas.actualizarllantas(id,  nombreLLanta,precio, marca, modelo,material, diametro, ancho, alto, stock,urlIMG,activo);
}
const deleteLlanta = async (id) => {
    return await llantas.borrarLlantas(id);
}
export default { getAll, getById, setLlanta, updateLlanta, deleteLlanta };