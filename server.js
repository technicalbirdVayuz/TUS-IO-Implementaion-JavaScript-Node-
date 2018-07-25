
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var bodyParser = require('body-parser');
var Products = require('./database.js');
var Users = require('./database.js');
var Companies  = require('./database.js');


app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 3333;
var host = "0.0.0.0";
app.listen(port);
console.log('server started '+ port);

const fs = require('fs');

const Server = require('./index').Server;
const FileStore = require('./index').FileStore;
const GCSDataStore = require('./index').GCSDataStore;
const S3Store = require('./index').S3Store;
const EVENTS = require('./index').EVENTS;

const server = new Server();
 const fileNameFromUrl = (req) => {

    return req.url.replace(/\//g, '-');
}
server.datastore = new FileStore({
            path: '/files'
});

/**
 * Basic GET handler to serve the demo html/js
 *
 * @param  {object} req http.incomingMessage
 * @param  {object} res http.ServerResponse
 */


const writeFile = (req, res) => {
    console.log("req");
    console.log("req");
    console.log("req");
    console.log("req");
    console.log(req);
    const filename = req.url === '/' ? 'demo/index.html' : req.url;
    const filepath = path.join(process.cwd(), filename);
    fs.readFile(filepath, 'binary', (err, file) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write(err);
            res.end();
            return;
        }

        res.writeHead(200);
        res.write(file);
         res.status(200).send({"msg":"success","user_id":"Ank"});
        res.end();
    });
};

// Define routes to serve the demo html/js files.
// server.get('/', writeFile);
// server.get('/demo/index.js', writeFile);
// server.get('/node_modules/tus-js-client/dist/tus.js', writeFile);

/*server.on(EVENTS.EVENT_FILE_CREATED, (event) => {
    console.log(`Upload file created for file`);
    console.log(event.file);
});*/

server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    console.log(event.file);
    console.log(`[${new Date().toLocaleTimeString()}] [EVENT HOOK] Upload complete for file ${event.file.id}`);
});

server.get('/uploads', (req, res) => {
  console.log("req");
    const files_path = path.join(process.cwd(), server.datastore.path);
    fs.readdir(files_path, (err, filenames) => {
        const files = filenames.map((filename) => {
            return {
                name: filename,
                url: `http://${host}:${port}/${filename}`,
            };
        });

        res.writeHead(200);
            res.status(200).send({"msg":"success","user_id":"Ank"});
          res.write(JSON.stringify({ files }));
        res.end();
    });
});

port = 8000;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port} `);
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '1024kb'
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/files/*',function(request,response){


const filePath =  __dirname + request.url; // or any file format
  // console.log(__dirname + filePath);
  // Check if file specified by the filePath exists 
  fs.exists(filePath, function(exists){
      if (exists) {     
        // Content-type is very interesting part that guarantee that
        // Web browser will handle response in an appropriate manner.
        response.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + request.url
        });
        fs.createReadStream(filePath).pipe(response);
      } else {
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.end("ERROR File does not exist");
      }
    });
})
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/dist/login/login.html')
})
app.get('/companies', function (req, res) {
    res.sendFile(__dirname + '/dist/companies/companies.html')
})
app.get('/add_companies', function (req, res) {
    res.sendFile(__dirname + '/dist/add_companies/add_companies.html')
})

/*
const tus = require('tus-node-server');

const server = new tus.Server();
server.datastore = new tus.FileStore({
    path: '/files'
});

const Server = require('tus-node-server').Server;
const EVENTS = require('tus-node-server').EVENTS;

const server = new Server();
server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    console.log(`Upload complete for file ${event.file.id}`);
});*/

// const host = '0.0.0.0';
// const port = 8000;
// server.listen({ host, port }, () => {
    // console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
// });


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




app.post("/check_login_crendentials",function(data,res){
  console.log("ccall");
  console.log('1');
   if(data.body){
      console.log(data.body)
        var user_email = data.body.user_email;
        var user_password = data.body.user_password;
        console.log(user_email);
        console.log(user_password);
        Users.find({ user_email: user_email, user_password: user_password, user_role: 'admin'}, function (err,result) {
          if(err){
            return res.send({status : 500 , msg : "Connection occured"}); 
          }else{
            if(result.length == 1){
              return res.status(200).send({"msg":"success","user_id":result[0].user_id}); 
            }else{
              return res.status(200).send({"msg":"wrong credentails"});  
            }
            console.log(result);
          }
        });

    }else{
         res.send({status : 500 , msg : "Some error occured"});
    }
})

app.get("/fetch",function(req, res) {
  Products.find((err, product) => {  
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all people
    return res.status(200).send(product);
  });
});

app.get("/fetch_all_companies",function(req, res) {
  Companies.find({},(err, product) => {  
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all people
    return res.status(200).send(product);
  });
});

// Check Login Credentails
app.post("/insert",function(req, res) {
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


// var upload = require("tus-node-server");

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

/* var upload = require("tus");
 
app.use("/files", upload.createServer({
    directory: __dirname + "/uploads",
    maxFileSize: 1024 * 1024 * 5,
    complete: function(req, res, next) {
        console.log("File uploaded with the following metadata:", req.upload);
        res.send(200);
    }
}));
*/
