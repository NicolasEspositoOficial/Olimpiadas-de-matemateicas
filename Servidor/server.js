const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json()); 

// --- CONFIGURACIÓN DE BASE DE DATOS (HOSTINGER) ---
const dbConfig = {
    host: "srv1848.hstgr.io", 
    user: "u971714708_olipiadas", 
    password: "1193094006Ni.", 
    database: "u971714708_olipiadas" 
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);

    db.connect((err) => {
        if (err) {
            console.error("❌ ERROR DE CONEXIÓN:", err.message);
            setTimeout(handleDisconnect, 2000); 
        } else {
            console.log("🚀 ¡CONEXIÓN EXITOSA! Base de datos en Hostinger lista.");
        }
    });

    db.on('error', (err) => {
        console.error("⚠️ ERROR EN DB:", err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            handleDisconnect(); 
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// --- RUTAS DEL API ---

// 1. Obtener Ranking
app.get('/usuarios', (req, res) => {
    const query = `
        SELECT id, nombre, grado, aciertos, tiempo 
        FROM usuarios 
        WHERE rol = 'estudiante' 
        ORDER BY aciertos DESC, tiempo ASC
    `;
    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        return res.json(data);
    });
});

// 2. Guardar Resultado
app.post('/guardar-resultado', (req, res) => {
    const { nombre, grado, aciertos, tiempo } = req.body;
    const query = `
        INSERT INTO usuarios (nombre, grado, aciertos, tiempo, rol, contraseña) 
        VALUES (?, ?, ?, ?, 'estudiante', '123')
    `;
    db.query(query, [nombre, grado, aciertos, tiempo], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        return res.json({ message: "Éxito", id: result.insertId });
    });
});

// 3. Obtener Preguntas por Grado
app.get('/preguntas', (req, res) => {
    const { grado } = req.query;
    const query = "SELECT * FROM preguntas WHERE grado = ?";
    db.query(query, [grado], (err, data) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        return res.json(data);
    });
});

// 4. Admin: Guardar/Actualizar Pregunta
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
    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        return res.json({ message: "Éxito", id: result.insertId || idReal });
    });
});

// 5. Eliminar Pregunta
app.delete('/eliminar-pregunta/:id', (req, res) => {
    const query = "DELETE FROM preguntas WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        return res.json({ message: "Pregunta eliminada" });
    });
});

// --- SERVIR FRONTEND (CONFIGURACIÓN PARA HOSTINGER) ---

// Definimos la ruta a la carpeta build (un nivel arriba de /Servidor)
const buildPath = path.resolve(__dirname, '..', 'build');

// Servimos archivos estáticos
app.use(express.static(buildPath));

// MANEJO DE RUTAS DE REACT: Esta ruta DEBE ir al final de todas las API
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
        if (err) {
            res.status(500).send("Error: No se encontró la carpeta build o el archivo index.html");
        }
    });
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 8081; 
app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`Servidor activo en puerto: ${PORT}`);
    console.log(`Ruta build: ${buildPath}`);
    console.log(`-------------------------------------------`);
});