
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
 var mongoosePaginate = require('mongoose-paginate');
  
const Internal = new Schema({
    title: String,
    details: String,
    date: String,
    status:String
  
})

// create new User document
Internal.statics.create = function(title, details,date,status) {
 

    const Internal = new this({
       title, details,date,status     
    })

    // return the Promise
    return Internal.save()
}

// find one user by using username
Internal.statics.findOneByUsername = function(title) {
    return this.findOne({
        title        
    }).exec()
}



Internal.plugin(mongoosePaginate);
module.exports = mongoose.model('Internal', Internal)