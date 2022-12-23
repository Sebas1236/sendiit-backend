/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearUsuario, loginUsuario, verificarUsuario ,revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isRoleValid } = require('../helpers/db-validators');


const router = Router();

router.post(
    '/new', 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('last_name', 'Los apellidos son obligatorios').not().isEmpty(),
        check('password', 'El password debe ser de mínimo 6 caracteres').isLength({ min:6 }),
        check('role').custom( isRoleValid ),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [//middlewares
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario
);

router.get(
    '/confirm/:confirmationCode',
    verificarUsuario,
);

router.get('/renew', validarJWT, revalidarToken);


module.exports = router;