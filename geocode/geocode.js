const request=require('request');

var geocodeAdress = (address,callback)=>{
var encodedAdress=encodeURIComponent(address);
// console.log("================");
// console.log(encodedAdress);
// console.log("================");


request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyANOyYtX8smliwp0kLXoDQ-xaXVQaMDRNg&address=${encodedAdress}`,
    json:true
},(err,res,body)=>{
    if(err){
        callback('Unable to connect to google server');
    }else if(body.status === 'ZERO_RESULTS'){
        callback('Unable to find address');
    }else if(body.status === 'OK'){
    // console.log(JSON.stringify(res, undefined, 2));
    callback(undefined,{
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
    })
    
    }
});
};
module.exports={
    geocodeAdress
};


// 105d7c3136c3e68024fa5c630a207ea2
