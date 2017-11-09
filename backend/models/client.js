
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  
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
       created_at:  { type: Date},
  updated_at:  { type: Date}
})

// create new User document
Client.statics.create = function(name,pan_no,gstin,city,dealer_type,display_name,contact,email,address,state) {
 var created_at=  Date.now();
    const Client = new this({
     name,pan_no,gstin,city,dealer_type,display_name,contact,email,address,state,created_at       
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
Client.plugin(mongoosePaginate);
module.exports = mongoose.model('Client', Client)