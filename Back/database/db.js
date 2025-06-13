import mysql from "mysql";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Frias5033'
});

db.query("CREATE DATABASE IF NOT EXISTS estilorodante", (err, result) => {
  if (err) {
    console.error("Error al crear la base de datos:", err.message);
    return;
  }
  console.log("Base de datos 'estilorodante' creada o ya existente.");

  // Conectar a la base una vez creada
  const dbConexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Frias5033',
    database: 'estilorodante'
  });

  dbConexion.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err.message);
      return;
    }
    console.log("✅ Conectado a la base de datos estilorodante");
    

    dbConexion.query("CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), email VARCHAR(255), contra VARCHAR(255))", (err, result) => {
    if (err) {
        console.error("Error al crear la tabla 'admin':", err.message);
        return;
    }
    console.log("Tabla 'admins' creada o ya existente.");

    dbConexion.query(`CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreCliente VARCHAR(255)
    )`, (err, result) => {
        if (err) {
            console.error("Error al crear la tabla 'clientes':", err.message);
            return;
        }
        console.log("Tabla 'clientes' creada o ya existente.");
    });

    dbConexion.query(`CREATE TABLE IF NOT EXISTS llantas(
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
        )`, (err, result) =>{
            if (err) {
                console.error("Error al crear la tabla 'llantas':", err.message);
                return;
            }
            console.log("Tabla 'llantas' creada o ya existente.")
        })

        dbConexion.query(`CREATE TABLE IF NOT EXISTS neumaticos(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombreNeumatico VARCHAR(255),
            marca VARCHAR(255),
            modelo VARCHAR(255),
            medida VARCHAR(255),
            indiceCarga INT,
            indiceVelocidad VARCHAR(255),
            tecnologia VARCHAR(255),
            precio INT,
            stock INT
        )`, (err, result) =>{
            if (err){
                console.error("Error al crear la tabla 'neumaticos':", err.message);
                return;
            }
            console.log("Tabla 'neumaticos' creada o ya existentes.")
        })

        dbConexion.query(`CREATE TABLE IF NOT EXISTS detalle_ventas(
                id INT AUTO_INCREMENT PRIMARY KEY,
                producto_id INTEGER NOT NULL,
                tipo_producto VARCHAR(255), -- 'llanta' o 'neumatico'
                cantidad INTEGER NOT NULL,
                subtotal INT NOT NULL
            )`, (err, result) =>{
                if (err){
                    console.error("Error al crear la tabla 'detalle_ventas':", err.message);
                    return;
                }
                console.log("Tabla 'detalle_ventas' creada o ya existente.")
        })
    })
  });
});

export default db;
