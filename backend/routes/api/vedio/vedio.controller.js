const Vedio = require('../../../models/vedio')
  //  var debug = require('debug')('http') , http = require('http');
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

var query={};
//=========Authrise function
  var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={title:req.query.search})
   
     
          query={title:new RegExp(req.query.search,'i')}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Vedio.count(query,function(err,count){
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
    select:'title description link',
    sort:sortfiled,
   // populate:'title description link',
    offset:offset,
    limit:req.query.limit
};
Vedio.paginate(query,option).then( vedio=> {
            res.json(vedio)
        })
    .catch(onError);
}


exports.update=(req,res)=>{
        const {_id,title,description,link} = req.body
        //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
        var updated_at=  Date.now();
         Vedio.findOneAndUpdate({_id:_id}, {$set:{title:title,description:description,link:link,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Vedio Successfully Update'
        
 
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
exports.create = (req, res) => {
    const {title, description,link} = req.body
    let newUser = null
   //=========Authrise function
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (notification) => {
       
   
        if(notification) {
            throw new Error('Vedio Title exists')
        } else {
            return Vedio.create(title, description,link)
        }
    }
    // count the number of the user

    const count = (vedio) => {
        newUser = vedio
        return Vedio.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Vedio Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Vedio.findOneByUsername(title)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/user/delete
*/
exports.delete=(req,res)=>{
    
       console.log('format',req.baseUrl)
  Vedio.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Vedio is Successfully deleted'})  
}


  // we have deleted the user
   
});
}