const User = require('../../../models/user')
const crypto = require('crypto')
const config = require('../../../config')



exports.index=(req,res)=>{

var query={};
//=========Authrise function
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){    
   query={name:new RegExp(req.query.search,'i')}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
User.count(query,function(err,count){
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
    select:'name username email contact pan_no gstin address city state type',
    sort:sortfiled,
    offset:offset,
    limit:req.query.limit
};
User.paginate(query,option).then( user=>res.json(user)
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

    User.find({}, '-password').skip(1).limit(10).exec()
    .then(
        users=> {
            res.json({users})
        }
    )

}


/*
    POST /api/user/assign-admin/:username
*/
exports.assignAdmin = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.findOneByUsername(req.params.username)
    .then(
        user => {
            if(!user) throw new Error('user not found')
            user.assignAdmin()
        }
    ).then(
        res.json({
            success: true
        })
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
}
/*
    POST /api/user/update
*/
exports.update=(req,res)=>{
        const {_id, name,username,email,contact,pan_no,gstin,address,city,state,type} = req.body
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
     var updated_at=  Date.now();
         User.findOneAndUpdate({_id:_id}, {$set:{name:name,username:username,email:email,contact:contact,pan_no:pan_no,gstin:gstin,address:address,city:city,state:state,type:type,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'User Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      User.findOneByUsername(username)          
         .then(respond)
         .catch(onError)
}
exports.view=(req,res)=>{
User.findOne({_id:req.decoded._id},{admin:0,password:0},function (err, data) {
    if (err){ 
    res.json({'meassge':'No Record Found '})
}else{

    res.json({"data":data})  
}
});
}
exports.profileupdate=(req,res)=>{
        const {_id, name,username,email,contact,pan_no,gstin,address,city,state,type} = req.body
    // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }
     var updated_at=  Date.now();
         User.findOneAndUpdate({_id:_id}, {$set:{name:name,username:username,email:email,contact:contact,pan_no:pan_no,gstin:gstin,address:address,city:city,state:state,type:type,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
  res.json({
            message: 'User NOT  Successfully Update'
        
 
        })
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'User Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      User.findOneByUsername(username)          
         .then(respond)
         .catch(onError)
}
/*
    POST /api/user/changepassword
*/
exports.changepassword=(req,res)=>{
 const {username,password,newpassword} = req.body
  const check = (user) => {
         if(user.verify(password)) {
            console.log(user)
            var updated_at=  Date.now();
const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(newpassword)
                      .digest('base64')
                       const newpassword_crypt = encrypted;

                User.findOneAndUpdate({_id:user._id}, {$set:{password:newpassword_crypt,updated_at:updated_at}}, {new: true}, function(err, doc){})       
    return res.json({
        'message':"password is change successfully",
            success: true
              })
         }else{
return res.status(409).json({
    'message':"Old password is not matched",
            success: false
        })
         }
     }
       const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }
      const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }
     User.findOneByUsername(username)
    .then(check)
        .catch(onError)
}