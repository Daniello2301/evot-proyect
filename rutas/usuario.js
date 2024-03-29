const { Router } = require('express');
const contrUsuario = require('../controladores/usuario');
const { jwtValidador, isAdmin } = require('../middleware/jwt_validador');
const { check } = require('express-validator');

const router = Router();

// listar todo y por Id
router.get('/users', 
[
    jwtValidador,
    isAdmin
],
contrUsuario.listarUsarios);

router.get('/user/:id', 
[
    jwtValidador
],
contrUsuario.listPorId);


// Login
router.post('/auth', 
[
    check('correo', 'El correo es requerido').notEmpty(),
    check('correo', 'El formato del correo es invalido').isEmail(),
    check('contraseña', 'Contraseña requerida').notEmpty()
]
,contrUsuario.login);


// Registro
router.post('/auth/register', 
[
    jwtValidador,
    isAdmin,
    [
        check('nombreUsuario', 'El nombre de usuario es requerido').notEmpty(),
        check('correo', 'El correo es requerido').notEmpty(),
        check('correo', 'El formato del correo es invalido').isEmail(),
        check('rol', 'El rol es requerido').notEmpty()
    ]
],
contrUsuario.register);


// deshabilidar usario
router.put('/deactivate/user/:id',
[
    jwtValidador,
    isAdmin
],
contrUsuario.deshabilitarUsuario);


// Activar Usuario
router.put('/activate/user/:id', 
[
    jwtValidador,
    isAdmin
],
contrUsuario.activarUsuario);

// Borrar gradudo
/* router.delete('/delete/graduado/:id', controladorGraduados.deleteGraduado); */

module.exports = router;