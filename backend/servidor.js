const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// CAMBIO: Usamos createPool en lugar de createConnection
const db = mysql.createPool({
    connectionLimit: 10,     // Permite hasta 10 conexiones simultáneas
    host: "localhost",
    user: 'root',
    password: '',            // Verifica si es vacío '' o tiene un espacio ' '
    database: 'prueba 001'
});

app.get('/', (req, res) => {
    return res.json("from backend side");
});

app.get('/usuarios', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    
    // El pool funciona igual que la conexión para queries simples
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error en la consulta:", err); // Es bueno verlo en consola
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Servidor escuchando en el puerto 8081");
});