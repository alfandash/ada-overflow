'use strict'

// require question model here
const Question = require('../model/questions');

// require answer mode here
const Answer = require('../model/answers')

// add helper to get payload
const jwt = require('../helper/jwtHelper');

exports.findById = (req,res) => {
  console.log(req.locals.id)
  var query = {'id_user': `${req.locals.id}`}
  Question.find(query)
  .populate('id_user')
  .populate('votedup')
  .populate('answer')
  .then((documents) => {
    res.send(documents)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.create = (req,res) => {
  let user = req.locals
  var add = {
    id_user: `${user.id}`,
    title: `${req.body.title}`,
    content: `${req.body.content}`
  }
  Question.create(add)
  .then((response) => {
    res.send(response)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.edit = (req,res) => {
  let user = req.locals
  let query = {
    '_id': `${req.query.id_question}`,
    'id_user': `${user.id}`
  }
  var questionUpdate = {
    title: `${req.body.title}`,
    content: `${req.body.content}`,
    updated_at: new Date()
  }

  Question.updateOne(query,{$set: questionUpdate})
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.delete = (req,res) => {
  let query = {
    '_id': `${req.query.id_question}`
  }
  Question.deleteOne(query)
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
    '_id': `${req.query.id_question}`,
    'id_user': `${user.id}`
  }
  let voteUp = {
    votedup: `${user.id}`
  }

  Question.updateOne(query, {$addToSet: voteUp})
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
    '_id': `${req.query.id_question}`,
    'id_user': `${user.id}`
  }
  let voteDown = {
    voteddown: `${user.id}`
  }

  Question.updateOne(query, {$addToSet: voteDown})
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.answer = (req,res) => {
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