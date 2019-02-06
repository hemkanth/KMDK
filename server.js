// import modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

// import necessary js files
var ErrorManagement = require('./server/handling/ErrorHandling.js');
var LogManagement = require('./server/handling/LogHandling.js');

// set port & assign var to express function
var port = process.env.PORT || 3000;
var app = express();

// DB Connection
mongoose.connect('mongodb://hemkanth:hemkanth_s123@ds125381.mlab.com:25381/kdmk', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {   // Error in DB Connection
   console.log('DB Connection Error', err);
});
mongoose.connection.once('open', () => {     // DB Connected Successfully 
   console.log('DB Connected Successfully');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/view/dist/view/'));

app.use(function(req, res) {
   res.sendFile(path.join(__dirname, '/view/dist/view', 'index.html'));
});

app.get('*', function(req, res){
   res.send('This is Server Side Page');
});

app.listen(port, function(){
 console.log('Listening on port ' + port);
});