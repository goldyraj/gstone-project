
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  
const Dealer = new Schema({
    name: String,
    date:  String,   
    status:String,
     created_at:  { type: Date,default: Date.now},
  updated_at:  { type: Date}
  
})

// create new User document
Dealer.statics.create = function(name, date,status) {
   var created_at=  Date.now();
    const Dealer = new this({
        name,       
        date,
        status  ,created_at          
    })

    // return the Promise
    return Dealer.save()
}

// find one user by using username
Dealer.statics.findOneByUsername = function(name) {
    return this.findOne({
        name        
    }).exec()
}


Dealer.plugin(mongoosePaginate);


module.exports = mongoose.model('Dealer', Dealer)