const express = require('express');
const path = require('path');
const app = express();

// 1. Configuración de rutas estáticas
// Usamos '../build' porque el archivo está dentro de la carpeta 'Servidor'
// y necesita subir un nivel para encontrar la carpeta de producción.
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

// 2. Rutas de API (Opcional)
// Si en el futuro necesitas endpoints para tu base de datos, irían aquí:
// app.get('/api/usuarios', (req, res) => { ... });

// 3. GESTIÓN DE RUTAS FRONTEND (La solución al error 404)
// Esta función captura CUALQUIER ruta que el usuario escriba en el navegador
// y le entrega el index.html para que React Router tome el control.
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
        if (err) {
            res.status(500).send("Error: No se encontró la carpeta build o el archivo index.html. Asegúrate de haber corrido 'npm run build'.");
        }
    });
});

// 4. Configuración del puerto
// En producción, el servidor usará el puerto que le asigne el hosting (process.env.PORT)
// En local, usará el 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(`Servidor de Olimpiadas Matemáticas activo`);
    console.log(`Puerto: ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`--------------------------------------------------`);
});