'use strict'


// require question model here
const Question = require('../model/questions');

// require answer mode here
const Answer = require('../model/answers')

// add helper to get payload
const jwt = require('../helper/jwtHelper');

exports.findById = (req,res) => {
  console.log(req.locals.id)
  if(req.query.id_question) {
    var query = {
      'id_user': `${req.locals.id}`,
      'id_question': `${req.query.id_question}`,
    }
  } else {
    var query = {
      'id_user': `${req.locals.id}`
    }
  }
  Answer.find(query)
  .populate('id_user')
  .populate('id_question', '_id title content')
  .then((documents) => {
    res.send(documents)
  })
  .catch((error) => {
    res.send(error)
  })
}


exports.create = (req,res) => {
  let user = req.locals
  var addAnswer = {
    id_user: `${user.id}`,
    id_question: `${req.query.id_question}`,
    content: `${req.body.content}`
  }
  Answer.create(addAnswer)
  .then((answerRes) => {
    let queryQuestion = {
      '_id': `${answerRes.id_question}`
    }

    let questionUpdate = {
      answer: `${answerRes._id}`
    }

    Question.updateOne(queryQuestion, {$push: questionUpdate})
    .then((result) => {
      res.send(result)
    })
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.delete = (req,res) => {
  let query = {
    '_id': `${req.query.id_answer}`
  }
  Answer.deleteOne(query)
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.voteUp = (req,res) => {
  let user = req.locals
  let query = {
    '_id': `${req.query.id_answer}`,
    'id_user': `${user.id}`
  }
  let voteUp = {
    votedup: `${user.id}`
  }

  Answer.updateOne(query, {$addToSet: voteUp})
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.voteDown = (req,res) => {
  let user = req.locals
  let query = {
    '_id': `${req.query.id_answer}`,
    'id_user': `${user.id}`
  }
  let voteDown = {
    voteddown: `${user.id}`
  }

  Answer.updateOne(query, {$addToSet: voteDown})
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.send(error)
  })
}