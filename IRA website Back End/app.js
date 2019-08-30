var express = require("express");
var app = express();
var port = 3020;
var bodyParser = require('body-parser');
// var cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});

app.set('views',__dirname+'/views');
app.set('view engine','html');
app.set(__dirname );
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/website")
// .then((res) => {
//     console.log(".....................-------------",res)
// })
// .catch((err) => {
//     console.log(err)
// })

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";


var nameSchema = new mongoose.Schema({
    // _id : String,
    // type : String,
    // size : String,
    // position : String,
    // content : String,
    // image : String,
    // status : String,
    // create_date : String,
    // update_date : String   });
    firstName : String,
    lastName : String});


   var User = mongoose.model("adverti", nameSchema);

   app.post("/addname", (req, res) => {
 
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });


   app.get('/home',function(req,res){
   User.find({},function(err,docs){
    if(err) return res.json(err);
    res.send(docs);
    // var data=docs;
// res.sendFile(__dirname + "/home.html");
// res.send(docs);
//  res.render('home.html',{users:docs})
});
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });


app.listen(port, () => {
 console.log("Server listening on port " + port);
});

