
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  
const Privacy= new Schema({
   
  discription: { type: String, trim: true },
   created_at:  { type: Date,default: Date.now},
  updated_at:  { type: Date}
  
})

// create new User document
Privacy.statics.create = function(discription) {
   var created_at=  Date.now();
    const Privacy = new this({
        discription,created_at
    })

    // return the Promise
    return Privacy.save()
}

// find one user by using username
Privacy.statics.findOneByUsername = function(discription) {
    return this.findOne({
        discription        
    }).exec()
}


Privacy.plugin(mongoosePaginate);


module.exports = mongoose.model('Privacy', Privacy)