const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(() => {
  
  const clientesQuery = (`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_cliente TEXT NOT NULL
  )`);

  db.query(clientesQuery, (err)=>{
    if (err){
      console.error("Error creando la tabla clientes:", err.message);
    }
  })

  const adminsQuery = (`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    contra TEXT NOT NULL,
  )`);

  db.query(adminsQuery, (err)=>{
    if (err){
      console.error("Error creando la tabla admins:", err.message);
    }
  })

  const llantasQuery = (`CREATE TABLE IF NOT EXISTS llantas (
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
    urlIMG TEXT NOT NULL,
    activo BOOLEAN NOT NULL
  )`);

  db.query(llantasQuery, (err)=>{
    if (err){
      console.error("Error creando la tabla llantas:", err.message);
    }
  })

  const neumaticosQuery = (`CREATE TABLE IF NOT EXISTS neumaticos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    medida TEXT NOT NULL,
    indiceCarga INT NOT NULL,
    indiceVelocidad TEXT NOT NULL,
    tecnologia TEXT NOT NULL,
    precio INT NOT NULL,
    stock INT NOT NULL,
    activo BOOLEAN NOT NULL
  )`);

  db.query(neumaticosQuery, (err)=>{
    if (err){
      console.error("Error creando la tabla neumaticos:", err.message);
    }
  })

  const ventasQuery = (`CREATE TABLE IF NOT EXISTS detalle_ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producto_id INTEGER NOT NULL,
    tipo_producto TEXT NOT NULL, -- 'llanta' o 'neumatico'
    cantidad INTEGER NOT NULL,
    subtotal INT NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES venta(id)
  )`);

  db.query(ventasQuery, (err)=>{
    if (err){
      console.error("Error creando la tabla ventas:", err.message);
    }
  })
});

module.exports = db;
