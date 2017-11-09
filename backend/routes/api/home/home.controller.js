const Notification = require('../../../models/notification')
const Vedio = require('../../../models/vedio')
const Internal = require('../../../models/internal')
  //  var debug = require('debug')('http') , http = require('http');
//================= Notification List for Home page =======================
  exports.notification=(req,res)=>{
//console.log(req);
var query={};

req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={title:req.query.search})
    query={title:req.query.search}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Notification.count(query,function(err,count){
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
    select:'title description link',
    sort:req.query.sortBy,
   // populate:'title description link',
    offset:offset,
    limit:req.query.limit
};
Notification.paginate(query,option).then( notification=> {
            res.json(notification)
        })
    .catch(onError);
}

//================= vedio List for Home page =======================
  exports.vedio=(req,res)=>{
//console.log(req);
var query={};

req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={title:req.query.search})
    query={title:req.query.search}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Vedio.count(query,function(err,count){
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
    select:'title description link',
    sort:req.query.sortBy,
   // populate:'title description link',
    offset:offset,
    limit:req.query.limit
};
Vedio.paginate(query,option).then( vedio=> {
            res.json(vedio)
        })
    .catch(onError);
}
//================= internal Update List for Home page =======================
  exports.internal=(req,res)=>{
//console.log(req);
var query={};

req.query.limit=parseInt(req.query.limit);
if(req.query.search && req.query.search.length>0){
    console.log(query={title:req.query.search})
    query={title:req.query.search}
}
if(!req.query.limit ||isNaN(req.query.limit) ){
    req.query.limit=5;
}
if(!req.query.page||isNaN(req.query.page)||parseFloat(req.query.page)<1)
{
    req.query.page=1;
}
var offset=(req.query.page-1)*req.query.limit;
Internal.count(query,function(err,count){
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
    select:'title details link date status',
    sort:req.query.sortBy,
   // populate:'title description link',
    offset:offset,
    limit:req.query.limit
};
Internal.paginate(query,option).then( internal=> {
            res.json(internal)
        })
    .catch(onError);
}