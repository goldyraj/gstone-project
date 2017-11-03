
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

  
const Invoice = new Schema({
    name: String,
    invoice_no : String,
    date:String,
    gstin_no:String,
    pos:String,
    e_com_gstin:String,
    type:String,
    gtotal:String,
    items:{}

          
          
})

// create new User document
Invoice.statics.create = function(name,invoice_no,date,gstin_no,pos,e_com_gstin,type,gtotal,items) {

    const Invoice = new this({
       name,invoice_no,date,gstin_no,pos,e_com_gstin,type,gtotal,items       
    })

    // return the Promise
    return Invoice.save()
}

// find one user by using username
Invoice.statics.findOneByUsername = function(invoice_no) {
    return this.findOne({
        invoice_no        
    }).exec()
}



module.exports = mongoose.model('Invoice', Invoice)