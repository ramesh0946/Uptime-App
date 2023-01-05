const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){

    res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req,res){
    
    const url = req.body.link;
    url_link = "https://"+url;

    https.get(url_link, function(response){

        if(response.statusCode == 200){
            res.write("<h1>The site is working fine</h1>");
            res.write("<h3>statuscode : "+ response.statusCode+"</h3>");
            res.write("<h3>statusMessage : "+ response.statusMessage +"</h3>")
        }else{
            res.write("<h3>statuscode : "+ response.statusCode+"</h3>");
            res.write("<h3>statusMessage : "+ response.statusMessage +"</h3>")
        }

    }).on("error", (e) => {
        var err = e.code;
        res.write("<h1>The url you entered didnot found, Please enter a valid url!!!</h1>");
        res.write("<p>"+err+"</p>")
        res.send();
    });


});

app.listen(3000, function(){
    console.log("server is running on port 3000");
});