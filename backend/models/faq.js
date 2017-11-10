
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
 var mongoosePaginate = require('mongoose-paginate');
  
const Faq = new Schema({
    question: String,
    answer: String,
     created_at:  { type: Date},
  updated_at:  { type: Date}
  
})

// create new User document
Faq.statics.create = function(question, answer) {
  var created_at=  Date.now();

    const Faq = new this({
       question, answer ,created_at      
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