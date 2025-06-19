import Neumatico from '../models/neumaticos.js';

export const getNeumaticos = async () => await Neumatico.findAll();

export const getNeumaticoById = async (id) => await Neumatico.findByPk(id);

export const createNeumatico = async (data) => await Neumatico.create(data);

export const updateNeumatico = async (id, data) => {

    const neumatico = await Neumatico.findByPk(id);

    if (!neumatico) return null;
    // Si el neumático no se encuentra, se devuelve null
    return await neumatico.update(data);
        
    };

    export const deleteNeumatico = async (id) => {

    const neumatico = await Neumatico.findByPk(id);

    if (!neumatico) return null;
    // Si el neumático no se encuentra, se devuelve null
    await neumatico.destroy();

    return true;
    };

