const Vendor = require('../../../models/vendor')

/* 
    GET /api/vendor/index
*/
exports.index=(req,res)=>{
//console.log(req);
var query={};
console.log(req.query.limit);
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={name:req.query.search})
    query={name:req.query.search}
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
var option={
    select:'name pan_no gstin city contact email address state',
    sort:req.query.sortBy,

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
  
    const {name,pan_no,gstin,city,contact,email,address,state} = req.body
    let newUser = null
 if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    // Update Vendor 
    exports.update=(req,res)=>{
        const {_id,name,pan_no,gstin,city,contact,email,address,state} = req.body
     
         Vedio.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,gstin:gstin,city:city,contact:contact,email:email}}, {new: true}, function(err, doc){
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
      Vedio.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
    // create a new user if does not exist
    const create = (vendor) => {
       
   
        if(vendor) {
            throw new Error('Vendor Name exists')
        } else {
            return Vendor.create(name,pan_no,gstin,city,contact,email,address,state)
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
        const {_id,name,pan_no,gstin,city,contact,email,address,state} = req.body
     
         Vendor.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,gstin:gstin,contact:contact,email:email,address:address,state:state}}, {new: true}, function(err, doc){
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



var myobj= req.body.data
//let msg ='Success updating admin2!';
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
    
       console.log('format',req.baseUrl)
  Vendor.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Vedio is Successfully deleted'})  
}


  // we have deleted the user
   
});
}