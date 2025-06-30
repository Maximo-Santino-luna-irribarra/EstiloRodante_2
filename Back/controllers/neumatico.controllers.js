import * as neumaticoService from '../service/neumatico.service.js';

export const getAllNeumaticos = async (req, res) => {

    const neumaticos = await neumaticoService.getNeumaticos();
    
    if (!neumaticos || neumaticos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron neumáticos' });
    }

    res.json(neumaticos);
};

export const getNeumatico = async (req, res) => {

  const neumatico = await neumaticoService.getNeumaticoById(req.params.id);

    if (!neumatico) return res.status(404).json({ error: 'Neumático no encontrado' });
  // Si el neumático no se encuentra, se devuelve un error 404

  // Si se encuentra, se devuelve el neumático en formato JSON
    res.json(neumatico);
};

export const postNeumatico = async (req, res) => {

  const nuevo = await neumaticoService.createNeumatico(req.body);
  if (!nuevo) return res.status(400).json({ error: 'Error al crear el neumático' });
  // Si hay un error al crear el neumático, se devuelve un error 400

    res.status(201).json(nuevo);

};

export const putNeumatico = async (req, res) => {
  const actualizado = await neumaticoService.updateNeumatico(req.params.id, req.body);
  if (!actualizado) return res.status(404).json({ error: 'Neumático no encontrado' });
  res.json(actualizado);

};

export const deleteNeumatico = async (req, res) => {

  const eliminado = await neumaticoService.deleteNeumatico(req.params.id);

  if (!eliminado) return res.status(404).json({ error:'Neumático no encontrado'});

  res.json({ message: 'Neumático eliminado correctamente' });
  
};


export const listarPaginado = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const { rows, count } = await neumaticoService.getNeumaticosPaginados(limit, offset);
      const totalPages = Math.ceil(count / limit);

      res.render("neumaticos", {
        neumaticos: rows,
        currentPage: page,
        totalPages,
      });
    }
    catch (error) {
      console.error('Error al obtener neumáticos paginados:', error);
      res.status(500).json({ error: 'Error al obtener neumáticos paginados' });
    }
  }

