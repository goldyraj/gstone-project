
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

  
const Goods = new Schema({
    description: String,
    hsn_code: String,
    unit: String,
    rate: String
})

// create new User document
Goods.statics.create = function(description, hsn_code,unit,rate) {
 

    const Goods = new this({
        description, hsn_code,unit,rate       
    })

    // return the Promise
    return Goods.save()
}

// find one user by using username
Goods.statics.findOneByUsername = function(description) {
    return this.findOne({
        description        
    }).exec()
}




module.exports = mongoose.model('Goods', Goods)