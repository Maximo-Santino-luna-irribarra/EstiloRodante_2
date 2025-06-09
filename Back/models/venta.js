const db = require('./db');

function registrarVenta(nombreCliente, productos) {
  const fecha = new Date().toISOString();
  const total = productos.reduce((sum, p) => sum + p.subtotal, 0);

  db.serialize(() => {
    db.run(`INSERT INTO cliente (nombre_cliente) VALUES (?)`, [nombreCliente], function (err) {
      if (err) return console.error(err.message);
      const clienteId = this.lastID;

      db.run(`INSERT INTO venta (cliente_id, fecha, total) VALUES (?, ?, ?)`, [clienteId, fecha, total], function (err) {
        if (err) return console.error(err.message);
        const ventaId = this.lastID;

        const stmt = db.prepare(`INSERT INTO detalle_venta (venta_id, producto_id, tipo_producto, cantidad, subtotal)
                                  VALUES (?, ?, ?, ?, ?)`);
        productos.forEach(p => {
          stmt.run(ventaId, p.id, p.tipo, p.cantidad, p.subtotal);
        });
        stmt.finalize();

        console.log(`Venta registrada con ID: ${ventaId}`);
      });
    });
  });
}

module.exports = { registrarVenta };
