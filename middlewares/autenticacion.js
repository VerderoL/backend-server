var jwt = require('jsonwebtoken');

var SEMILLA = require('../config/config').SEMILLA;


// ==================================================
// Verificar Token
// ==================================================

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEMILLA, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        // Esto es para enviar que usuario ha sido el que ha hecho
        // la petición get, post, put... la que toque
        // y de esta manera contralar quien hace cambios

        req.usuario = decoded.usuario;

        next();

    })
}