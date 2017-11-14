const Branch = require('../../../models/branch')
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
    console.log(query={name:req.query.search})
    query={name:req.query.search}
}
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
Branch.count(query,function(err,count){
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
    select:'name pan_no gstin gstin dealer_type contact branch_name email address city state  created_at',
    sort:sortfiled, 
    offset:offset,
    limit:req.query.limit
};
Branch.paginate(query,option).then(branch=> 
          
            res.json(branch)
        )
    .catch(onError);
}

exports.list = (req, res) => {
    // refuse if not an admin
//=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
 Branch.find({}).exec()
    .then(
        Branch=> {
            res.json({Branch})
        }
    )
   }
   
exports.update=(req,res)=>{
        const {_id,name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state} = req.body
        //=========Authrise function
         var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
     var updated_at=  Date.now();
         Branch.findOneAndUpdate({_id:_id}, {$set:{name:name,pan_no:pan_no,dealer_type:dealer_type,
            branch_name:branch_name,contact:contact,email:email,address:address,city:city,state:state,updated_at:updated_at}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});
          const respond = () => {
        res.json({
            message: 'Branch Successfully Update'
        
 
        })
    }
    //    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
      Branch.findOneByUsername(title)          
         .then(respond)
         .catch(onError)
}
exports.create = (req, res) => {
    const {name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state} = req.body
    //=========Authrise function
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    let newUser = null
   // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }
    // create a new user if does not exist
    const create = (branch) => {
       
   
        if(branch) {
            throw new Error('Branch Name exists')
        } else {
            return Branch.create(name,pan_no,gstin,dealer_type,branch_name,contact,email,address,city,state,req.decoded._id)
        }
    }
    // count the number of the user

    // const count = (hsn) => {
    //     newUser = hsn
    //     return Hsn.count({}).exec()
    // }

    // assign admin if count is 1
   
 const respond = () => {

        res.json({
            message: 'Branch Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)

    const onError = (error) => {
         console.log(error.message.index)
        res.status(409).json({
            messages: "Pan Number allready exites "
        })
    }

    // check username duplication
    Branch.findOneByUsername(branch_name)
    .then(create)
    .then(respond)
    .catch(onError)
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
      for (var i = 0; i <myobj.length; i++) {
       myobj[i].userid=req.decoded._id; 
     }
 var multirecord = function () {
      return new Branch.insertMany(myobj, function(err, res) {})
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

exports.apipost=(req,res,next)=>{
//     var upload = multer({
//     storage: storage,
//     // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
//     //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
// }).fields([ // fields to accept multiple types of uploads
//     { name: "fileName", maxCount: 1 } // in <input name='fileName' />
// ]);

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../../../uploads/data1')
//     },
//     filename: function (req, file, cb) {
//         //console.log(file.mimetype)
//         cb(null, file.originalname + '-' + Date.now() + '-' + getExtension(file));
//     }
// });
// function getExtension(file) {
//     // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
//     var res = '';
//     if (file.mimetype === 'image/jpeg') res = '.jpg';
//     if (file.mimetype === 'image/png') res = '.png';
//     return res;
// }
//    var prog = progress({time:100},function(progress){ // time:100 means will check progress every 100 ms, say to update progress bar
//     // NOTE may need to increase accepted file size to see any kind of progress, might be too fast
//     var len = this.headers['content-length'];
//     var transf = progress.transferred;
//     var result = Math.round(transf/len * 100)+'%';
//     console.log(result); // writes progress to console. does not work with images from internet, only file uploads
//     //if (result != '100%') res.send(result)
//   });

//   req.pipe(prog);
//   prog.headers = req.headers;

//     upload(prog, res, function (err) { // changed req to prog in order to track % upload progress
//         if (err) {
//             res.status(err.status || 500).json({ "error": { "status_code": err.status || 500, "message": err.code } });
//             return;
//         } else {

//           // NOTE on what you can expect here
//           // console.log(req.file); // if using upload.single('yourInputName')
//           // console.log(req.files); // if using upload.fields([]); // array of input field names
//           // console.log(req.body); // if using a text field instead of file input, ex. to grab url from another site by path name

//             if (prog.files.fileName) { // fileName comes from input element:   <input type="file" name="fileName">

//                 res.writeHead(200,{'Content-Type':'text/html'});
//                 var reqJSON = JSON.stringify(prog.files.fileName, null, 2); // pretty print the JSON for <pre> tag

//                 res.write("<h1>Uploaded from file</h2><img style='max-width:20%' src='" + prog.files.fileName[0].path + "'/><pre>" + reqJSON + "</pre><a href='/'>Go back</a>");
//                 res.end();
//                 //console.log("req.files.fileName")
//                 //console.log(req.files.fileName)
//             }
//             else if (prog.body.imageUrl) {

//               // the text field was used, so process the input type=text with regular node/express
//                 var download = function (uri, filename, callback) {
//                     request.head(uri, function (err, res, body) {
//                         console.log('content-type:', res.headers['content-type']);
//                         console.log('content-length:', res.headers['content-length']);
//                         request(uri).pipe(fs.createWriteStream('uploads/' + filename)).on('close', callback);
//                     });
//                 };

//                 // this is only available when submitting a text url, not by choosing file to upload
//                 var urlParsed = url.parse(prog.body.imageUrl);
//                 if (urlParsed.pathname){
//                   var onlyTheFilename = urlParsed.pathname ? urlParsed.pathname.substring(urlParsed.pathname.lastIndexOf('/') + 1).replace(/((\?|#).*)?$/, '') : '';
//                   //console.log(urlParsed)
//                   var newFilename = onlyTheFilename + '-' + Date.now() + '-' + onlyTheFilename
//                   var wholePath = './uploads/' + newFilename;
//                   download(urlParsed.href, newFilename, function () {
//                     var reqJSON = JSON.stringify(wholePath, null, 2); // pretty print
//                     res.end("<h1>Uploaded from URL</h2><img style='max-width:50%' src='" + wholePath + "'/><pre>" + reqJSON + "</pre><a href='/'>Go back</a>")
//                     console.log("wholePath")
//                     console.log(wholePath)
//                   });
//                 }
//             }
//         }
//     });
}
exports.delete=(req,res)=>{
  
  Branch.findByIdAndRemove(req.params.id, function(err) {
  if (err){ 
    res.json({'invoice':err})
}else{
    res.json({'message':'HSN is Successfully deleted'})  
}


  // we have deleted the user
   
});
}