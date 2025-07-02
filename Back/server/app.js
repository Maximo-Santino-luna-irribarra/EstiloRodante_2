// Imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from '../routes/admin.router.js';
import clienteRoutes from '../routes/cliente.router.js';
import ventaRoutes from '../routes/venta.router.js';
import productoRoutes from '../routes/producto.router.js';
import cors from 'cors';
import authRoutes from '../routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

// Necesario para usar __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización de Express
const app = express();

// Settings
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../views'));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// Rutas API
app.use('/api/admin', adminRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/auth', authRoutes);

// Rutas vistas
app.get('/', (req, res) => res.render('login'));
app.get('/editar/:id', (req, res) => res.render('editar'));
app.get('/agregar', (req, res) => res.render('agregar'));
app.get('/login', (req, res) => res.render('login'));
app.get('/dashboard', (req, res) => res.render('dashboard'));

// Listener
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});
