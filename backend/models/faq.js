
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
 var mongoosePaginate = require('mongoose-paginate');
  
const Faq = new Schema({
    question: String,
    answer: String
  
})

// create new User document
Faq.statics.create = function(question, answer) {
 

    const Faq = new this({
       question, answer       
    })

    // return the Promise
    return Faq.save()
}

// find one user by using username
Faq.statics.findOneByUsername = function(question) {
    return this.findOne({
        question        
    }).exec()
}



Faq.plugin(mongoosePaginate);
module.exports = mongoose.model('Faq', Faq)