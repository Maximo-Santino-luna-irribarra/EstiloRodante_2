// Imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from './api/routes/admin.router.js';
import clienteRoutes from './api/routes/cliente.router.js';
import ventaRoutes from './api/routes/venta.router.js';
import productoRoutes from './api/routes/producto.router.js';
import cors from 'cors';
import authRoutes from './api/routes/auth.route.js';
import {SERVER_PORT} from './config/envConfig.js'
import upload from './api/middlewares/multerMiddleware.js';
import viewRoutes from './api/routes/view.router.js';
import './api/models/relacionesl.js'
import { sequelize } from './api/models/relacionesl.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización de Express
const app = express();

// Settings
const PORT = SERVER_PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'web', 'views'));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'web', 'public')));

app.use(cors());

// Rutas API
app.use('/api/admin', adminRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/auth', authRoutes);

// Rutas views
app.use('/', viewRoutes);

// Ruta para subir archivos
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.');
  }
  res.status(200).json({ file: { path: `/images/${req.file.filename}`}});
});

// Confir bdd
(async () => {
  await sequelize.authenticate();
  console.log('DB conectada y asociaciones cargadas');
})();

// Listener
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});
