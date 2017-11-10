const Contact = require('../../../models/contact')
  var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};
/* 
    GET /api/State/list
*/
exports.index=(req,res)=>{
//console.log(req);
//=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
var query={};
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){    
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
Contact.count(query,function(err,count){
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
    select:'name email company contact remark ',
    sort:req.query.sortBy,
    offset:offset,
    limit:req.query.limit
};
Contact.paginate(query,option).then( contact=>res.json(contact)
        )
    .catch(onError);
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
 // if(!req.decoded.admin||!req.decoded.type===req.app.get('usertype')) {
 //   return res.status(403).json({
 //            message: 'you are not an authorise'
 //        }) 
 //    }
 Contact.find({}).exec()
    .then(
        contact=> {
            res.json({contact})
        }
    )
   }

exports.create = (req, res) => {
    const { name, email,company,contact,remark } = req.body
    let newUser = null
 // if(!req.decoded.admin) {
 //        return res.status(403).json({
 //            message: 'you are not an admin'
 //        })
 //    }
    // create a new user if does not exist
    const create = (contact) => {
       
   
        if(contact) {
            throw new Error('Email Name exists')
        } else {
            return Contact.create(  name, email,company,contact,remark )
        }
    }
    // count the number of the user

    const count = (contact) => {
        newUser = contact
        return Contact.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Contact Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Contact.findOneByUsername(email)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}

/*
    POST /api/State/upadate
*/
exports.update=(req,res)=>{
        const {_id, question, answer} = req.body
        var updated_at=  Date.now();
         Contact.findOneAndUpdate({_id:_id}, {$set:{question:question,answer:answer,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'FAQ Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Contact.findOneByUsername(question)          
         .then(respond)
         .catch(onError)
}
/*
    POST /api/client/delete/:id
*/
exports.delete=(req,res)=>{
  
  Contact.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Contact is Successfully deleted'})  
}


  // we have deleted the user
   
});
}