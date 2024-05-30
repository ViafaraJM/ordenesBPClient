const express = require('express');
const router = express.Router();
const { autenticacion, cache, fuerzaBruta, validador, orden, usuario } = require('../models');

router.post('/usuarios', async (req, res) => {
    const datosUsuario = req.body;
    try {
        const usuarioCreado = await usuario.crearUsuario(datosUsuario);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/usuarios/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    try {
        const confirmaciónEliminación = await usuario.eliminarUsuario(idUsuario);
        res.status(200).json(confirmaciónEliminación);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/usuarios/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    const datosUsuario = req.body;
    try {
        const usuarioEditado = await usuario.editarUsuario(idUsuario, datosUsuario);
        res.status(200).json(usuarioEditado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;