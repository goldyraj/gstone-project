
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

   var mongoosePaginate = require('mongoose-paginate');
const Branch = new Schema({
    name: String,
    pan_no:{ type: String, unique: true },
    gstin:String,
    dealer_type:String,
    branch_name:{ type: String, unique: true },
    contact:String,
    email:String,
    address:String,
    city:String,
    state:String,
       userid : { type: Schema.Types.ObjectId, ref: 'User' },
   created_at:  { type: Date ,default: Date.now},
  updated_at:  { type: Date}
})

// create new User document
Branch.statics.create = function(name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state,userid) {
       var created_at=  Date.now();
    const Branch = new this({
       name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state,userid ,created_at     
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