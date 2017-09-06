var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users')


/* GET users listing. */
router.get('/', usersController.index);
router.post('/', usersController.register);
router.delete('/', usersController.destroy);

router.post('/signin', usersController.signin);


module.exports = router;
