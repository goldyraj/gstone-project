
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

  
const Client = new Schema({
    name: String,
    pan_no: String,
    gstin: String,
    city: String,
    dealer_type: String,
    display_name: String,
    contact: String,
    email: String,
    address: String,
    state: String,  
})

// create new User document
Client.statics.create = function(name,pan_no,gstin,city,dealer_type,display_name,contact,email,address,state) {
 

    const Client = new this({
     name,pan_no,gstin,city,dealer_type,display_name,contact,email,address,state       
    })

    // return the Promise
    return Client.save()
}
// find one user by using username
Client.statics.findOneByUsername = function(name) {
    return this.findOne({
        name        
    }).exec()
}
module.exports = mongoose.model('Client', Client)