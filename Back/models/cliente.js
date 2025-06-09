const db = require('./db');

function crearCliente(nombre) {
  db.run(`INSERT INTO cliente (nombre_cliente) VALUES (?)`, [nombre], function (err) {
    if (err) return console.error(err.message);
    console.log(`Cliente creado con ID: ${this.lastID}`);
  });
}

function listarClientes() {
  db.all(`SELECT * FROM cliente`, [], (err, rows) => {
    if (err) return console.error(err.message);
    console.table(rows);
  });
}

function actualizarCliente(id, nuevoNombre) {
  db.run(`UPDATE cliente SET nombre_cliente = ? WHERE id = ?`, [nuevoNombre, id], function (err) {
    if (err) return console.error(err.message);
    console.log(`Cliente actualizado. Cambios: ${this.changes}`);
  });
}

function borrarCliente(id) {
  db.run(`DELETE FROM cliente WHERE id = ?`, [id], function (err) {
    if (err) return console.error(err.message);
    console.log(`Cliente eliminado. Cambios: ${this.changes}`);
  });
}

module.exports = {
  crearCliente,
  listarClientes,
  actualizarCliente,
  borrarCliente
};
