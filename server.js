
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var Products = require('./database.js');
 /*
// Connection URL
const url = 'mongodb://localhost:27017/cracker_db';
 
// Database Name
const dbName = 'cracker_db';
 var db;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
   db = client.db(dbName);
  // client.close();
   db.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    // db.close();
  });
});*/

app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 3000;
app.listen(port);
console.log('server started '+ port);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})




app.post("/insert",function(req, res) {
// //   db.collection('customers').save("Ank", (err, result) => {
// // if (err) return console.log(err)

// // console.log('saved to database');

// // })
// var result= db.collection('curdwcstomers').save({"name":"apple", "color":"red","shape":"round"},(err,result) => {
// if (err) return console.log(err)

// console.log('saved to database');	
// });
// res.status(200).send({status : 200 , msg: "loggedUserId", res:"SucessSignUp"});


 var p = new Products();
    p.title = "Title";
    p.price = 123;
    p.instock = true;
    p.photo = "true";
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Product Created !' })
    })

});



app.get("/fetch",function(req, res) {
	Products.find((err, product) => {  
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all people
    return res.status(200).send(product);
	});
});

// var upload = require("tus-node-server");

app.use(function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin', "*");
       //  res.setHeader('Access-Control-Allow-Origin', "https://qa-app.newgenpayments.com");
       //  res.setHeader('Access-Control-Allow-Origin', "http://demoapi.newgenpayments.com");
       //  res.setHeader('Access-Control-Allow-Origin', "https://app.newgenpayments.com");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("X-Frame-Options", "DENY");
        res.header("accept-encoding", "gzip,deflate");
        res.header("Content-Security-Policy", "frame-ancestors 'none'");
        res.header("X-XSS-Protection", "1; mode=block");
        next();
 });

// app.use("/files", upload.createServer({
//     directory: __dirname + "/uploads",
//     maxFileSize: 1024 * 1024 * 5,
//     complete: function(req, res, next) {
//         console.log("File uploaded with the following metadata:", req.upload);
//         // res.send(200);
//          res.send({ message: 'Product Created !' })
//     }
// }));

// const tus = require('tus-node-server');
// const server = new tus.Server();
// server.datastore = new tus.FileStore({
//     path: '/files'
// });

// var app = express();
// const uploadApp = express();
// uploadApp.all('*', server.handle.bind(server));
// app.use('/uploads', uploadApp);
// app.listen(port, "0.0.0.0");

 var upload = require("tus");
 
app.use("/files", upload.createServer({
    directory: __dirname + "/uploads",
    maxFileSize: 1024 * 1024 * 5,
    complete: function(req, res, next) {
        console.log("File uploaded with the following metadata:", req.upload);
        res.send(200);
    }
}));
