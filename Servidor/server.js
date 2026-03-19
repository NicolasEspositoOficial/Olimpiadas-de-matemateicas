const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE BASE DE DATOS (POOL) ---
// Hostinger inyecta estas variables (process.env) automáticamente desde el panel
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificación inicial de conexión (Aparecerá en tu consola)
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ ERROR DE CONEXIÓN A LA DB:", err.message);
    } else {
        console.log("🚀 POOL DE CONEXIÓN LISTO: Base de datos vinculada con éxito.");
        connection.release();
    }
});

// --- RUTAS DEL API ---

// 1. Obtener Ranking de estudiantes
app.get('/usuarios', (req, res) => {
    const query = "SELECT id, nombre, grado, aciertos, tiempo FROM usuarios WHERE rol = 'estudiante' ORDER BY aciertos DESC, tiempo ASC";
    pool.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// 2. Guardar Resultado del examen
app.post('/guardar-resultado', (req, res) => {
    const { nombre, grado, aciertos, tiempo } = req.body;
    if (!nombre || !grado) return res.status(400).json({ error: "Datos incompletos" });
    
    const query = "INSERT INTO usuarios (nombre, grado, aciertos, tiempo, rol, contraseña) VALUES (?, ?, ?, ?, 'estudiante', '123')";
    pool.query(query, [nombre, grado, aciertos, tiempo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Éxito", id: result.insertId });
    });
});

// 3. Obtener Preguntas por Grado
app.get('/preguntas', (req, res) => {
    const { grado } = req.query;
    pool.query("SELECT * FROM preguntas WHERE grado = ?", [grado], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// 4. Admin: Guardar o Actualizar Pregunta
app.post('/guardar-pregunta', (req, res) => {
    const { id, grado, titulo, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta } = req.body;
    
    // Si el id contiene 'temp', lo tratamos como nuevo registro (null)
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

// 5. Eliminar Pregunta
app.delete('/eliminar-pregunta/:id', (req, res) => {
    pool.query("DELETE FROM preguntas WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Pregunta eliminada" });
    });
});

// --- SERVIR FRONTEND (REACT BUILD) ---
// Sube un nivel para encontrar la carpeta 'build' desde 'Servidor'
const buildPath = path.resolve(__dirname, '..', 'build');
app.use(express.static(buildPath));

// Manejo de rutas de React
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 8081; 
app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`Servidor Olimpiadas v2 activo en puerto: ${PORT}`);
    console.log(`Buscando carpeta build en: ${buildPath}`);
    console.log(`-------------------------------------------`);
});