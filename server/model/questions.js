'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
  id_user: [{type: Schema.ObjectId, ref: 'user'}],
  title: {type: String, required: true},
  content: {type: String, required: true},
  answer: [{type: Schema.ObjectId, ref: 'answer'}],
  votedup: [{type: Schema.ObjectId, ref: 'user'}],
  voteddown: [{type: Schema.ObjectId, ref: 'user'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})

var Questions = mongoose.model('question', questionSchema);

module.exports = Questions

// Question
// id_question
// id_user ( Schema.Types.ObjectId ) << author
// title  ( String )
// content ( String ) << input bisa menggunakan html editor
// answer [ array objid id]
// voted [Schema.Types.ObjectId]
// created_at (Date)
// updated_at (Date)