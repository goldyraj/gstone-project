const Privacy = require('../../../models/privacy')
//var csv=require('csv-parse');
var fs=require('fs');

  var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}

};
exports.list = (req, res) => {
    // refuse if not an admin
   //=========Authrise function
 //   var myCallback=usingItNow(req.decoded)
 // if(myCallback) {
 //   return res.status(403).json({
 //            message: 'you are not an authorise'
 //        }) 
 //    }
 Privacy.find({}).exec()
    .then(
        privacy=> {
            res.json({privacy})
        }
    )
   }
/* 
    GET /api/hsn/index
*/

exports.create = (req, res) => {
    console.log(req.body)
    const {discription} = req.body
    //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    let newUser = null
   // console.log(discription)

    // create a new user if does not exist
    const create = (privacy) => {
        if(privacy) {
            throw new Error('Privay policy  exists')
        } else {
            return Privacy.create(discription)
        }
    }
    // count the number of the user

     const count = (privacy) => {
         newUser = privacy
         return Privacy.count({}).exec()
     }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'Privay policy Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Privacy.findOneByUsername(discription)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/HSN/update
*/
exports.update=(req,res)=>{
        const {_id,discription} = req.body
        //=========Authrise function
 var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
          var updated_at=  Date.now();
     
         Privacy.findOneAndUpdate({_id:_id}, {$set:{discription:discription,updated_at:updated_at
          }}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Privacy policy Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Privacy.findOneByUsername(discription)          
         .then(respond)
         .catch(onError)
}
// Upload File CSV 
