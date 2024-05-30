// Importa Router de express para definir rutas
import { Router } from 'express';
// Crea una nueva instancia de Router
const router = Router();

// Importa la clase Request desde el archivo correspondiente
import Request from '../models/Request.js';
// Importa la clase HandlesChain desde el archivo correspondiente
import HandlesChain from '../chain/HandlesChain.js';

// Importa los manejadores desde sus archivos correspondientes
import AuthenticationHandler from '../handlers/AuthenticationHandler.js';
import SanitizeDataHandler from '../handlers/SanitizeDataHandler.js';
import BruteForceFilterHandler from '../handlers/BruteForceFilterHandler.js';
import CacheHandler from '../handlers/CacheHandler.js';

// Define la ruta POST para procesar solicitudes
router.post('/process-request', async (req, res) => {
  // Extrae los datos necesarios del cuerpo de la solicitud
  const { username, password, data, ipAddress, apiKey } = req.body;

  // Crea una nueva instancia de Request con los datos extraídos
  const request = new Request(username, password, data, ipAddress);

  // Crea una nueva instancia de HandlesChain para manejar la cadena de responsabilidad
  const chain = new HandlesChain();

  // Agrega los manejadores a la cadena en el orden requerido
  chain.addHandler(new AuthenticationHandler(apiKey)); // Maneja la autenticación
  chain.addHandler(new SanitizeDataHandler()); // Sanitiza los datos
  chain.addHandler(new BruteForceFilterHandler()); // Filtra ataques de fuerza bruta
  chain.addHandler(new CacheHandler()); // Maneja el cache

  try {
    // Intenta manejar la solicitud usando la cadena de responsabilidad
    const result = await chain.handle(request);
    // Responde con éxito si la solicitud se procesa correctamente
    res.status(200).json({ message: 'Request processed successfully', data: result });
  } catch (error) {
    // Responde con un error si algo falla durante el procesamiento
    res.status(400).json({ error: error.message });
  }
});

// Exporta el router para su uso en otras partes de la aplicación
export default router;
