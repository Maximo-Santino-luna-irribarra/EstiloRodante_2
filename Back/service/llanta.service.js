// Back/services/llanta.service.js
import Llanta from '../models/llanta.js';

export const getLlantas = async () => await Llanta.findAll();

export const getLlantaById = async (id) => await Llanta.findByPk(id);

export const createLlanta = async (data) => await Llanta.create(data);

export const updateLlanta = async (id, data) => {
    const llanta = await Llanta.findByPk(id);
    if (!llanta) return null;
    return await llanta.update(data);
};

export const deleteLlanta = async (id) => {
    const llanta = await Llanta.findByPk(id);
    if (!llanta) return null;
    await llanta.destroy();
    return true;
};

