
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

   var mongoosePaginate = require('mongoose-paginate');
const Goods = new Schema({
    description: String,
    hsn_code: String,
    //unit: String,
    cgst: String,
    sgst: String,
    igst: String,
    condition: String,
      created_at:  { type: Date,default: Date.now},
  updated_at:  { type: Date}
})

// create new User document
Goods.statics.create = function(description, hsn_code,cgst,sgst,igst,condition) {
   var created_at=  Date.now();
    const Goods = new this({
        description, hsn_code,cgst,sgst,igst,condition,created_at     
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




Goods.plugin(mongoosePaginate);
module.exports = mongoose.model('Goods', Goods)