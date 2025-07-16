const service = require('../services/encuestaService');

exports.crear = async (req, res) => {
  try {
    const encuesta = await service.crearEncuesta(req.body);
    res.status(201).json(encuesta);
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos' });
  }
};

exports.omitir = async (req, res) => {
  try {
    const omitida = await service.registrarOmitida(req.body.email);
    res.status(201).json(omitida);
  } catch (err) {
    res.status(400).json({ error: 'Email inválido' });
  }
};

exports.listar = async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    const resultados = await service.obtenerEncuestas(desde, hasta);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener encuestas' });
  }
};
