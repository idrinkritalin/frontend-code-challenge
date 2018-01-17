// SETUP
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

// DEFINE ASSETS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//// ROUTE
// GET
app.get("/", function(req, res){
  const url = "https://api.mcmakler.de/v1/advertisements";
  request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
          const json = JSON.parse(body);
          res.render("home", {json : json});
      }
  });
});

// LISTENING
const port = 3000;
app.listen(port, function(){
   if(process.env.IP === undefined){
        process.env.IP = "localhost"
    }
    console.log("Server has started! Please open in the browser " + process.env.IP + ":" + port)
});
