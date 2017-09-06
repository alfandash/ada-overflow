var express = require('express');
var router = express.Router();

// add controllers
const jwt = require('../helper/jwtHelper');

// require question controllers
const answerController = require('../controllers/answer')

router.get('/',jwt.tokenDecoded, answerController.findById)
router.post('/', jwt.tokenDecoded, answerController.create)
router.delete('/',jwt.tokenDecoded, answerController.delete)

// voted route
router.post('/voteup', jwt.tokenDecoded, answerController.voteUp)
router.post('/votedown', jwt.tokenDecoded, answerController.voteDown)

module.exports = router;
