const { Usuario } = require('../models');

class PrivadoController {
    async index(req, res, next) {
        try {
            const usuarioId = req.session.usuarioLogado;
            //Localizamos al usuario
            const usuario = await Usuario.findById(usuarioId);

            if (!usuario) {
                next(new Error('Usuario no encontrado'));
                return;
            }

            res.render('privado', { email: usuario.email }); //Tb se puede usar res.ocals
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PrivadoController;
