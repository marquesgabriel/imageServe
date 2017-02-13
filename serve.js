// var http = require('http')
//   , fs = require('fs');

// fs.readFile('image.jpg', function(err, data) {
//   if (err) throw err; // Fail if the file can't be read.
//   http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'image/jpeg'});
//     res.end(data); // Send the file data to the browser.
//   }).listen(8124);
//   console.log('Server running at http://localhost:8124/');
// });
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var port = process.env.PORT || 6969;        // set our port
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  // console.log(req.url);
  var param = req.url.replace("/?barcode=","")
  if(param.length >13){
    param = param.slice(1);
  }
  if(param != "undefined" && param != undefined && param != ""){
    if(fs.existsSync('images/'+param+'.jpg')) {
      res.sendFile(__dirname + '/images/'+param+'.jpg');
    }else{
      // res.sendFile(__dirname + '/images/not-found.jpg');
      res.status(404).send('Not found');
    }
  }else{
    // res.sendFile(__dirname + '/images/not-found.jpg');
    res.status(404).send('Not found');
  }
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
