const User = require('../../../models/user')
const crypto = require('crypto')
const config = require('../../../config')
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
return res.json({
    'message':"old password is not match",
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