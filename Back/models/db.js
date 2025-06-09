const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('autoservicio.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_cliente TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS llantas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio INT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    material TEXT NOT NULL,
    diametro INT NOT NULL,
    ancho INT NOT NULL,
    alto INT NOT NULL,
    stock INT NOT NULL,
    urlIMG TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS neumaticos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    medida TEXT NOT NULL,
    indiceCarga INT NOT NULL,
    indiceVelocidad TEXT NOT NULL,
    tecnologia TEXT NOT NULL,
    precio INT NOT NULL,
    stock INT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS venta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    fecha TEXT NOT NULL,
    total INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS detalle_venta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    tipo_producto TEXT NOT NULL, -- 'llanta' o 'neumatico'
    cantidad INTEGER NOT NULL,
    subtotal INT NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES venta(id)
  )`);
});

module.exports = db;
