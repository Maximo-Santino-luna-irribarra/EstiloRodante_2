import {db} from "../database/db.js";


class Llanta {
    constructor(nombreLLanta, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG, activo) {
        this.nombreLLanta = nombreLLanta;
        this.precio = precio;
        this.marca = marca;
        this.modelo = modelo;
        this.material = material;
        this.diametro = diametro;
        this.ancho = ancho;
        this.alto = alto;
        this.stock = stock;
        this.urlIMG = urlIMG;
        this.activo = activo;
    }
}


const crearLlanta = (llanta) => {
    return new Promise((res, rej) => {
        db.query(
        `INSERT INTO llantas (
            nombreLLanta, precio, marca, modelo, material,
            diametro, ancho, alto, stock, urlIMG, activo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            llanta.nombreLLanta,
            llanta.precio,
            llanta.marca,
            llanta.modelo,
            llanta.material,
            llanta.diametro,
            llanta.ancho,
            llanta.alto,
            llanta.stock,
            llanta.urlIMG,
            llanta.activo
        ],
        (err) => {
            if (err) return rej(err);
            res(llanta); // igual que setNeumaticos
        }
        );
    });
};



const getLlantaById = (id) => {
    return new Promise((res, rej) => {
        db.query(`SELECT * FROM llantas WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                return rej(err);
            }
            if (rows.length === 0) {
                return res(null);
            }
            res(rows[0]);
        });
    });
}

const getLlantas = () => {
    return new Promise((res, rej) => {
        db.query(`SELECT * FROM llantas`, (err, rows) => {
            if (err) {
                return rej(err);
            }
            res(rows);
        });
    });
}


const listarLlantas = () => {
    return new Promise((res, rej) => {
        db.query(`SELECT * FROM llantas`, (err, rows) => {
            if (err) {
                return rej(err);
            }
            res(rows);
        });
    });
}

const actualizarllantas = (id, nombreLLanta, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG, activo) => {
    return new Promise((res, rej) => {
        db.query(`UPDATE llantas SET nombreLLanta = ?, precio = ?, marca = ?, modelo = ?, material = ?, diametro = ?, ancho = ?, alto = ?, stock = ?, urlIMG = ?, activo = ? WHERE id = ?`, 
        [nombreLLanta, precio, marca, modelo, material, diametro, ancho, alto, stock, urlIMG, activo, id], 
        (err) => {
            if (err) {
                return rej(err);
            }
            res({ id, });
        });
    });
}



const borrarLlantas = (id) => {
    return new Promise((res, rej) => {
        db.query(`DELETE FROM llantas WHERE id = ?`, [id], (err) => {
            if (err) {
                return rej(err);
            }
            return res({ id });
        });
    });
};


export default {actualizarllantas, borrarLlantas, crearLlanta, getLlantaById, getLlantas, listarLlantas};
