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
  return new Promise((res, rej) => {
      db.query("SELECT * FROM detalle_ventas WHERE id = ?", [id], (err, rows) =>{
      if (err) {
          return rej(err)
      }
      return res(rows)
    })
  })
  }

const getVentasByProductosID = (id) =>{
  return new Promise((res, rej) => {
      db.query("SELECT * FROM detalle_ventas WHERE producto_id = ?", [id], (err, rows) =>{
      if (err) {
          return rej(err)
      }
      return res(rows)
    })
  })
  }

const getVentasByTipo = (id) =>{
  return new Promise((res, rej) => {
      db.query("SELECT * FROM detalle_ventas WHERE tipo_producto = ?", [id], (err, rows) =>{
      if (err) {
          return rej(err)
      }
      return res(rows)
    })
  })
  }

const setVentas = (producto_id, tipo_producto, cantidad, subtotal) => {
  const newVenta = new Ventas(producto_id, tipo_producto, cantidad, subtotal);
  return new Promise((res, rej) => {
    db.query(
      "INSERT INTO detalle_ventas (producto_id, tipo_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)",
      [newVenta.id_producto, newVenta.tipo, newVenta.cantidad, newVenta.subtotal],
      (err) => {
        if (err) {
          return rej(err);
        }
        res(newVenta);
      }
    );
  });
};

const updateVentas = (id, producto_id, tipo_producto, cantidad, subtotal) =>{
    return new Promise((res, rej) =>{
        db.query("UPDATE detalle_ventas SET producto_id = ?, tipo_producto = ?, cantidad = ?, subtotal = ? WHERE id = ?", [producto_id, tipo_producto, cantidad, subtotal, id], (err) => {
        if (err) {
            return rej(err)
        }
        return res({id, producto_id, tipo_producto, cantidad, subtotal})
    })
    })
}

const deleteVentas = (id) =>{
     return new Promise((res,rej ) =>{db.query("DELETE FROM detalle_ventas WHERE id = ?", [id], (err) => {
        if (err) {
            return rej(err)
        }
        return res({message: "Venta deleted successfully"})
    })
})}

export default { getVentas, getVentasByID, setVentas, updateVentas, deleteVentas }