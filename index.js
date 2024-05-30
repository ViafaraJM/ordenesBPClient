// Importa Express y otras dependencias
const express = require('express');
const bodyParser = require('body-parser');

// Importa la clase AuthenticationHandler
const AuthenticationHandler = require('./AuthenticationHandler');

// Crea una nueva instancia de Express
const app = express();

// Agrega el middleware de body-parser
app.use(bodyParser.json());

// Crea una nueva instancia de AuthenticationHandler
const authHandler = new AuthenticationHandler('tu_clave_api_de_clerk');

// Define una ruta de ejemplo
app.post('/login', async (req, res) => {
    try {
        // Llama al método handle de la instancia de AuthenticationHandler
        const request = await authHandler.handle(req);

        // Si la autenticación es exitosa, devuelve una respuesta de éxito
        res.status(200).json({
        success: true,
        message: 'Authenticated successfully',
        user: request.user
        });
    } catch (error) {
        // Si la autenticación falla, devuelve una respuesta de error
        res.status(401).json({
        success: false,
        message: 'Authentication failed',
        error: error.message
        });
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});