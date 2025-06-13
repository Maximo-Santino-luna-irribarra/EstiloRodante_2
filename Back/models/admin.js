import {db} from "../database/db.js";

class Admin{
    constructor(nombre, email){
        this.nombre = nombre
        this.email = email
        this.contra = crypto.randomUUID()
    }
}

const getAdmins = () => {
  return new Promise((res, rej) => {
    db.query("SELECT * FROM admins", (err, rows) => {
      if (err) return rej(err);
      res(rows);
    });
  });
};

const getAdminsByID = (id) =>{
    db.query("SELECT * FROM admins WHERE id = ?", [id], (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})
}

const setAdmins = (nombre, email) => {
  const newAdmin = new Admin(nombre, email);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO admins (nombre, email, contra) VALUES (?, ?, ?)",
      [newAdmin.nombre, newAdmin.email, newAdmin.contra],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve(newAdmin);
      }
    );
  });
};

const updateAdmins = (id, nombre, email) =>{
    return new Promise((res, rej) =>{
        db.query("UPDATE admins SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id], (err) => {
        if (err) {
            return rej(err)
        }
        return res({id, nombre, email})
    })
    })
}

const deleteAdmins = (id) =>{
     return new Promise((res,rej ) =>{db.query("DELETE FROM admins WHERE id = ?", [id], (err) => {
        if (err) {
            return reg(err)
        }
        return res({message: "Admin deleted successfully"})
    })
})}

export default { getAdmins, getAdminsByID, setAdmins, updateAdmins, deleteAdmins }