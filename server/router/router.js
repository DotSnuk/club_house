const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller');

function logFunction() {
  console.log('just loggin');
}

router.post('/createUser', controller.createUser);
// router.post('/login', logFunction, controller.loginUser);
router.use('/success', controller.successLogin);
router.use('/failed', controller.failedLogin);

router.get('/', (req, res) => {
  console.log('inside /');
  console.log(req.user);
  res.render('index', { user: req.user });
});

module.exports = router;
