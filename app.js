const request = require('request'); 
request({
    url:'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyANOyYtX8smliwp0kLXoDQ-xaXVQaMDRNg&address=dehradun',
    json:true
},(err,res,body)=>{
    console.log(body);
})  ;