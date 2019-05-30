// const request = require('request');
const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');
const argv =yargs
.options({
   a:{ 
       describe:"Adress to fetch weather for",
       demand:true,
       alias:'adress',
       string:true
   } 
})
.help()
.alias('help','h')
.argv;

// console.log(argv);
geocode.geocodeAdress(argv.a, (errorMsg,results) =>{
    if(errorMsg){
        console.log(errorMsg);
    }else{
        console.log(JSON.stringify(results,undefined,2));
    }
    weather.getWeather(results.latitude,results.longitude,(errorMsg,temp) =>{
            if(errorMsg){
                console.log(errorMsg);
            }else{
                console.log(`Its currently ${temp.temperature}.`);
            }
        });
});


