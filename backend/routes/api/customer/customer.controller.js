const Customer = require('../../../models/customer')

/* 
    GET /api/user/list
*/
exports.index=(req,res)=>{
//console.log(req);
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
var option={
    select:'name pan_no gstin city contact email address state',
    sort:req.query.sortBy, 
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
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
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
    console.log(JSON.stringify(req.headers));

    // create a new Customer if does not exist
    const create = (custormer) => {
          //  debug('User %o', user);
   
        if(custormer) {
            throw new Error('Customer Name exists')
        } else {
            return Customer.create(name,pan_no,gstin,city,contact,email,address,state)
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
            message: error.message
        })
    }
    // check Customer Name duplication
    Customer.findOneByUsername(name)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}
/*
    POST /api/Customer/update
*/
exports.update=(req,res)=>{
        const {_id,name,pan_no,gstin,city,contact,email,address,state} = req.body
     
         Customer.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,gstin:gstin,contact:contact,email:email,address:address,state:state}}, {new: true}, function(err, doc){
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