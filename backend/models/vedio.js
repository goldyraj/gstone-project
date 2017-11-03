
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

 var mongoosePaginate = require('mongoose-paginate');
const Vedio = new Schema({
    title: String,
    description: String, 
    link :String, 
    date: { type: Date, default: Date.now }  
})

// create new User document
Vedio.statics.create = function(title, description,link) {
 

    const Vedio = new this({
      title, description,link      
    })

    // return the Promise
    return Vedio.save()
}
Vedio.statics.update_r = function(_id,title) {
return this.update({'_id':_id},  {$set :{'title':title}});
}
// find one user by using username
Vedio.statics.findOneByUsername = function(title) {
    return this.findOne({
        title        
    }).exec()
}

Vedio.plugin(mongoosePaginate);


module.exports = mongoose.model('Vedio', Vedio)