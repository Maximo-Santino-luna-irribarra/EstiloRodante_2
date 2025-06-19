// Back/controllers/llanta.controller.js
import * as llantaservice from '../service/llanta.service.js';

export const getAllLlantas = async (req, res) => {
    const llantas = await llantaservice.getLlantas();
    res.json(llantas);
};

export const getLlanta = async (req, res) => {

    const llanta = await llantaservice.getLlantaById(req.params.id);

    if (!llanta) return res.status(404).json({ error: 'Llanta no encontrada' });
    // Si la llanta no se encuentra, se devuelve un error 404
    res.json(llanta);

};

export const postLlanta = async (req, res) => {

    const nueva = await llantaservice.createLlanta(req.body);

    res.status(201).json(nueva);
};

export const putLlanta = async (req, res) => {

    const actualizada = await llantaservice.updateLlanta(req.params.id, req.body);
    // Actualiza la llanta con los datos proporcionados en el cuerpo de la solicitud
    if (!actualizada) return res.status(404).json({ error: 'Llanta no encontrada' });
    // Si la llanta no se encuentra, se devuelve un error 404

    // Si se encuentra, se devuelve la llanta actualizada en formato JSON
    res.json(actualizada);
};

export const deleteLlanta = async (req, res) => {

    const eliminada = await llantaservice.deleteLlanta(req.params.id);
    // Elimina la llanta con el ID proporcionado en los parámetros de la solicitud
    if (!eliminada) return res.status(404).json({ error: 'Llanta no encontrada' });
    // Si la llanta no se encuentra, se devuelve un error 404
    res.json({ message: 'Llanta eliminada correctamente' });
};
