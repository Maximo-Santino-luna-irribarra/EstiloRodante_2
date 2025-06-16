import {db} from "../database/db.js";

class Neumaticos{
    constructor(nombre, marca, modelo, medida, tecnologia, precio, stock){
        this.nombre = nombre
        this.marca = marca
        this.modelo = modelo
        this.medida = medida
        this.tecnologia = tecnologia
        this.precio = precio
        this.stock = stock
    }
}

const getNeumaticos = () => {
  return new Promise((res, rej) => {
    db.query("SELECT * FROM neumaticos", (err, rows) => {
      if (err) return rej(err);
      res(rows);
    });
  });
};

const getNeumaticosByID = (id) =>{
  return new Promise ((res, rej) =>{
    db.query("SELECT * FROM neumaticos WHERE id = ?", [id], (err, rows) =>{
    if (err) {
        return rej(err)
    }
    return res(rows)
    })
  })

}

const setNeumaticos = (nombre, marca, modelo, medida, tecnologia, precio, stock) => {
  const newNeumaticos = new Neumaticos(nombre, marca, modelo, medida, tecnologia, precio, stock);
  return new Promise((res, rej) => {
    db.query(
      "INSERT INTO neumaticos (nombreNeumatico, marca, modelo, medida, tecnologia, precio, stock) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [newNeumaticos.nombre, newNeumaticos.marca, newNeumaticos.modelo, newNeumaticos.medida, newNeumaticos.tecnologia, newNeumaticos.precio, newNeumaticos.stock],
      (err) => {
        if (err) {
          return rej(err);
        }
        res(newNeumaticos);
      }
    );
  });
};

const updateNeumaticos = (id, nombre, marca, modelo, medida, tecnologia, precio, stock) =>{
    return new Promise((res, rej) =>{
        db.query("UPDATE neumaticos SET nombreNeumatico = ?, marca = ?, modelo = ?, medida = ?, indiceCarga = ?, indiceVelocidad = ?, tecnologia = ?, precio = ?, stock = ? WHERE id = ?", [nombre, marca, modelo, medida, tecnologia, precio, stock, id], (err) => {
        if (err) {
            return rej(err)
        }
            return res({id, nombre, marca, modelo, medida, tecnologia, precio, stock})

    })
    })
}

const deleteNeumaticos = (id) =>{
     return new Promise((res,rej ) =>{db.query("DELETE FROM neumaticos WHERE id = ?", [id], (err) => {
        if (err) {
            return rej(err)
        }
        return res({message: "Neumaticos deleted successfully"})
    })
})}

export default { getNeumaticos, getNeumaticosByID, setNeumaticos, updateNeumaticos, deleteNeumaticos }