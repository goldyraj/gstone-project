
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

   var mongoosePaginate = require('mongoose-paginate');
const Services = new Schema({
    description: String,
    hsn_code: String,
    //unit: String,
    cgst: String,
    sgst: String,
    igst: String,
    condition: String,
      created_at:  { type: Date},
  updated_at:  { type: Date}
})

// create new User document
Services.statics.create = function(description, hsn_code,cgst,sgst,igst,condition) {
   var created_at=  Date.now();
    const Services = new this({
        description, hsn_code,cgst,sgst,igst,condition,created_at     
    })

    // return the Promise
    return Services.save()
}

// find one user by using username
Services.statics.findOneByUsername = function(description) {
    return this.findOne({
        description        
    }).exec()
}




Services.plugin(mongoosePaginate);
module.exports = mongoose.model('Services', Services)