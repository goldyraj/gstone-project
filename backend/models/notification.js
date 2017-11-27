
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');

const Notification = new Schema({
    title: String,
    description: String,
    link: String,
    date: { type: Date, default: Date.now },
    created_at: { type: Date },
    updated_at: { type: Date }
})

// create new User document
Notification.statics.create = function (title, description, link) {

    var created_at = Date.now();
    const Notification = new this({
        title, description, link, created_at
    })

    // return the Promise
    return Notification.save()
}

// find one user by using username
Notification.statics.findOneByUsername = function (title) {
    return this.findOne({
        title
    }).exec()
}


Notification.plugin(mongoosePaginate);

module.exports = mongoose.model('Notification', Notification)