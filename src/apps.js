const express = require('express');
const router = require('./routes');

const app = express();

// Configuración del servidor
app.use(express.json());
app.use('/', router);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});