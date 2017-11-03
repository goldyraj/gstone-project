
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

   var mongoosePaginate = require('mongoose-paginate');
const Branch = new Schema({
    name: String,
    pan_no: String,
    gstin:String,
    dealer_type:String,
    branch_name:{ type: String, unique: true },
    contact:String,
    email:String,
    address:String,
    city:String,
    state:String,
  
})

// create new User document
Branch.statics.create = function(name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state) {
    const Branch = new this({
       name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state       
    })

    // return the Promise
    return Branch.save()
}

// find one user by using username
Branch.statics.findOneByUsername = function(branch_name) {
    return this.findOne({
        branch_name        
    }).exec()
}

Branch.plugin(mongoosePaginate);


module.exports = mongoose.model('Branch', Branch)