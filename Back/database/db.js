import mysql from "mysql";

let db;

const initDB = () => {
  const tempDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Frias5033'// NO OLVIDES CAMBIAR ESTO POR TU CONTRASEÑA
  });

  tempDb.query("CREATE DATABASE IF NOT EXISTS estilorodante", (err) => {
    if (err) {
      console.error("Error al crear la base de datos:", err.message);
      return;
    }
    console.log("Base de datos 'estilorodante' creada o ya existente.");

    db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Frias5033',// NO OLVIDES CAMBIAR ESTO POR TU CONTRASEÑA
      database: 'estilorodante'
    });

    db.connect((err) => {
      if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
        return;
      }
      console.log("Conectado a la base de datos estilorodante");

      db.query(`CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255),
        email VARCHAR(255),
        contra VARCHAR(255)
      )`);

      db.query(`CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombreCliente VARCHAR(255)
      )`);

      db.query(`CREATE TABLE IF NOT EXISTS llantas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombreLLanta VARCHAR(255),
        precio INT NOT NULL,
        marca VARCHAR(255),
        modelo VARCHAR(255),
        material VARCHAR(255),
        diametro INT NOT NULL,
        ancho INT NOT NULL,
        alto INT NOT NULL,
        stock INT NOT NULL,
        urlIMG VARCHAR(255),
        activo BOOLEAN NOT NULL
      )`);

      db.query(`CREATE TABLE IF NOT EXISTS neumaticos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombreNeumatico VARCHAR(255),
        marca VARCHAR(255),
        modelo VARCHAR(255),
        medida VARCHAR(255),
        tecnologia VARCHAR(255),
        precio INT,
        stock VARCHAR(255)
      )`);

      db.query(`CREATE TABLE IF NOT EXISTS detalle_ventas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        producto_id INT NOT NULL,
        tipo_producto VARCHAR(255),
        cantidad INT NOT NULL,
        subtotal INT NOT NULL
      )`);

      

    });
  });
};

initDB();

export { db };
