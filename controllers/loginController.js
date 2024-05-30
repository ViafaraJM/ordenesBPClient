import { User } from '../models/usuariomodel.js';

// Define el controlador de inicio de sesión
export class LoginController {
  // Método para manejar las solicitudes de inicio de sesión
    login = async (req, res) => {
        try {
        const { username, password } = req.body;

        // Verifica que se hayan proporcionado las credenciales de inicio de sesión
        if (!username || !password) {
            return res.status(400).json({
            success: false,
            message: 'Username and password are required'
            });
        }

      // Verifica las credenciales de inicio de sesión
        const user = await User.findOne({ username });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
            });
        }

      // Si las credenciales son válidas, crea una respuesta de éxito
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
            id: user.id,
            username: user.username,
            email: user.email
            }
        });
        } catch (error) {
        console.error('Error handling login request:', error.message);

        // Si ocurre un error, crea una respuesta de error
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
        }
    };
}