
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

  
const Invoice = new Schema({
    gstin: String,
    fp : String,
    gt:String,  
    cur_gt:{type:Number, min:0, max: 999999999999999.99},
    b2b:{}
      
          
})

// create new User document
Invoice.statics.create = function(gstin,fp,gt,cur_gt,b2b) {
var created_at=  Date.now();
    const Invoice = new this({
       gstin,fp,gt,cur_gt,b2b     
    })

    // return the Promise
    return Invoice.save()
}
// find one user by using username
Invoice.statics.findOneByUsername = function(gstin,fp,gt) {
    return this.findOne({
     gstin,fp,gt
    }).exec()
}



module.exports = mongoose.model('Invoice', Invoice)