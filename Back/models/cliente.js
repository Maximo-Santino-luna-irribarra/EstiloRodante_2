import {db} from "../database/db.js";


class Cliente {
  constructor(nombre) {
    this.nombre = nombre;
  }
}


const crearCliente =  (nombre) => {

  const nuevoCliente = new Cliente(nombre);

  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO cliente (nombre) VALUES (?)`,
    [nuevoCliente.nombre], 
      (err) =>{
        if (err) {
          return reject(err);
        }
        resolve({ nuevoCliente });
      });
  });

};

const getClientesById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM cliente WHERE id = ?`, [id], (err, rows) => {
      if (err) {
        return reject(err);
      }
      if (rows.length === 0) {
        return resolve(null);
      }
      resolve(rows[0]);
    });
  });
}
const getClientes = () => {
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM cliente`, (err, rows) => {
      if (err) {
        return reject(err);
      }
      res(rows);
    });
  });
}

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



const actualizarClientes = (id, nuevoNombre) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE cliente SET nombre_cliente = ? WHERE id = ?`, [nuevoNombre, id], (err) => {
      if (err) {
        return reject(err);
      }
      resolve({ id, nuevoNombre });
    });
  });
};



const borrarClientes = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM cliente WHERE id = ?`, [id], (err) => {
      if (err) {
        return reject(err);
      }
      return res({ id });
    });
  });
};

export default {crearCliente,listarClientes,actualizarClientes,borrarClientes,getClientesById,getClientes};
