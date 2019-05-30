const request =require('request');

var getWeather=(lat,lan,callback)=>{


   

    request({
        url:`https://api.darksky.net/forecast/105d7c3136c3e68024fa5c630a207ea2/${lat},${lan}`,
        json:true
    },(err,res,body)=>{
        if(!err && res.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature  
            });
        }else {
            callback('Unable to Fetch error');
        }
    });
};

module.exports={
    getWeather
};

