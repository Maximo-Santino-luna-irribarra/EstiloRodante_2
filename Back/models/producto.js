const db = require('./db');

function agregarLlanta(llanta) {
  const { nombre, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG } = llanta;
  db.run(`INSERT INTO llantas (nombre, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG],
    function (err) {
      if (err) return console.error(err.message);
      console.log(`Llanta creada con ID: ${this.lastID}`);
    });
}

function listarLlantas() {
  db.all(`SELECT * FROM llantas`, [], (err, rows) => {
    if (err) return console.error(err.message);
    console.table(rows);
  });
}

function agregarNeumatico(neumatico) {
  const { nombre, marca, modelo, medida, indiceCarga, indiceVelocidad, tecnologia, precio, stock } = neumatico;
  db.run(`INSERT INTO neumaticos (nombre, marca, modelo, medida, indiceCarga, indiceVelocidad, tecnologia, precio, stock)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, marca, modelo, medida, indiceCarga, indiceVelocidad, tecnologia, precio, stock],
    function (err) {
      if (err) return console.error(err.message);
      console.log(`Neumático creado con ID: ${this.lastID}`);
    });
}

function listarNeumaticos() {
  db.all(`SELECT * FROM neumaticos`, [], (err, rows) => {
    if (err) return console.error(err.message);
    console.table(rows);
  });
}

module.exports = {
  agregarLlanta,
  listarLlantas,
  agregarNeumatico,
  listarNeumaticos
};
