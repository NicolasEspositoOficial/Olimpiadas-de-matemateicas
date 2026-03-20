const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE BASE DE DATOS (POOL) ---
// Usamos process.env para que la contraseña no viaje en el código
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'u971714708_olipiadas', 
    password: process.env.DB_PASS, // <--- Hostinger leerá esto de su panel
    database: process.env.DB_NAME || 'u971714708_olipiadas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificación inicial de conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ ERROR DE CONEXIÓN A LA DB:", err.message);
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
const buildPath = path.resolve(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// --- INICIO ---
const PORT = process.env.PORT || 8081; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en puerto: ${PORT}`);
});