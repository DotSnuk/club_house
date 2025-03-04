const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller');

router.post('/createUser', controller.createUser);
router.post('/login', controller.loginUser);

router.get('/', (req, res) => {});

module.exports = router;
