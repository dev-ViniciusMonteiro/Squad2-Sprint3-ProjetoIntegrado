const passport = require('passport');
const database = require('../models')

module.exports = {
    local: async(req, res, next) => {
        if (!req.body.id && req.body.cpf) {
            const dadosUsuario = await database.Usuario.findOne({ where: { cpf: req.body.cpf } })
            const dadosLogin = await database.Login.findOne({ where: { usuario_id: dadosUsuario.id } })
            req.body.id = dadosLogin.id
        } else {
            if (!req.body.id) {
                return res.status(401).json({ erro: "Argumento inválido!" })
            }
        }
        passport.authenticate(
            'local', { session: false },
            (erro, usuario, info) => {
                if (erro && erro.name === 'InvalidArgumentError') {
                    return res.status(401).json({ erro: "Argumento inválido!" })
                }
                if (erro) {
                    return res.status(500).json({ erro: "Argumento inválido!" })
                }
                if (!usuario) {
                    return res.status(401).json()
                }
                req.user = usuario
                console.log(req.user.id)
                return next()
            }
        )(req, res, next);
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer', { session: false },
            async(erro, usuario, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (erro) {
                    return res.status(500).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (!usuario) {
                    return res.status(401).json()
                }
                req.user = usuario;
                const dadosUsuario = await database.Usuario.findByPk(usuario.usuario_id)
                req.user.nome = dadosUsuario.nome
                if (usuario.senha.indexOf("$14") === 3) {
                    req.user.Admin = true
                    console.log("ADMIN" + " Nome: " + dadosUsuario.nome)
                } else {
                    req.user.Admin = false
                }
                return next();
            }
        )(req, res, next);
    },
    beareradm: (req, res, next) => {
        passport.authenticate(
            'bearer', { session: false },
            async(erro, usuario, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (erro) {
                    return res.status(500).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (!usuario) {
                    return res.status(401).json()
                }
                req.user = usuario;
                const dadosUsuario = await database.Usuario.findByPk(usuario.usuario_id)
                    //console.log(dadosUsuario)
                if (usuario.senha.indexOf("$14") === 3) {
                    req.user.Admin = true
                    console.log("ADMIN" + " Nome: " + dadosUsuario.nome)
                } else {
                    return res.status(500).json({ erro: "Voce nao administrador!" })
                }
                return next();
            }
        )(req, res, next);
    }
}