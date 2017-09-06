'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
  id_user: {type: Schema.ObjectId, ref: 'user'},
  id_question: {type: Schema.ObjectId, ref: 'question'},
  content: {type: String, required: true},
  votedup: [{type: Schema.ObjectId, ref: 'user'}],
  voteddown: [{type: Schema.ObjectId, ref: 'user'}],
  created_at: {type: Date, default: new Date()},
  updated_at: {type: Date, default: new Date()}
})

var Answers = mongoose.model('answer', answerSchema);

module.exports = Answers


// id_answer
// id_user (  Schema.Types.ObjectId ) << author
// content ( String )
// voted [Schema.Types.ObjectId]
// created_at (Date)
// updated_at (Date)