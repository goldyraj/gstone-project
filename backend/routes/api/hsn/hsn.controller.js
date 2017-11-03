const Hsn = require('../../../models/hsn')
//var csv=require('csv-parse');
var fs=require('fs');

/* 
    GET /api/hsn/index
*/

exports.index=(req,res)=>{

var query={};
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={description:req.query.search})
    query={description:req.query.search}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=20;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;   
}
var offset=(req.query.page-1)*req.query.limit;
Hsn.count(query,function(err,count){
    if(count>offset){
        offset=0;
    }
});
const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
var option={
    select:'description code rate status',
    sort:req.query.sortBy,

    offset:offset,
    limit:req.query.limit
};
Hsn.paginate(query,option).then( hsn=>res.json(hsn)
        )
    .catch(onError);
}


/* 
    GET /api/user/list
*/
exports.list = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
 Hsn.find({}).exec()
    .then(
        Hsn=> {
            res.json({Hsn})
        }
    )
   }

exports.create = (req, res) => {
    console.log(req.body)
    const {description, code,rate,status} = req.body
    let newUser = null
 if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    // create a new user if does not exist
    const create = (hsn) => {
        if(hsn) {
            throw new Error('State Name exists')
        } else {
            return Hsn.create(description, code,rate,status)
        }
    }
    // count the number of the user

     const count = (hsn) => {
         newUser = hsn
         return Hsn.count({}).exec()
     }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Hsn Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Hsn.findOneByUsername(code)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/HSN/update
*/
exports.update=(req,res)=>{
        const {_id,description, code,rate,status} = req.body
     
         Hsn.findOneAndUpdate({_id:_id}, {$set:{description:description,code:code,status:status,rate:rate
          }}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'HSN Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Hsn.findOneByUsername(code)          
         .then(respond)
         .catch(onError)
}
// Upload File CSV 
exports.uploadfile=(req,res)=>{



var myobj= req.body.data
//let msg ='Success updating admin2!';
 var multirecord = function () {
      return new Hsn.insertMany(myobj, function(err, res) {})
  }

  // function calling work 
   var multi_record = multirecord();
  multi_record.then(function () {
            res.json({
          message:"upload Successfully Save"
        })
  }).catch(function (e) {
    var error=  e.message
     res.json({
          error
        })
     
  });

    
   
}
exports.delete=(req,res)=>{
  
  Hsn.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'HSN is Successfully deleted'})  
}


  // we have deleted the user
   
});
}