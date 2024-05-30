const axios = require('axios');
const IHandler = require('./IHandler.js');
const CacheHandler = require('./CacheHandler.js');

// Define la clase AuthenticationHandler que extiende de IHandler
class AuthenticationHandler extends IHandler {
    /**
     * Crea una nueva instancia de AuthenticationHandler.
     * @param {string} apiKey - La clave API de Clerk.
     */
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
        this.cacheHandler = new CacheHandler();
    }

    /**
     * Maneja la solicitud de autenticación utilizando la clave API de Clerk.
     * @param {Request} request - La solicitud a ser manejada.
     * @returns {Promise<Request>} - La solicitud procesada o datos en caché.
     */
    async handle(request) {
        try {
        // Utiliza el método handle de CacheHandler para manejar la solicitud en caché
        const handledRequest = await this.cacheHandler.handle(request);

        // Si la solicitud no está en caché, verifica la autenticación en la API de Clerk
        if (!handledRequest.user) {
            const response = await axios.post('', {
            username: request.username,
            password: request.password
            }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
            });

            // Si la autenticación es exitosa, actualiza la solicitud con los datos del usuario
            if (response.status === 200) {
            handledRequest.user = response.data;
            }
        }
        return handledRequest;
        } catch (error) {
        throw new Error('Authentication or cache error');
        }
    }
}

// Exporta la clase AuthenticationHandler como el valor por defecto del módulo
module.exports = AuthenticationHandler;