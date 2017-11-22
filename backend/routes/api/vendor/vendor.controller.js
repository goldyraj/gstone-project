const Vendor = require('../../../models/vendor')

  var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};
/* 
    GET /api/vendor/index
*/
exports.index=(req,res)=>{
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
var query={};
console.log(req.query.limit);
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    //console.log(query={name:req.query.search})
    query={name:req.query.search}
}
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
Vendor.count(query,function(err,count){
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
    select:'name pan_no gstin city contact email address state',
    sort:sortfiled,

    offset:offset,
    limit:req.query.limit
};
Vendor.paginate(query,option).then( vendor=>res.json(vendor)
        )
    .catch(onError);
}
exports.list = (req, res) => {
    // refuse if not an admin
      if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
 Vendor.find({}).exec()
    .then(
        vendor=> {
            
            res.json(vendor)
        }
    )
   }

exports.create = (req, res) => {
  var rstatus=false;
    const {name,pan_no,gstin,city,contact,email,address,state} = req.body
    let newUser = null
    console.log(req.decoded)
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
   // console.log("RETURN STATUS=",rstatus)


    // create a new user if does not exist
    const create = (vendor) => {
       
   
        if(vendor) {
            throw new Error('Vendor Name exists')
        } else {
            return Vendor.create(name,pan_no,gstin,city,contact,email,address,state,req.decoded._id)
        }
    }
    // count the number of the user

    const count = (vendor) => {
        newUser = vendor
        return Vendor.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'vendor Successfully Save'
             })
    }
    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Vendor.findOneByUsername(name)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}
/*
    POST /api/Vendor/upadate
*/
exports.update=(req,res)=>{
   
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
        const {_id,name,pan_no,gstin,city,contact,email,address,state} = req.body
     
         Vendor.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,gstin:gstin,contact:contact,city:city,email:email,address:address,state:state}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'vendor Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Vendor.findOneByUsername(name)          
         .then(respond)
         .catch(onError)
}
exports.uploadfile=(req,res)=>{
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }

var myobj= req.body.data
 for (var i = 0; i <myobj.length; i++) {
  myobj[i].userid=req.decoded._id; 
  }

 var multirecord = function () {
      return new Vendor.insertMany(myobj, function(err, res) {})
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
/*
    POST /api/vendor/delete
*/
exports.delete=(req,res)=>{
    

  Vendor.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Vedio is Successfully deleted'})  
}


  // we have deleted the user
   
});
}