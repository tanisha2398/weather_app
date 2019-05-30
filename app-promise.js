// const request = require('request');
require('dotenv').config();
const yargs=require('yargs');
const axios =require('axios');
const fs=require('fs');

const argv =yargs
.options({
   a:{ 
       describe:"Adress to fetch weather for",
       demand:false,
       alias:'adress',
       string:true
   } 
})
.help()
.alias('help','h')
.argv;

//extra feature
if(argv.a===undefined){
    console.log("you are running for default location ");
 var defAdress=JSON.parse(fs.readFileSync('default-address.json'));
 argv.a=defAdress[0].address;
}
// console.log(argv.a);
//###
const keyapi=process.env.KEY;
var encodedAdress=encodeURIComponent(argv.a);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?key=${keyapi}&address=${encodedAdress}`;
 

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find address');
    }
    var lat=response.data.results[0].geometry.location.lat;
    var lan=response.data.results[0].geometry.location.lng;
    var weatherUrl=`https://api.darksky.net/forecast/105d7c3136c3e68024fa5c630a207ea2/${lat},${lan}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature=response.data.currently.temperature;
    var apparentTemperature=response.data.currently.apparentTemperature;
    var windSpeed=response.data.hourly.data[0].windSpeed;
    console.log(`Its curently ${temperature}.It feels like ${apparentTemperature}.Wind speed= ${windSpeed}`);
}).catch((e)=>{
    if(e.code === 'ENOTFOUND')
    {
         console.log('Unable to connect to API server');
    }else{
        console.log(e.message);
    }
});




