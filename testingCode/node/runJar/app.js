'use strict';
// const crypto = require('crypto');
const fs= require('fs');
// // const x509 = require('x509');
// //const pem = require('pem');
// const RSA = require('rsa-compat').RSA;

 
//var key = x509.parseCert('F:/Encrypt/encrypt/GSTN_G2A_SANDBOX_UAT_public_one.cer');
// pem.readPkcs12(key, (err, cert) => {
//     if(err)
//       throw err;
//     console.log(cert);
// });

// var jarfile = require("jarfile")
 
// Get the Main-Class entry from foo.jar. 
// var child = require('child_process').spawn(
//   'java', ['-jar', 'F:/Encrypt/encryptoo/SampleCode.jar']
// );
var exec = require('child_process').exec;
var child = exec('java -jar SampleCode.jar ',function(error,stdout,stderr){
  console.log('output->'+ stdout)
  if(error !==null){
    console.log('error->'+ error)
  }
});

 
//console.log(child);
// jarfile.fetchJarAtPath("F:/Encrypt/encryptoo/SampleCode.jar", function (err, jar) {
//     console.log(jar.valueForManifestEntry("AESEncryption"))
// })
// var key = new NodeRSA();

//         var keyData = '-----BEGIN CERTIFICATE----- MIIDtzCCAp+gAwIBAgIJAOpj8IA2091wMA0GCSqGSIb3DQEBCwUAMHIxCzAJBgNVBAYTAklOMQswCQYDVQQIDAJETDELMAkGA1UEBwwCREwxDTALBgNVBAoMBEdTVE4xDTALBgNVBAsMBEdTVE4xDTALBgNVBAMMBEdTVE4xHDAaBgkqhkiG9w0BCQEWDWdzdG5AZ3N0bi5jb20wHhcNMTcwMzA3MTIzOTE1WhcNMTgwMzA3MTIzOTE1WjByMQswCQYDVQQGEwJJTjELMAkGA1UECAwCREwxCzAJBgNVBAcMAkRMMQ0wCwYDVQQKDARHU1ROMQ0wCwYDVQQLDARHU1ROMQ0wCwYDVQQDDARHU1ROMRwwGgYJKoZIhvcNAQkBFg1nc3RuQGdzdG4uY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn4ccEVpmsRfrUvxK6yfkg6brTJoGe90qzDNWOSqXJh51mwyLKjd7mccSaL7oMKTkXKLRmZvZtR1NYWnAU6nuKNjDQOC6LTzhoSE7siL2rneh0+A9rXyjEl6FuYp+ilV5rrsuWR3RLCUDYOFkIobHDdhbl/B8Ol05bLrZvU1XIn7E98j47q/rWGp+SiHA5Ui7hAw+b2UCv8os8HWKmr6zNDziKPCGabrZTws/e1XJ0/uW5mxTfX/DOjbukP+aosMrlD1kVocJr+SrVRKzIOiC7FYuY6q2CGY5+soXz8cQi7be6h5wJvZB9HdU6mYzTk4yw/bnNvuqlGIgoGF0nZznMwIDAQABo1AwTjAdBgNVHQ4EFgQU5VIjlyN5gqpV4Enx4waVZrjfZHAwHwYDVR0jBBgwFoAU5VIjlyN5gqpV4Enx4waVZrjfZHAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAig+vPjtxb8uc93pDf7Mz2i7Obrmv9MVhfbG7ygqtjHXRQC6xvm7U/nVuQTS44uIEBjp7SV4Js72D+jO90paItJ8OAeHoKq+JeIdGXz/33ocCZZQiwjCs4E3lErMEBH7Q4VnarWoEIHdjsWybKaApGc5+sBiF2DnfPL11pMH4l1bWzuyMlBFp/6ODn/sHaPBwdVaNIwEx/nm0C9GHm5O4gA2EQH6W2qrgaJTMsN3N5bK5fgS1NRR71JhvprVlvt3rnL7pB1ocgMiQ7293LyxOFS7zqVqCRykMcstROXGPjePosMY4HY1VfW7pVFs9K7qPY8/h132h/xGZwQD5x3S8CQ==-----END CERTIFICATE-----';

//         key.importKey(keyData,'pkcs8-public');

//         var data =  "hello node.js";

//         var encrypted = key.encrypt(data, 'base64');

// var key = x509.parseCert(fs.readFileSync('F:/Encrypt/encrypt/GSTN_G2A_SANDBOX_UAT_public_one.cer').toString());
// console.log(key)
// let data = key.publicKey.n;  
// let buff = new Buffer(data);  
// let base64data1 = buff;

// console.log("buff",base64data1)
//   const skey="adasdewc";
// const test="575757";

// var sharedSecret = crypto.randomBytes(20); // should be 128 (or 256) bits
// var initializationVector = crypto.randomBytes(20);// IV is always 16-bytes
// // const spkac = getSpkacSomehow();
// // const publicKey = crypto.exportPublicKey(spkac);

// const SEK = crypto.createCipher('aes-256-ecb',sharedSecret,initializationVector);
// const sekbase64data = SEK.update(test,'utf8','base64')+SEK.final('base64');
// console.log('OTP=>',sekbase64data)
// /*let data = e;  
// let buff = new Buffer(data);  
// let base64data = buff.toString('base64')

// console.log(base64data)*/
// const base64datatoBytes=toUTF8Array(sekbase64data);

// const bytesencrypt=crypto.createCipher('aes-256-ecb',sharedSecret,initializationVector);
// const appkey = bytesencrypt.update('base64datatoBytes','utf8','base64')+bytesencrypt.final('base64');

// console.log("Appkey",appkey)


// const encrypt=crypto.createCipher('aes-256-ecb',base64data1 );
// const encryptkey = encrypt.update('appkey','base64')+encrypt.final('base64');
// const enkey = encryptkey.toString();
// console.log("encrypt data =>",encryptkey)
// console.log("encrypt data =>",enkey)
// function toUTF8Array(str) {
//     var utf8 = [];
//     for (var i=0; i < str.length; i++) {
//         var charcode = str.charCodeAt(i);
//         if (charcode < 0x80) utf8.push(charcode);
//         else if (charcode < 0x800) {
//             utf8.push(0xc0 | (charcode >> 6), 
//                       0x80 | (charcode & 0x3f));
//         }
//         else if (charcode < 0xd800 || charcode >= 0xe000) {
//             utf8.push(0xe0 | (charcode >> 12), 
//                       0x80 | ((charcode>>6) & 0x3f), 
//                       0x80 | (charcode & 0x3f));
//         }
//         // surrogate pair
//         else {
//             i++;
//             // UTF-16 encodes 0x10000-0x10FFFF by
//             // subtracting 0x10000 and splitting the
//             // 20 bits of 0x0-0xFFFFF into two halves
//             charcode = 0x10000 + (((charcode & 0x3ff)<<10)
//                       | (str.charCodeAt(i) & 0x3ff));
//             utf8.push(0xf0 | (charcode >>18), 
//                       0x80 | ((charcode>>12) & 0x3f), 
//                       0x80 | ((charcode>>6) & 0x3f), 
//                       0x80 | (charcode & 0x3f));
//         }
//     }
//     return utf8;
// }





