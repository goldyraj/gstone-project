
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');

const Internal = new Schema({
    title: String,
    details: String,
    link: String,
    date: String,
    chapter: String,
    article: String,
    status: String,
    type: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
})

// create new User document
Internal.statics.create = function (title, details, link, date, chapter, article, type) {
    var created_at = Date.now();
    const Internal = new this({
        title, details, link, date, chapter, article, type, created_at
    })
    // return the Promise
    return Internal.save()
}

// find one user by using username
Internal.statics.findOneByUsername = function (title) {
    return this.findOne({
        title
    }).exec()
}

Internal.plugin(mongoosePaginate);
module.exports = mongoose.model('Internal', Internal)