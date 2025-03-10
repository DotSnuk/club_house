const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller');

router.post('/createUser', controller.createUser);
router.post('/login', controller.loginUser);
router.get('/logout', controller.logout);
router.get('/auth/status', controller.authStatus);
// router.use('/success', controller.successLogin);
// router.use('/failed', controller.failedLogin);

router.get('/', (req, res) => {});

module.exports = router;
