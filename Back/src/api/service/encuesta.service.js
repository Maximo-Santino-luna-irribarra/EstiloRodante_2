import Encuesta from '../models/encuesta.js';
import EncuestaOmitida from '../models/encuestaOmitida.js';

export const  crearEncuesta = async (datos) => {
  const nueva = await Encuesta.create(datos);
  return nueva;
}

export const registrarOmitida =  async (email) => { 
  const omitida = await EncuestaOmitida.create({ email });
  return omitida;
}

export const obtenerEncuestas= async(desde, hasta) =>{
  const filtro = {};
  if (desde) filtro.fecha = { [Op.gte]: new Date(desde) };
  if (hasta) filtro.fecha = { ...(filtro.fecha || {}), [Op.lte]: new Date(hasta) };

  const completadas = await Encuesta.findAll({ where: filtro, order: [['fecha', 'DESC']] });
  const omitidas = await EncuestaOmitida.findAll({ where: filtro, order: [['fecha', 'DESC']] });

  return { completadas, omitidas };
}

