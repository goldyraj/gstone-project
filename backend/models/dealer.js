
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  
const Dealer = new Schema({
    name: String,
    date:  String,   
    status:String
  
})

// create new User document
Dealer.statics.create = function(name, date,status) {

    const Dealer = new this({
        name,       
        date,
        status        
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