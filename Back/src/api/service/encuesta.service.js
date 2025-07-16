const Encuesta = require('../models/encuesta.js');
const EncuestaOmitida = require('../models/encuestaOmitida.js');

async function crearEncuesta(datos) {
  const nueva = new Encuesta(datos);
  return await nueva.save();
}

async function registrarOmitida(email) {
  const omitida = new EncuestaOmitida({ email });
  return await omitida.save();
}

async function obtenerEncuestas(desde, hasta) {
  const filtro = {};
  if (desde) filtro.fecha = { $gte: new Date(desde) };
  if (hasta) {
    filtro.fecha = filtro.fecha || {};
    filtro.fecha.$lte = new Date(hasta);
  }

  const completadas = await Encuesta.find(filtro).sort({ fecha: -1 });
  const omitidas = await EncuestaOmitida.find(filtro).sort({ fecha: -1 });

  return { completadas, omitidas };
}

module.exports = { crearEncuesta, registrarOmitida, obtenerEncuestas };
