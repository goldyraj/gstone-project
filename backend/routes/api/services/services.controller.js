const Services = require('../../../models/services')

var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};

/* 
    GET /api/branch/index
*/
exports.index=(req,res)=>{
//console.log(req);
  var rstatus=false;
 // var myCallback=usingItNow(req.decoded)
 // if(myCallback) {
 //   return res.status(403).json({
 //            message: 'you are not an authorise'
 //        }) 
 //    }
var query={};
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={description:req.query.search})
           if(req.query.type && req.query.type.length>0){  
   if(req.query.type=="des"){ 
      query={description:new RegExp(req.query.search,'i')}
 }
}else{
   query={hsn_code:new RegExp(req.query.search,'i')}
 
 }
}
// USer Id 
if(req.decoded.type===req.app.get('usertype')){
   query={userid:req.decoded._id}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Services.count(query,function(err,count){
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
    select:'hsn_code description cgst sgst igst condition',
    sort:sortfiled, 
    offset:offset,
    limit:req.query.limit
};
Services.paginate(query,option).then(services=> 
          
            res.json(services)
        )
    .catch(onError);
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
 //  var myCallback=usingItNow(req.decoded)
 // if(myCallback) {
 //   return res.status(403).json({
 //            message: 'you are not an authorise'
 //        }) 
 //    }
 Services.find({}).exec()
    .then(
        services=> {
            res.json({services})
        }
    )
   }
exports.update=(req,res)=>{
        const {_id, description, hsn_code,cgst,sgst,igst,condition } = req.body
  var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
     var updated_at=  Date.now();
         Services.findOneAndUpdate({_id:_id}, {$set:{hsn_code:hsn_code,description:description,cgst:cgst,sgst:sgst,igst:igst,condition:condition,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Goods Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Services.findOneByUsername(description)          
         .then(respond)
         .catch(onError)
}
exports.create = (req, res) => {
    const {description, hsn_code,cgst,sgst,igst,condition} = req.body
    let newUser = null
    console.log(req.decoded)
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (services) => {
       
   
        if(services) {
            throw new Error('Goods Name exists')
        } else {
            return Services.create(  description, hsn_code,cgst,sgst,igst,condition,req.decoded._id )
        }
    }
    // count the number of the user

    const count = (services) => {
        newUser = services
        return Services.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'services Successfully Save'
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Services.findOneByUsername(description)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/user/uploadfile
*/
exports.uploadfile=(req,res)=>{
var myobj= req.body.data
//=========Authrise function
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    for (var i = 0; i <myobj.length; i++) {
       myobj[i].userid=req.decoded._id; 
     }
 var multirecord = function () {
      return new Services.insertMany(myobj, function(err, res) {})
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
  
  Services.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'HSN is Successfully deleted'})  
}


  // we have deleted the user
   
});
}