const Dealer = require('../../../models/dealer')
//var csv=require('csv-parse');
var fs=require('fs');
  var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};
/* 
    GET /api/hsn/index
*/
//var upload = multer({ dest: '/tmp/'});
exports.index=(req,res)=>{
//console.log(req);
var query={};
//=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
console.log(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={name:req.query.search})
    query={name:new RegExp(req.query.search,'i')}
}
if(!req.query.limit ||!isNaN(req.query.limit) ){
    req.query.limit=20;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;   
}
var offset=(req.query.page-1)*req.query.limit;
Dealer.count(query,function(err,count){
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
Dealer.paginate(query,option).then( dealer=>res.json(dealer)
        )
    .catch(onError);
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
 Dealer.find({}).exec()
    .then(
        Hsn=> {
            res.json({Dealer})
        }
    )
   }

exports.create = (req, res) => {
    console.log(req.body)
    const {name, date,status} = req.body
    let newUser = null
 //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (dealer) => {
        if(dealer) {
            throw new Error('State Name exists')
        } else {
            return Dealer.create(name, date,status)
        }
    }
    // count the number of the user

     const count = (dealer) => {
         newUser = dealer
         return Dealer.count({}).exec()
     }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Dealer Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Dealer.findOneByUsername(name)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/HSN/update
*/
exports.update=(req,res)=>{
        const {_id,name, date,status} = req.body
        //=========Authrise function
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
     var updated_at=  Date.now();
         Dealer.findOneAndUpdate({_id:_id}, {$set:{name:name,date:date,status:status,updated_at:updated_at
          }}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Dealer Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Dealer.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
// Upload File CSV 
exports.uploadfile=(req,res)=>{

//console.log(req.body) // req.body should be populated by request body\
//var e=req.body
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
var myobj= req.body.data
try {
Dealer.insertMany(myobj, function(err, res) {
    
 //   console.log("Number of documents inserted: " + res.insertedCount);
  
  }).catch(err);
    
    } catch (e) {
  res.json({
            'd': "some record allready exists"
        
 
        })
}
  res.json({
            'message': "Save All Records"
        
 
        })
}
exports.delete=(req,res)=>{
  
  Dealer.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Dealer is Successfully deleted'})  
}


  // we have deleted the user
   
});
}