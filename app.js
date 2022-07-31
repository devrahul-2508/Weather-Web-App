const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}))


app.get("/",function(req,res){

   res.sendFile(__dirname+"/index.html")
    
})

app.post("/",function(req,res){
    
    console.log("Request Received"+req.body.cityName);

const query = req.body.cityName;
const apiKey = "84d40279b78e1e064dc905255d413002";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey

https.get(url,function(response){
    
 

    response.on("data",function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
       res.write("<h1>The temperature in "+query+" is "+temp+"</h1>");
       res.write("<p>The description of weather is "+ weatherDescription +"</p>");
       res.write("<img src="+imageUrl+">");
       res.send();
      
    })
    
})

})




app.listen(3000,function(){
    console.log("Server started at port 3000");
})
