const Customer = require('../../../models/customer')

  var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};
/* 
    GET /api/user/list
*/
exports.index=(req,res)=>{
//console.log(req);
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
var query={};
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
Customer.count(query,function(err,count){
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
    console.log('send')
}else{
  console.log('NOT send')
   sortfiled={ created_at: -1 } 
}
var option={
    select:'name pan_no gstin city contact email address state created_at',
    sort:sortfiled , 
    offset:offset,
    limit:req.query.limit
};
Customer.paginate(query,option).then(customer=> 
            res.jsonp(customer)
        )
    .catch(onError);
}
exports.list = (req, res) => {
    // refuse if not an admin
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    
 Customer.find({}).exec()
    .then(
        custormer=> {
            res.json({custormer})
        }
    )
   }

exports.create = (req, res) => {

    const {name,pan_no,gstin,city,contact,email,address,state} = req.body
    let newUser = null
    //console.log(JSON.stringify(req.headers));
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }

    // create a new Customer if does not exist
    const create = (custormer) => {
          //  debug('User %o', user);
   
        if(custormer) {
            throw new Error('Customer gstin Allready exists')
        } else {
            return Customer.create(name,pan_no,gstin,city,contact,email,address,state,req.decoded._id)
        }
    }
    // count the number of the Customer
 const respond = () => {
        res.json({
            message: 'Customer Successfully Save'   
 
        })
    }
    const count = (customer) => {
        newUser = customer
        return Customer.count({}).exec()
    }
    // assign admin if count is 1
    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
          message: 'Customer pan number Allready exists'
        })
    }
    // check Customer Name duplication
    Customer.findOneByUsername(gstin)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}
/*
    POST /api/Customer/update
*/
exports.update=(req,res)=>{
  var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
        const {_id,name,pan_no,gstin,city,contact,email,address,state} = req.body
        var updated_at=  Date.now();
         Customer.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,city:city,gstin:gstin,contact:contact,email:email,address:address,state:state,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'customer Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Customer.findOneByUsername(name)          
         .then(respond)
         .catch(onError)
}
exports.uploadfile=(req,res)=>{
var myobj= req.body.data
//let msg ='Success updating admin2!';
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
      return new Customer.insertMany(myobj, function(err, res) {})
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
    POST /api/client/delete/:id
*/
exports.delete=(req,res)=>{
  
  Customer.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Customer is Successfully deleted'})  
}


  // we have deleted the user
   
});
}