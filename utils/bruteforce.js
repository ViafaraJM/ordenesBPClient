import express from 'express';
import BruteForceFilterHandler from './handlers/BruteForceFilterHandler.js';
import loginController from './controllers/loginController.js';

// Crea una instancia de la clase BruteForceFilterHandler
const bruteForceFilterHandler = new BruteForceFilterHandler();

// Crea una instancia de la aplicación express
const app = express();

// Utiliza el middleware de JSON para las solicitudes
app.use(express.json());

// Define la ruta de inicio de sesión
app.post('/login', bruteForceFilterHandler.handle.bind(bruteForceFilterHandler), loginController.login);

// Inicia el servidor express en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});