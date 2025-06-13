//import
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from '../routes/admin.router.js'

// Necesario para usar __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//settings
const app = express();
app.set("PORT", 5000);
app.set("view engine", "ejs");

// ✅ Ajustar ruta a /Back/views
app.set("views", path.join(__dirname, '../views'));


//middlewares
app.use(express.json())

// ✅ Ajustar ruta a /Back/public
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/api/admin', adminRoutes)


// Configurar EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Ajustá si tus vistas están fuera de /Back

//listener

app.listen(app.get("PORT"), ()=>
    console.log(`Server corriendo en localhost:${app.get("PORT")}`)
)