//import
import express from 'express';
import adminRoutes from '../routes/admin.router.js'

//settings
const app = express();
app.set("PORT", 5000);

//middlewares
app.use(express.json())

// routes
app.use('/api/admin', adminRoutes)

//listener
app.listen(app.get("PORT"), ()=>
    console.log(`Server corriendo en localhost:${app.get("PORT")}`)
)