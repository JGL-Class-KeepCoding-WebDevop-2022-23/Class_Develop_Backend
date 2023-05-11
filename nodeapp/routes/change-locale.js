const express = require('express');
const router = express.Router();

/*GET /change-locale */
router.get('/:locale', (req, res, next) => {
    const locale = req.params.locale;

    // Poner una cokie en la respuesta que indiqie el nuevo locale al browser
    res.cookie('nodeapp-locale', locale, {
        maxAge: 1000 * 60 * 60 *24 * 30
    })
    // Responder con una redirección a la página de donde venía la petición con referer de la cabecera de la peticion
    res.redirect(req.get('referer'));
});

module.exports = router;
