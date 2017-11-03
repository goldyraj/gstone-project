const Client = require('../../../models/client')

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
 Client.find({}).exec()
    .then(
        state=> {
            res.json({state})
        }
    )
   }
   exports.update=(req,res)=>{
        const {_id,name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state} = req.body
     
         Client.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,dealer_type:dealer_type,
            branch_name:branch_name,contact:contact,email:email,address:address,city:city,state:state}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Client Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Client.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
exports.create = (req, res) => {
    const {name,pan_no,gstin,city,dealer_type,display_name,contact,email,address,state} = req.body
    let newUser = null
 if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    // create a new user if does not exist
    const create = (client) => {
       
   
        if(client) {
            throw new Error('Client Name exists')
        } else {
            return Client.create(name,pan_no,gstin,city,dealer_type,display_name,contact,email,address,state)
        }
    }
    // count the number of the user

    const count = (client) => {
        newUser = client
        return Client.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Client Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Client.findOneByUsername(name)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/client/delete/:id
*/
exports.delete=(req,res)=>{
  
  Client.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Client is Successfully deleted'})  
}


  // we have deleted the user
   
});
}