const Internal = require('../../../models/internal')
var fs=require('fs');

  var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};
/* 
    GET /api/State/list
*/
exports.index=(req,res)=>{

var query={};
//=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){    
    if(req.query.type && req.query.type.length>0){  
   if(req.query.type=="chapter"){
     query={chapter:req.query.search}
 }else{
    query={article:req.query.search}
 }
}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Internal.count(query,function(err,count){
    if(count>offset){
        offset=0;
    }
});
const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
          var sortfiled={};
    if(req.query.sortBy && req.query.sortBy.length>0){    
    sortfiled=req.query.sortBy
}else{
   sortfiled={ created_at: -1 } 
}
var option={
    select:'title details link chapter article date status type',
    sort:sortfiled,
    offset:offset,
    limit:req.query.limit
};
Internal.paginate(query,option).then( intenal=>res.json(intenal)
        )
    .catch(onError);
}
/* 
    GET /api/user/view
*/
exports.view=(req,res)=>{
   //console.log(req.params.id);
Internal.findById(req.params.id, function (err, internal) { 

if(err){
    return res.status(403).json({
            message: 'NO data found '
        }) 
}else{
     return res.json(
          internal
        ) 
}
 } );
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
 Internal.find({}).exec()
    .then(
        internal=> {
            res.json({internal})
        }
    )
   }

exports.create = (req, res) => {
    const {title,details ,link,date,chapter,article,type } = req.body
    let newUser = null
 //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (internal) => {
       
   
        if(internal) {
            throw new Error('Intenal Name exists')
        } else {
            return Internal.create(title,details ,link ,date,chapter,article,type)
        }
    }
    // count the number of the user

    const count = (internal) => {
        newUser = internal
        return Internal.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Internal Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Internal.findOneByUsername(title)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/State/upadate
*/
exports.update=(req,res)=>{
        const {_id, title , details ,link , date,chapter,article,type } = req.body
     //=========Authrise function
     console.log(req.decoded)
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    var updated_at=  Date.now();
         Internal.findOneAndUpdate({_id:_id}, {$set:{title:title,details:details,link:link,date:date,chapter:chapter,article:article,type:type,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Internal Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Internal.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
exports.delete=(req,res)=>{
  
  Internal.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Internal is Successfully deleted'})  
}
  // we have deleted the user
   
});
}