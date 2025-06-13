import {db} from "../database/db.js";

class Neumaticos{
    constructor(nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock){
        this.marca = marca
        this.modelo = modelo
        this.medida = medida
        this.indiceCarga = indiceCarga
        this.indiceVelocudad = indiceVelocudad
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
    db.query("SELECT * FROM neumaticos WHERE id = ?", [id], (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})
}

const setNeumaticos = (nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock) => {
  const newNeumaticos = new Neumaticos(nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock);
  return new Promise((res, rej) => {
    db.query(
      "INSERT INTO neumaticos (nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [newNeumaticos.nombre, newNeumaticos.email, newNeumaticos.contra, newNeumaticos.marca, newNeumaticos.modelo, newNeumaticos.medida, newNeumaticos.indiceCarga, newNeumaticos.indiceVelocudad, newNeumaticos.tecnologia, newNeumaticos.precio, newNeumaticos.stock],
      (err) => {
        if (err) {
          return rej(err);
        }
        res(newNeumaticos);
      }
    );
  });
};

const updateNeumaticos = (id, nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock) =>{
    return new Promise((res, rej) =>{
        db.query("UPDATE neumaticos SET nombreNeumatico = ?, marca = ?, modelo = ?, medida = ?, indiceCarga = ?, indiceVelocidad = ?, tecnologias = ?, precio = ?, stock = ? WHERE id = ?", [nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock], (err) => {
        if (err) {
            return rej(err)
        }
            return res({id, nombre, marca, modelo, medida, indiceCarga, indiceVelocudad, tecnologia, precio, stock})

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