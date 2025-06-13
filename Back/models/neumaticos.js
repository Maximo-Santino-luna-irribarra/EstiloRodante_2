import {db} from "../database/db.js";

class Neumaticos{
    constructor(nombre, email){
        this.nombre = nombre
        this.email = email
        this.contra = crypto.randomUUID()
    }
}

const getNeumaticoss = () => {
  return new Promise((res, rej) => {
    db.query("SELECT * FROM neumaticoss", (err, rows) => {
      if (err) return rej(err);
      res(rows);
    });
  });
};

const getNeumaticossByID = (id) =>{
    db.query("SELECT * FROM neumaticoss WHERE id = ?", [id], (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})
}

const setNeumaticoss = (nombre, email) => {
  const newNeumaticos = new Neumaticos(nombre, email);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO neumaticoss (nombre, email, contra) VALUES (?, ?, ?)",
      [newNeumaticos.nombre, newNeumaticos.email, newNeumaticos.contra],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve(newNeumaticos);
      }
    );
  });
};

const updateNeumaticoss = (id, nombre, email) =>{
    return new Promise((res, rej) =>{
        db.query("UPDATE neumaticoss SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id], (err) => {
        if (err) {
            return rej(err)
        }
        return res({id, nombre, email})
    })
    })
}

const deleteNeumaticoss = (id) =>{
     return new Promise((res,rej ) =>{db.query("DELETE FROM neumaticoss WHERE id = ?", [id], (err) => {
        if (err) {
            return reg(err)
        }
        return res({message: "Neumaticos deleted successfully"})
    })
})}

export default { getNeumaticoss, getNeumaticossByID, setNeumaticoss, updateNeumaticoss, deleteNeumaticoss }