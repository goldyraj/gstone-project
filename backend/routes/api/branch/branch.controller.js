const Branch = require('../../../models/branch')

/* 
    GET /api/branch/index
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
Branch.count(query,function(err,count){
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
    select:'name pan_no gstin gstin dealer_type contact branch_name email address city state',
    sort:req.query.sortBy, 
    offset:offset,
    limit:req.query.limit
};
Branch.paginate(query,option).then(branch=> 
          
            res.json(branch)
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
 Branch.find({}).exec()
    .then(
        Branch=> {
            res.json({Branch})
        }
    )
   }
   
exports.update=(req,res)=>{
        const {_id,name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state} = req.body
     
         Branch.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,dealer_type:dealer_type,
            branch_name:branch_name,contact:contact,email:email,address:address,city:city,state:state}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Branch Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Branch.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
exports.create = (req, res) => {
    const {name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state} = req.body
    let newUser = null
 if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    // create a new user if does not exist
    const create = (branch) => {
       
   
        if(branch) {
            throw new Error('Branch Name exists')
        } else {
            return Branch.create(name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state)
        }
    }
    // count the number of the user

    // const count = (hsn) => {
    //     newUser = hsn
    //     return Hsn.count({}).exec()
    // }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Branch Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            messages: error.message
        })
    }

    // check username duplication
    Branch.findOneByUsername(branch_name)
    .then(create)
    .then(respond)
    .catch(onError)
}


/*
    POST /api/user/uploadfile
*/
exports.uploadfile=(req,res)=>{
var myobj= req.body.data
//let msg ='Success updating admin2!';
 var multirecord = function () {
      return new Branch.insertMany(myobj, function(err, res) {})
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
  
  Branch.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'HSN is Successfully deleted'})  
}


  // we have deleted the user
   
});
}