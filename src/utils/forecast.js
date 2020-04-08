const request = require('request');


///////////////////////

const forecast = (lat,long,callback) => {    
    //const url = 'api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&appid=69ccd87a0e550d5dc177517e5d4f8df6';
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=69ccd87a0e550d5dc177517e5d4f8df6'
    
    request({url, json:true},(error,{body}) => {
       if(error){
           console.log(error)
           callback("Unable to connect to Server",undefined)
       }else if(body.cod === 404){
           callback("Unable to find weather, try another search ",undefined)
       }else{
           callback(undefined,{
               temp:body.main.temp,    
               temp_min : body.main.temp_min,
               temp_max: body.main.temp_max,                          
           });
       }
    })    
}

module.exports = forecast;