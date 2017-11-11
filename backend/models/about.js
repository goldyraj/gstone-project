
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')
var mongoosePaginate = require('mongoose-paginate');
  
const About= new Schema({
   
  discription: { type: String, trim: true },
  created_at:  { type: Date},
  updated_at:  { type: Date}
  
})

// create new User document
About.statics.create = function(discription) {
   var created_at=  Date.now();
    const About = new this({
        discription,created_at
    })
    // return the Promise   
    return About.save()
}

// find one user by using username
About.statics.findOneByUsername = function(discription) {
    return this.findOne({
        discription        
    }).exec()
}

// About.plugin(require('mongoose-lifecycle'));
// About.plugin(mongoosePaginate);
// About.on('beforeInsert', function(about) {
//   console.log('A new book was inserted' );
// });

module.exports = mongoose.model('About', About)