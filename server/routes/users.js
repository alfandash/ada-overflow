var express = require('express');
var router = express.Router();

// add controllers
const jwt = require('../helper/jwtHelper');

const usersController = require('../controllers/users')


/* GET users listing. */
router.get('/', usersController.index);
router.get('/info', jwt.tokenDecoded,  usersController.userInfo)
router.post('/', usersController.register);
router.delete('/', usersController.destroy);

router.post('/signin', usersController.signin);


module.exports = router;
