
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  
const Customer = new Schema({
    name: String,
    pan_no: { type: String, unique: true },
    gstin: String,
    city: String,
    contact: String,
    email: String,
    address: String,
    state: String,
  
})

// create new Customer document
Customer.statics.create = function(name,pan_no,gstin,city,contact,email,address,state) {
     const customer = new this({
       name,pan_no,gstin,city,contact,email,address,state      
    })
    // return the Promise
    return customer.save()
}

// find one user by using username
Customer.statics.findOneByUsername = function(name) {
    return this.findOne({
        name        
    }).exec()
}
Customer.statics.all = function() {
  return Customer.findAll({             
    }).exec()
}


Customer.plugin(mongoosePaginate);
module.exports = mongoose.model('Customer', Customer)