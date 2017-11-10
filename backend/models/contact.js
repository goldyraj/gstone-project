
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
    date:  { type: Date, default: Date.now },
 created_at:  { type: Date},
  updated_at:  { type: Date}
  
})

// create new User document
Contact.statics.create = function(name, email,company,contact,remark) {
 var created_at=  Date.now();
     this.view='not';
    const Contact = new this({
    name, email,company,contact,remark ,created_at  
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