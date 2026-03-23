// 1. Cargar variables de entorno al principio de todo
require('dotenv').config(); 

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE BASE DE DATOS (POOL) ---
// Ahora leerá correctamente los datos de tu panel de Hostinger o archivo .env
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'u971714708_olipiadas', 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME || 'u971714708_olipiadas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificación inicial de conexión para ver errores en los logs
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ ERROR DE CONEXIÓN A LA DB:", err.code, err.message);
    } else {
        console.log("🚀 CONEXIÓN EXITOSA: Base de datos vinculada.");
        connection.release();
    }
});

// --- RUTAS DEL API ---

app.get('/usuarios', (req, res) => {
    const query = "SELECT id, nombre, grado, aciertos, tiempo FROM usuarios WHERE rol = 'estudiante' ORDER BY aciertos DESC, tiempo ASC";
    pool.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

app.post('/guardar-resultado', (req, res) => {
    const { nombre, grado, aciertos, tiempo } = req.body;
    if (!nombre || !grado) return res.status(400).json({ error: "Datos incompletos" });
    const query = "INSERT INTO usuarios (nombre, grado, aciertos, tiempo, rol, contraseña) VALUES (?, ?, ?, ?, 'estudiante', '123')";
    pool.query(query, [nombre, grado, aciertos, tiempo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Éxito", id: result.insertId });
    });
});

app.get('/preguntas', (req, res) => {
    const { grado } = req.query;
    pool.query("SELECT * FROM preguntas WHERE grado = ?", [grado], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

app.post('/guardar-pregunta', (req, res) => {
    const { id, grado, titulo, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta } = req.body;
    const idReal = (id && String(id).includes('temp')) ? null : id;
    const query = `
        INSERT INTO preguntas (id, grado, titulo, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        titulo=VALUES(titulo), enunciado=VALUES(enunciado), 
        opcion_a=VALUES(opcion_a), opcion_b=VALUES(opcion_b), 
        opcion_c=VALUES(opcion_c), opcion_d=VALUES(opcion_d), 
        respuesta_correcta=VALUES(respuesta_correcta)
    `;
    const values = [idReal, grado, titulo, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta];
    pool.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Éxito", id: result.insertId || idReal });
    });
});

app.delete('/eliminar-pregunta/:id', (req, res) => {
    pool.query("DELETE FROM preguntas WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Pregunta eliminada" });
    });
});

// --- SERVIR FRONTEND (REACT BUILD) ---
// IMPORTANTE: Como server.js y build están ahora en la misma carpeta raíz
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Manejo de rutas de React (SPA) para que no den 404 al recargar
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// --- INICIO ---
// Hostinger asigna el puerto automáticamente mediante process.env.PORT
const PORT = process.env.PORT || 8081; 
app.listen(PORT, () => {
    console.log(`Servidor activo en puerto: ${PORT}`);
    console.log(`Sirviendo archivos desde: ${buildPath}`);
});