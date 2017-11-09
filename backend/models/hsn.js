
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  //var uniqueValidator = require('mongoose-unique-validator');
const Hsn = new Schema({
    description: String,
    code: { type: String, unique: true },
    rate:String,
    status:String,
     created_at:  { type: Date},
  updated_at:  { type: Date}
  
})

// create new User document
Hsn.statics.create = function(description, code,rate,status) {
 var created_at=  Date.now();

    const Hsn = new this({
        description,
        code,
        rate,
        status  ,created_at      
    })

    // return the Promise
    return Hsn.save()
}

// find one user by using username
Hsn.statics.findOneByUsername = function(code) {
    return this.findOne({
        code        
    }).exec()
}

//Hsn.plugin(uniqueValidator);
Hsn.plugin(mongoosePaginate);


module.exports = mongoose.model('Hsn', Hsn)