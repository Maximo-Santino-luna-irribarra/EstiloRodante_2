import db from "./db";

export class Admin{
    constructor(name, email, contra){
        this.id = crypto.randomUUID();
        this.name = name
        this.email = email
        this.contra = contra
    }
}

const obtenerAdmins = () =>{
    db.all("SELECT * FROM admin", (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})

}

export default { obtenerAdmins }