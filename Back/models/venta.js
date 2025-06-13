import {db} from "../database/db.js";

class Ventas{
    constructor(id_producto, tipo, cantidad, subtotal){
        this.id_producto = id_producto
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}

const getVentas = () => {
  return new Promise((res, rej) => {
    db.query("SELECT * FROM detalle_ventas", (err, rows) => {
      if (err) return rej(err);
      res(rows);
    });
  });
};

const getVentasByID = (id) =>{
    db.query("SELECT * FROM detalle_ventas WHERE id = ?", [id], (err, rows) =>{
    if (err) {
        return err
    }
    return rows
})
}

const setVentas = (nombre, email) => {
  const newVenta = new Venta(nombre, email);
  return new Promise((res, rej) => {
    db.query(
      "INSERT INTO detalle_ventas (nombre, email, contra) VALUES (?, ?, ?)",
      [newVenta.nombre, newVenta.email, newVenta.contra],
      (err) => {
        if (err) {
          return rej(err);
        }
        res(newVenta);
      }
    );
  });
};

const updateVentas = (id, nombre, email) =>{
    return new Promise((res, rej) =>{
        db.query("UPDATE detalle_ventas SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id], (err) => {
        if (err) {
            return rej(err)
        }
        return res({id, nombre, email})
    })
    })
}

const deleteVentas = (id) =>{
     return new Promise((res,rej ) =>{db.query("DELETE FROM detalle_ventas WHERE id = ?", [id], (err) => {
        if (err) {
            return reg(err)
        }
        return res({message: "Venta deleted successfully"})
    })
})}

export default { getVentas, getVentasByID, setVentas, updateVentas, deleteVentas }