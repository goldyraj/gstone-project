const Invoice = require('../../../models/invoice')

    var Curl = require( 'node-libcurl' ).Curl;
   var usingItNow = function(req) {
if(req.type=="agentuser"||req.type=="admin"){
  return false;
}else{
   return true;
}
}

// var java = require('java');
// var javaLangSystem = java.import('java.lang.System');
// var javal = java.import('java.lang.*');
// var IOException=java.import('java.io.IOException');
// var Cipher=java.import('javax.crypto.Cipher');
// //import ;
// //import java.security.PublicKey;
// var PublicKey=java.import('java.security.*');
// var ileInputStream=java.import('java.io.FileInputStream');
// var CertificateFactory=java.import('java.security.cert.CertificateFactory');
// var X509Certificate=java.import('java.security.cert.X509Certificate');
//   var publicKeyUrl1 = "F:\\Encrypt\\SampleCode\\GST_Sandbox_Public_key\\GSTN_G2A_SANDBOX_UAT_public.cer";
//   var file;
//import java.security.cert.CertificateFactory;
//import java.security.cert.X509Certificate;
/* 
    GET /api/user/list
*/
 // function readPublicKey(filename) {
 //        ileInputStream fin = new ileInputStream.FileInputStream(filename);
 //        CertificateFactory f = CertificateFactory.getInstance("X.509");
 //        X509Certificate certificate = (X509Certificate) f.generateCertificate(fin);
 //        PublicKey pk = certificate.getPublicKey();
 //        Security.addProvider(new BouncyCastleProvider());
 //        return pk;

 //    }
exports.list = (req, res) => {
    var exec = require('child_process').exec, child;
child = exec('java -jar C:\\..\\..\\yourjar.jar',
function (error, stdout, stderr){
console.log('stdout: ' + stdout);
console.log('stderr: ' + stderr);
if(error !== null){
  console.log('exec error: ' + error);
}
});
    const fs = require('fs'),
      x509 = require('x509');
var issuer = x509.getIssuer(fs.readFileSync('./Public_key/GSTN_G2A_SANDBOX_UAT_public.cer').toString());
console.log(issuer);
    // refuse if not an admin
      // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }
 // Invoice.find({}).exec()
 //    .then(
 //        invoice=> {
 //            res.json({invoice})
 //        }
 //    )


// ;

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
    const {gstin,fp,gt,inum,cur_gt,b2b,b2cl,cdnr,b2cs,exp,hsn,nil,txpd,at,doc_issue,cdnur} = req.body
    let newUser = null
var myCallback=usingItNow(req.decoded)
 if(myCallback) {
   return res.status(403).json({
            message: 'you are not an authorise'
        }) 
    }
    // create a new user if does not exist
    const create = (invoice) => {       
   
        if(invoice) {
            throw new Error('Invoice Number Allready exists')
        } else {
            return Invoice.create(gstin,fp,gt,inum,cur_gt,b2b,b2cl,cdnr,b2cs,exp,hsn,nil,txpd,at,doc_issue,cdnur,req.decoded._id)
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
            message: 'Invoice  Successfully Save'
        
 
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Invoice.findOneByInvoicenumber(inum)
    .then(create)
    .then(count)   
    .then(respond)
    .catch(onError)
}

exports.view=(req, res)=>{
var crypto = require('crypto'),  algorithm = 'aes-256-ctr', password = 'd6F3Efeq';
function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
var hw = encrypt("hello world")
// outputs hello world
console.log(decrypt(hw));

// var fieldsStr = '{}';
// curl.setopt('CURLOPT_POST', 1); // true?
// curl.setopt('CURLOPT_POSTFIELDS', fieldsStr);
 
// curl.setOpt( 'URL', 'www.google.com' );
// curl.setOpt( 'FOLLOWLOCATION', true );
 
// curl.on( 'end', function( statusCode, body, headers ) {
 
//     console.info( statusCode );
//     console.info( '---' );
//     console.info( body.length );
//     console.info( '---' );
//     console.info( this.getInfo( 'TOTAL_TIME' ) );
 
//     this.close();
// });
 
// curl.on( 'error', curl.close.bind( curl ) );
// curl.perform();
  
//   curl = require('node-curl');
// Invoice.findOne({_id:req.params.id},{_id:0,userid:0,created_at:0,__v:0,status:0,inum:0},function (err, data) {
//     if (err){ 
//     res.json({'meassge':'No Record Found '})
// }else{


//     res.json(data)  
// }
// });
}
/*
    POST /api/user/assign-admin/:username
*/
