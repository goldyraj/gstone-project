
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
 var mongoosePaginate = require('mongoose-paginate');
  
const State = new Schema({
    name: String,
    code: String
  
})

// create new User document
State.statics.create = function(name, code) {
 

    const State = new this({
        name,
        code        
    })

    // return the Promise
    return State.save()
}

// find one user by using username
State.statics.findOneByUsername = function(name) {
    return this.findOne({
        name        
    }).exec()
}



State.plugin(mongoosePaginate);
module.exports = mongoose.model('State', State)