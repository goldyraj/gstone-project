const About = require('../../../models/about')
//var csv=require('csv-parse');



exports.list = (req, res) => {
    // refuse if not an admin
    // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }
 About.find({}).exec()
    .then(
        about=> {
            res.json({about})
        }
    )
   }
/* 
    GET /api/hsn/index
*/




exports.create = (req, res) => {
  //  console.log(req.body)
    const {discription} = req.body
    let newUser = null
    //console.log(description)
  // var date  Date.now 
 // if(!req.decoded.admin) {
 //        return res.status(403).json({
 //            message: 'you are not an admin'
 //        })
 //    }
    // create a new user if does not exist
    const create = (about) => {
        if(about) {
            throw new Error('About  exists')
        } else {
          var ss=About.create(discription)
        console.log(ss)
             return ss
        }
    }
    // count the number of the user

     const count = (about) => {
         newUser = about
         return About.count({}).exec()
     }

    // assign admin if count is 1
   
 const respond = () => {
        res.json({
            message: 'About Successfully Save'
        
 
        })
    }
    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
    // check username duplication
    About.findOneByUsername(discription)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/HSN/update
*/
exports.update=(req,res)=>{
        const {_id,description} = req.body 
       // console.log(req.body);
      var updated_at=  Date.now();
         About.findOneAndUpdate({_id:_id}, {$set:{discription:description,updated_at:updated_at
          }}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'About Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      About.findOneByUsername(description)          
         .then(respond)
         .catch(onError)
}
// Upload File CSV 
