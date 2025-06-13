import db from "../database/db.js";

class Admin{
    constructor(nombre, email){
        this.nombre = nombre
        this.email = email
        this.contra = crypto.randomUUID()
    }
}

const getAdmins = () =>{
    db.all("SELECT * FROM admin", (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})
}

const getAdminsByID = (id) =>{
    db.all("SELECT * FROM admin WHERE id = ?", [id], (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})
}

const setAdmins = (nombre, email) =>{
    const newAdmin = new Admin(nombre, email)
    db.run("INSERT INTO admin (nombre, email, contra) VALUES (?, ?, ?)", [newAdmin.nombre, newAdmin.email, newAdmin.contra], (err) => {
        if (err) {
            return err
        }
        return newAdmin
    })
}

const updateAdmins = (id, nombre, email) =>{
    db.run("UPDATE admin SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id], (err) => {
        if (err) {
            return err
        }
        return {id, nombre, email}
    })
}

const deleteAdmins = (id) =>{
    db.run("DELETE FROM admin WHERE id = ?", [id], (err) => {
        if (err) {
            return err
        }
        return {message: "Admin deleted successfully"}
    })
}

export default { getAdmins, getAdminsByID, setAdmins, updateAdmins, deleteAdmins }