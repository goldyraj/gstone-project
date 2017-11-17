
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
            userid : { type: Schema.Types.ObjectId, ref: 'User' },
      created_at:  { type: Date,default: Date.now},
  updated_at:  { type: Date}
})

// create new User document
Services.statics.create = function(description, hsn_code,cgst,sgst,igst,condition,userid) {
   var created_at=  Date.now();
    const Services = new this({
        description, hsn_code,cgst,sgst,igst,condition,userid,created_at     
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