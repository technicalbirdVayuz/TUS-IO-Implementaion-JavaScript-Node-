
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

