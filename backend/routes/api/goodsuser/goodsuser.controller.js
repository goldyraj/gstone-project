const Goodsuser = require('../../../models/goodsuser')

var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};

/* 
    GET /api/branch/index
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
   // console.log(query={description:req.query.search})
    query={description:req.query.search}
}
//======== check user admin or nor and fillter record =========
if(req.decoded.type===req.app.get('usertype')){
   query={userid:req.decoded._id}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Goodsuser.count(query,function(err,count){
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
   sortfiled={ date: -1 } 
}
var option={
    select:'hsn_code description unit gstin dealer_type rate',
    sort:sortfiled, 
    offset:offset,
    limit:req.query.limit
};
Goodsuser.paginate(query,option).then(goodsuser=> 
          
            res.json(goodsuser)
        )
    .catch(onError);
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
 Goodsuser.find({}).exec()
    .then(
        goodsuser=> {
            res.json({goodsuser})
        }
    )
   }
exports.update=(req,res)=>{
        const {_id, description, hsn_code,unit,rate } = req.body
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
     var updated_at=  Date.now();
         Goodsuser.findOneAndUpdate({_id:_id}, {$set:{hsn_code:hsn_code,description:description,unit:unit,rate:rate,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Goods User Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Goods.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
exports.create = (req, res) => {
    const {description, hsn_code,unit,rate } = req.body
    let newUser = null
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (goodsuser) => {
       
   
        if(goodsuser) {
            throw new Error('Goods User Name exists')
        } else {
            return Goodsuser.create(  description, hsn_code,unit,rate ,req.decoded._id)
        }
    }
    // count the number of the user

    const count = (goodsuser) => {
        newUser = goodsuser
        return Goodsuser.count({}).exec()
    }

    
   
 const respond = () => {
        res.json({
            message: 'Goods User Successfully Save'
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Goodsuser.findOneByUsername(description)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/user/uploadfile
*/
exports.uploadfile=(req,res)=>{



var myobj= req.body.data
//=========Authrise function
if(!req.decoded.admin||!req.decoded.type===req.app.get('usertype')) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    
 var multirecord = function () {
      return new Goods.insertMany(myobj, function(err, res) {})
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
  
  Goods.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'HSN is Successfully deleted'})  
}


  // we have deleted the user
   
});
}