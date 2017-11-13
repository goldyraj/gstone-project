
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
 var mongoosePaginate = require('mongoose-paginate');
  
const State = new Schema({
    name: String,
    code: String,
  
     created_at:  { type: Date,default: Date.now},
  updated_at:  { type: Date},
})

// create new User document
State.statics.create = function(name, code) {
 
var created_at=  Date.now();
    const State = new this({
        name,
        code , created_at     
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