
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
 var mongoosePaginate = require('mongoose-paginate');
  
const Contact = new Schema({
    name: String,
    email: String,
    company: String,
    contact:String,
    remark:String,
    view:String,
    date:  { type: Date, default: Date.now }

  
})

// create new User document
Contact.statics.create = function(name, email,company,contact,remark) {
 
     this.view='not';
    const Contact = new this({
    name, email,company,contact,remark 
    })
    // return the Promise
    return Contact.save()
}

// find one user by using username
Contact.statics.findOneByUsername = function(email) {
    return this.findOne({
        email        
    }).exec()
}


Contact.plugin(mongoosePaginate);
module.exports = mongoose.model('Contact', Contact)