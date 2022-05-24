const express = require('express')
//importing the https 
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}));

//making the post route
app.post("/", function(req,res){
    //  //now for making the query parameters
 const query = req.body.cityName;
 const apiKey = "65b2fa2fbcd22185ea26abcaf0296ae8";
 const unit = "metric"
 
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +",India&appid="+ apiKey +"&units="+ unit;
 https.get(url, function(response){
     console.log(response.statusCode)

     //capturing the data returned by the api
     response.on("data", function(data){
        const weatherData =  JSON.parse(data)
        //console.log(weatherData)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon;

        //getting the image url
        const imageUrl = " http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        //writing the multiple responses
        res.write("<p>The weather is currently " + weatherDescription + "<p>")
        res.write("<h1>The temperature in"+ query +" is " + temp + " degree Celsius.</h1>")
        //for the icon display
        res.write("<img src=" + imageUrl + ">")
        res.send()
     })
 });
    
    
});
app.get("/",function(req,res){
    
   //rendering the index.html file
   res.sendFile(__dirname+"/index.html");   
})



//setting the server
app.listen(3000, function(){
    console.log("server is running at port 3000")
})