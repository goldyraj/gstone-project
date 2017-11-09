const Faq = require('../../../models/faq')

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
var query={};
// if(!req.decoded.admin||!req.decoded.type===req.app.get('usertype')) {
//    return res.status(403).json({
//             message: 'you are not an authorise'
//         }) 
//     }
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){    
    query={question:req.query.search}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Faq.count(query,function(err,count){
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
    select:'question answer',
    sort:req.query.sortBy,
    offset:offset,
    limit:req.query.limit
};
Faq.paginate(query,option).then( faq=>res.json(faq)
        )
    .catch(onError);
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
    //=========Authrise function
// if(!req.decoded.admin||!req.decoded.type===req.app.get('usertype')) {
//    return res.status(403).json({
//             message: 'you are not an authorise'
//         }) 
//     }
 Faq.find({}).exec()
    .then(
        faq=> {
            res.json({faq})
        }
    )
   }

exports.create = (req, res) => {
    const {question, answer} = req.body
    let newUser = null
 //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (faq) => {
       
   
        if(faq) {
            throw new Error('FAQ Name exists')
        } else {
            return Faq.create(question, answer)
        }
    }
    // count the number of the user

    const count = (faq) => {
        newUser = faq
        return Faq.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'FAQ Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Faq.findOneByUsername(question)
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
        //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
     var updated_at=  Date.now();
         Faq.findOneAndUpdate({_id:_id}, {$set:{question:question,answer:answer,updated_at:updated_at}}, {new: true}, function(err, doc){
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
      Faq.findOneByUsername(question)          
         .then(respond)
         .catch(onError)
}
exports.delete=(req,res)=>{
  
  Faq.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'Customer is Successfully deleted'})  
}


  // we have deleted the user
   
});
}