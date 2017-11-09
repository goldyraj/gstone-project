const Invoice = require('../../../models/invoice')

/* 
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
      // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }
 Invoice.find({}).exec()
    .then(
        invoice=> {
            res.json({invoice})
        }
    )
   }

exports.delete=(req,res)=>{
      const {_id} = req.body
      console.log(_id)
  Invoice.findByIdAndRemove(_id, function(err) {
  if (err){ throw err;
    res.json({'invoice':err})
}else{
    res.json({'message':'invoice is Successfully deleted'})  
}

  // we have deleted the user
   
});
}
exports.searchf=(req,res)=>{
    var query = Invoice.find({"name": "kunba3l"}).exec(function (err, docs) {
  console.log(docs)
  // called when the `query.complete` or `query.error` are called
  // internally
}).then(
        invoice=> {
            res.json({invoice})
        }
    )

}

exports.create = (req, res) => {
    const {name,invoice_no,date,gstin_no,pos,e_com_gstin,type,gtotal,items} = req.body
    let newUser = null
 // if(!req.decoded.admin) {
 //        return res.status(403).json({
 //            message: 'you are not an admin'
 //        })
 //    }
    // create a new user if does not exist
    const create = (invoice) => {
       
   
        if(invoice) {
            throw new Error('Invoice No Name exists')
        } else {
            return Invoice.create(name,invoice_no,date,gstin_no,pos,e_com_gstin,type,gtotal,items)
        }
    }
    // count the number of the user

    const count = (invoice) => {
        newUser = invoice
        return Invoice.count({}).exec()
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
    Invoice.findOneByUsername(invoice_no)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}


/*
    POST /api/user/assign-admin/:username
*/
