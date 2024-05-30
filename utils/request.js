// Importa la clase Request desde el archivo 'request.js'
import Request from './request';

// Importa axios para hacer peticiones HTTP
import axios from 'axios';

// Define una función que haga una petición GET a la API y devuelva una nueva instancia de Request
async function getRequestFromApi() {
    try {
        // Hace una petición GET a la API
        const response = await axios.get('https://example.com/api/request');

        // Obtiene los valores de la respuesta de la API
        const { username, password, data, ipAddress } = response.data;

        // Crea una nueva instancia de Request con los valores obtenidos desde la API
        const myRequest = new Request(username, password, data, ipAddress);

        // Devuelve la nueva instancia de Request
        return myRequest;
    } catch (error) {
        console.error(error);
    }
}

// Llama a la función getRequestFromApi para obtener una nueva instancia de Request
const myRequest = await getRequestFromApi();

// Accede a las propiedades de la instancia de Request
console.log(myRequest.username);
console.log(myRequest.password);
console.log(myRequest.data);
console.log(myRequest.ipAddress);