
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

   var mongoosePaginate = require('mongoose-paginate');
const Goodsuser = new Schema({
    description: String,
    hsn_code: String,
    unit: String,
    rate: String,
    userid : { type: Schema.Types.ObjectId, ref: 'User' },
    created_at:  { type: Date},
    updated_at:  { type: Date}
})

// create new User document
Goodsuser.statics.create = function(description, hsn_code,unit,rate,userid) {
   var created_at=  Date.now();
    const Goodsuser = new this({
        description, hsn_code,unit,rate,created_at,userid    
    })

    // return the Promise
    return Goodsuser.save()
}

// find one user by using username
Goodsuser.statics.findOneByUsername = function(description) {
    return this.findOne({
        description        
    }).exec()
}




Goodsuser.plugin(mongoosePaginate);
module.exports = mongoose.model('Goodsuser', Goodsuser)