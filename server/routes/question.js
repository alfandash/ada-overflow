var express = require('express');
var router = express.Router();

// add controllers
const jwt = require('../helper/jwtHelper');

// require question controllers
const questionController = require('../controllers/question')

//router.use(jwt.loginCheck)

router.get('/all', questionController.findAll)
router.get('/',jwt.tokenDecoded, questionController.findById)
router.get('/:id', jwt.tokenDecoded, questionController.findByQuestionId)
router.post('/',jwt.tokenDecoded, questionController.create)
router.put('/',jwt.tokenDecoded, questionController.edit)
router.delete('/',jwt.tokenDecoded, questionController.delete)

router.post('/voteup', jwt.tokenDecoded, questionController.voteUp)
router.post('/votedown', jwt.tokenDecoded, questionController.voteDown)

router.post('/answer', jwt.tokenDecoded, questionController.answer)

module.exports = router;


