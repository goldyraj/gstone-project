
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var debug = require('debug')('http') , http = require('http')
  , name = 'My App';
  
const User = new Schema({
     name: String,
    username: String,
    password: String,
    email: String,
    contact: String,
    pan_no: String,
    gstin: String,
    address: String,
    city: String, 
    created_at:  { type: Date},
    updated_at:  { type: Date},
    type:String,
    admin: { type: Boolean, default: false }

})


// crypto.createHmac('sha1', 'secret')
//              .update('mypasswssord')
//              .digest('base64')


// create new User document
User.statics.create = function(name,username, password,email,contact,pan_no,gstin,address,city,type) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')
                      debug('booting %o', name);
                      var created_at=  Date.now();

    const user = new this({
        name,
        username,
        password: encrypted,
        email,
        contact,
        pan_no,
        gstin,
        address,
        city,
        type,
        created_at
    })

    // return the Promise
    return user.save()
}

// find one user by using username
User.statics.findOneByUsername = function(username) {
    return this.findOne({
        username        
    }).exec()
}

// verify the password of the User documment
User.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')
    console.log(this.password === encrypted)

    return this.password === encrypted
}

User.methods.assignAdmin = function() {
    this.admin = true
    this.type = "admin"
    return this.save()
}

module.exports = mongoose.model('User', User)