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
import multer from 'multer';
dotenv.config();

// Necesario para usar __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Multer para manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });


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
app.get('/vista_ventas', (req, res) => res.render('vista_ventas'));
app.get('/vista_clientes', (req, res) => res.render('vista_clientes'));

// Ruta para subir archivos
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.');
  }
  res.status(200).json({ file: { path: `/images/${req.file.filename}`}});
});

// Listener
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});
