
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

  
const Invoice = new Schema({
    gstin: String,
    fp : String,
    gt:String,  
    inum:String,
    cur_gt:{type:Number, min:0, max: 999999999999999.99},
    b2b:{},
    b2cl:{},
    cdnr:{},
    b2cs:{},
    exp:{},
    hsn:{}, 
    nil:{},
    txpd:{},
    at:{},
    doc_issue:{},
    cdnur:{},
    status:String,
    userid : {type: Schema.Types.ObjectId, ref: 'User' },
    created_at:  { type: Date ,default: Date.now},
    updated_at:  { type: Date}
          
})

// create new User document
Invoice.statics.create = function(gstin,fp,gt,inum,cur_gt,b2b,b2cl,cdnr,b2cs,exp,hsn,nil,txpd,at,doc_issue,cdnur,userid) {
  var created_at=  Date.now();
   var status ="N";
    const Invoice = new this({
  gstin,fp,gt,inum,cur_gt,b2b,b2cl,cdnr,b2cs,exp,hsn,nil,txpd,at,doc_issue,cdnur,userid,created_at ,status   
    })

    // return the Promise
    return Invoice.save()
}
// find one invoice Number exits 
Invoice.statics.findOneByInvoicenumber = function(inum) {
    return this.findOne({
     inum
    }).exec()
}



module.exports = mongoose.model('Invoice', Invoice)