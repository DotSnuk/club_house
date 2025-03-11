const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller');

router.post('/createUser', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/logout', controller.logout);
router.get('/auth/status', controller.authStatus);
router.get('/getForums', controller.getForums);
// router.use('/success', controller.successLogin);
// router.use('/failed', controller.failedLogin);

router.get('/', (req, res) => {});

module.exports = router;
