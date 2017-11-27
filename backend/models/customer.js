
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');

const Customer = new Schema({
    name: String,
    pan_no: { type: String, unique: true },
    gstin: String,
    city: String,
    contact: String,
    email: String,
    address: String,
    state: String,
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
})

// create new Customer document
Customer.statics.create = function (name, pan_no, gstin, city, contact, email, address, state, userid) {
    var created_at = Date.now();
    const customer = new this({
        name, pan_no, gstin, city, contact, email, address, state, userid, created_at
    })
    // return the Promise
    return customer.save()
}

// find one user by using username
Customer.statics.findOneByUsername = function (gstin) {
    return this.findOne({
        gstin
    }).exec()
}
Customer.statics.all = function () {
    return Customer.findAll({
    }).exec()
}


Customer.plugin(mongoosePaginate);
module.exports = mongoose.model('Customer', Customer)