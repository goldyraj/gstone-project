const Internal = require('../../../models/internal')
/* 
    GET /api/State/list
*/
exports.index=(req,res)=>{

var query={};
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){    
    query={title:req.query.search}
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
var option={
    select:'title details date status',
    sort:req.query.sortBy,
    offset:offset,
    limit:req.query.limit
};
Internal.paginate(query,option).then( intenal=>res.json(intenal)
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
 Internal.find({}).exec()
    .then(
        internal=> {
            res.json({internal})
        }
    )
   }

exports.create = (req, res) => {
    const {title,details ,date ,status} = req.body
    let newUser = null
 // if(!req.decoded.admin) {
 //        return res.status(403).json({
 //            message: 'you are not an admin'
 //        })
 //    }
    // create a new user if does not exist
    const create = (internal) => {
       
   
        if(internal) {
            throw new Error('Intenal Name exists')
        } else {
            return Internal.create(title,details ,date ,status)
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
        const {_id, title,details ,date ,status} = req.body
     
         Internal.findOneAndUpdate({_id:_id}, {$set:{title:title,details:details,date:date,status:status}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Intenal Successfully Update'
        
 
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