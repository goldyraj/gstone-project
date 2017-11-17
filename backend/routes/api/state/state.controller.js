const State = require('../../../models/state')
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
State.count(query,function(err,count){
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
    select:'name code created_at',
    sort:sortfiled,
    offset:offset,
    limit:req.query.limit
};
State.paginate(query,option).then( state=>res.json(state)
        )
    .catch(onError);
}
/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
 //var myCallback=usingItNow(req.decoded)
 // if(myCallback) {
 //   return res.status(403).json({
 //            message: 'you are not an authorise'
 //        }) 
 //    }
 State.find({}).exec()
    .then(
        state=> {
            res.json({state})
        }
    )
   }

exports.create = (req, res) => {
    const {name,code} = req.body
    let newUser = null
  //=========Authrise function
  var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (state) => {
       
   
        if(state) {
            throw new Error('State Name exists')
        } else {
            return State.create(name,code)
        }
    }
    // count the number of the user

    const count = (state) => {
        newUser = state
        return State.count({}).exec()
    }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'State Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    State.findOneByUsername(name)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/State/upadate
*/
exports.update=(req,res)=>{
        const {_id,name,code} = req.body
        var updated_at=  Date.now();
        //=========Authrise function
  var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
         State.findOneAndUpdate({_id:_id}, {$set:{name:name,code:code,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'State Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      State.findOneByUsername(name)          
         .then(respond)
         .catch(onError)
}

exports.delete=(req,res)=>{
    
       console.log('format',req.baseUrl)
  State.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'State is Successfully deleted'})  
}


  // we have deleted the user
   
});
}
/*
    POST /api/user/uploadfile
*/
exports.uploadfile=(req,res)=>{
var myobj= req.body.data

//let msg ='Success updating admin2!';
//=========Authrise function
  var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
 var multirecord = function () {
      return new State.insertMany(myobj, function(err, res) {})
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