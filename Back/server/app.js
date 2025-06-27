//import
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from '../routes/admin.router.js'
import clienteRoutes from '../routes/cliente.router.js'
import neumaticoRoutes from '../routes/neumatico.router.js'
import ventaRoutes from '../routes/venta.router.js'
import llantaRoutes from '../routes/llanta.router.js';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


// Necesario para usar __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
//settings
const app = express();
app.set("PORT",process.env.SERVER_PORT)
app.set("view engine", "ejs");

// ✅ Ajustar ruta a /Back/views
app.set("views", path.join(__dirname, '../views'));


//middlewares
app.use(express.json())

// ✅ Ajustar ruta a /Back/public
app.use(express.static(path.join(__dirname, '../public')));

//uso de cors
app.use(cors());

// routes
app.use('/api/admin', adminRoutes)
app.use('/api/cliente', clienteRoutes)
app.use('/api/neumatico', neumaticoRoutes)
app.use('/api/llanta', llantaRoutes) 
app.use('/api/ventas', ventaRoutes)

app.listen(app.get("PORT"), ()=>
    console.log(`Server corriendo en localhost:${app.get("PORT")}`)
)
// Configurar EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Ajustá si tus vistas están fuera de /Back

app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista index.ejs
})
app.get('/editar/{:id}', (req, res) => {
    res.render('editar');
})

app.get('/agregar', (req, res) => {
    res.render('agregar');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
}  )
//listener



