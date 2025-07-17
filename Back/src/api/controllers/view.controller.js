import { mostrarAsistencias } from '../controllers/admin.controllers.js';
export const renderLogin = (req, res) => res.render('login');
export const renderDashboard = (req, res) => res.render('dashboard');
export const renderEditar = (req, res) => res.render('editar');
export const renderAgregar = (req, res) => res.render('agregar');
export const renderVentas = (req, res) => res.render('vista_ventas');
export const renderClientes = (req, res) => res.render('vista_clientes');
export const renderAsistencias = (req, res) => res.render('asistencia',mostrarAsistencias);
