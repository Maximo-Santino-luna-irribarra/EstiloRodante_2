import {db} from "../database/db.js";


class Cliente {
  constructor(nombre) {
    this.nombre = nombre;
  }
}


const crearCliente =  (nombre) => {

  const nuevoCliente = new Cliente(nombre);

  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO cliente (nombre_cliente) VALUES (?)`,
    [nuevoCliente.nombre], 
      (err) =>{
        if (err) {
          return reject(err);
        }
        resolve({ nuevoCliente });
      });
  });

};

const listarClientes = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM cliente`, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}



const actualizarCliente = (id, nuevoNombre) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE cliente SET nombre_cliente = ? WHERE id = ?`, [nuevoNombre, id], (err) => {
      if (err) {
        return reject(err);
      }
      resolve({ id, nuevoNombre });
    });
  });
};



const borrarCliente = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM cliente WHERE id = ?`, [id], (err) => {
      if (err) {
        return reject(err);
      }
      return res({ id });
    });
  });
};

export default {crearCliente,listarClientes,actualizarCliente,borrarCliente}
