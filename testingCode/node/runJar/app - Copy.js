'use strict';
const crypto = require('crypto');
const x509 = require('x509');
const fs= require('fs');
//const pem = require('pem');
const RSA = require('rsa-compat').RSA;

var key = x509.parseCert('F:/Encrypt/encrypt/GSTN_G2A_SANDBOX_UAT_public_one.cer');


//var key =fs.readFileSync('E:/Cer/GSTN_G2A_SANDBOX_UAT_public.cer').toString();
//console.log("key => ",key)
//var cert = x509.parseCert('GSTN_G2A_SANDBOX_UAT_public.cer');  

let data = key;  
//let buff = new Buffer(data);  
let base64data1 = key;//buff.toString('base64')

//console.log(buff)
	const skey="adasdewc";
const test="575757";

var sharedSecret = crypto.randomBytes(20); // should be 128 (or 256) bits
var initializationVector = crypto.randomBytes(20);// IV is always 16-bytes
// const spkac = getSpkacSomehow();
// const publicKey = crypto.exportPublicKey(spkac);

const SEK = crypto.createCipher('aes-256-ecb',sharedSecret,initializationVector);
const sekbase64data = SEK.update(test,'utf8','base64')+SEK.final('base64');
console.log("OTP => ",sekbase64data)
/*let data = e;  
let buff = new Buffer(data);  
let base64data = buff.toString('base64')

console.log(base64data)*/
const base64datatoBytes=toUTF8Array(sekbase64data);

const bytesencrypt=crypto.createCipher('aes-256-ecb',sharedSecret,initializationVector);
const appkey = bytesencrypt.update('base64datatoBytes','utf8','base64')+bytesencrypt.final('base64');
console.log("Appkey",appkey)
const encrypt=crypto.createCipher('aes-256-ecb',base64data1);
const encryptkey = encrypt.update(appkey,'utf8','base64')+encrypt.final('base64');

console.log("encrypt ",encryptkey)
function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}





