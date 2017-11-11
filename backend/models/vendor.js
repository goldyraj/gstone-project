
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
   var mongoosePaginate = require('mongoose-paginate');
const Vendor = new Schema({
    name: String,
    pan_no: String,
    gstin: String,
    city: String,
    contact: String,
    email: String,
    address: String,
    state: String,
    created_at:  { type: Date},
    updated_at:  { type: Date},
  
})

// create new User document
Vendor.statics.create = function(name,pan_no,gstin,city,contact,email,address,state) {
    var created_at=  Date.now();
     const Vendor = new this({
        name,pan_no,gstin,city,contact,email,address,state ,created_at      
    })

    // return the Promise
    return Vendor.save()
}

// find one user by using username
Vendor.statics.findOneByUsername = function(name) {
    return this.findOne({
        name        
    }).exec()
}

Vendor.plugin(mongoosePaginate);
module.exports = mongoose.model('Vendor', Vendor)