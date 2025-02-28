const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller');

router.post('/createUser', controller.createUser);

router.get('/', (req, res) => {});

module.exports = router;
