const auth = require('basic-auth');

module.exports = (req, res, next) => {

    const user = auth(req);

    // buscar en la BD en usuario user.name y si lo encuentro, verifico la pass (user.pass)

    if(!user || user.name !== 'admin' || user.pass !== '1234') {
        res.set('www-Authenticate', 'Basic realm=Athorization required');
        res.sendStatus(401);
        return
    }

    next()
}