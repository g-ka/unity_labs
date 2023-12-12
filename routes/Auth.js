const express = require('express');
const router = express.Router();
const auth_controller = require('../controller/Auth_controller');

router.post('/register', auth_controller.register_handler);
router.post('/login', auth_controller.login_handler);
router.get('/session', auth_controller.session_handler);
router.get('/log_out', auth_controller.log_out_handler);

module.exports = router