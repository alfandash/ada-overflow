'use strict'

// require users model
const User = require('../model/users')

// require helper generate salt
const generateSecretKey = require('../helper/generateAlphaNumeric');

//require helper to convert pass
const convertPass = require('../helper/convertPass');

// require jwt helper
const jwt = require('../helper/jwtHelper');

exports.userInfo = (req,res) => {
  // console.log('masuk cuy')
  console.log(req.locals)
  res.send(req.locals)
}

exports.index = (req,res) => {
  res.send('respond with a resource');
}

exports.register = (req,res) => {
  var secretKeyLength = process.env.SECRET_LENGTH;
  generateSecretKey(secretKeyLength, (secretKey) => {
    var rawPass = {
      pass: `${req.body.password}`,
      secret: `${secretKey}`
    }
    convertPass(rawPass, (hashPassword) => {
      var add = {
        username: `${req.body.username}`,
        password: `${hashPassword}`,
        email: `${req.body.email}`,
        secret: `${secretKey}`
      }
      
      User.create(add)
      .then((response) => {
        var success = {
          "success": {},
          "message": `Register username ${response.username} berhasil`
        }
        res.send(success)
      })
      .catch((error) => {
        res.send(error)
      })
    })
  })
}

exports.destroy = (req,res) => {
  var id = {'_id': `${req.query.id_user}`}
  User.deleteOne(id)
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.send(error)
  })
}

exports.signin = (req,res) => {
  var secretKeyLength = process.env.SECRET_LENGTH;
  let query = {email: `${req.body.email.toLowerCase()}`}
  User.find(query)
  .then((document) => {
    var rawPass = {
      pass: req.body.password,
      secret: document[0].secret
    }
    convertPass(rawPass, (hashPassword) => {
      if (hashPassword === document[0].password) {
        var payload = {
          id: `${document[0]._id}`,
          username: `${document[0].username}`,
          email: `${document[0].email}`
        }
        jwt.login(payload, (token) => {
          var success = {
            'success' : {},
            'message' : 'Login success',
            'token' : token,
            'username': payload.username,
            'email' : payload.email,
            'id' : payload.id
          }
          res.send(success)
        })
      } else {
        var error = {
          "errors": {},
          "_message": "Password wrong",
          "message": "Password wrong",
          "name": "ValidationError"
        }
        res.send(error)
      }
    })
  })
  .catch((error) => {
    var error = {
      'errors': {},
      '_message': `Cannot find email ${req.body.email}`,
      'message': `Cannot find email ${req.body.email}`,
      'name': 'ValidationError'
    }
    res.send(error)
  })
}