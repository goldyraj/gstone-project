const Goods = require('../../../models/goods')


/* 
    GET /api/branch/index
*/
exports.index=(req,res)=>{
//console.log(req);
var query={};
req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={description:req.query.search})
    query={description:req.query.search}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Goods.count(query,function(err,count){
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
    select:'hsn_code description unit gstin dealer_type rate',
    sort:req.query.sortBy, 
    offset:offset,
    limit:req.query.limit
};
Goods.paginate(query,option).then(goods=> 
          
            res.json(goods)
        )
    .catch(onError);
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
    // if(!req.decoded.admin) {
        // return res.status(403).json({
            // message: 'you are not an admin'
        // })
    // }
 Goods.find({}).exec()
    .then(
        goods=> {
            res.json(goods)
        }
    )
   }
exports.update=(req,res)=>{
        const {_id, description, hsn_code,unit,rate } = req.body
     
         Goods.findOneAndUpdate({_id:_id}, {$set:{hsn_code:hsn_code,description:description,unit:unit,rate:rate}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Goods Successfully Update'
        
 
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
    const {  description, hsn_code,unit,rate } = req.body
    let newUser = null
 if(!req.decoded.admin) {
        return res.status(403).json({
            // message: 'you are not an admin'
        })
    }
    // create a new user if does not exist
    const create = (goods) => {
       
   
        if(goods) {
            throw new Error('Goods Name exists')
        } else {
            return Goods.create(  description, hsn_code,unit,rate )
        }
    }
    // count the number of the user

    const count = (goods) => {
        newUser = goods
        return Goods.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Goods Successfully Save'
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Goods.findOneByUsername(description)
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
//let msg ='Success updating admin2!';
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