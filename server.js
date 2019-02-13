// import modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
// Change
// import necessary js files
var ErrorManagement = require('./server/handling/ErrorHandling.js');
var LogManagement = require('./server/handling/LogHandling.js');

// set port & assign var to express function
var port = process.env.PORT || 5000;
var app = express();

// process.setMaxListeners(0);

// DB Connection
mongoose.connect('mongodb://hemkanth:hemkanth_s123@ds125381.mlab.com:25381/kdmk', { useNewUrlParser: true, useCreateIndex: true, });
mongoose.connection.on('error', (err) => {   // Error in DB Connection
   console.log('DB Connection Error', err);
});
mongoose.connection.once('open', () => {     // DB Connected Successfully 
   console.log('DB Connected Successfully');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// *********************** import Web routes file ***************************
require('./server/web/routes/Settings.routes.js')(app); // Settings Routes
require('./server/web/routes/Members.routes.js')(app); // Members Routes

// *********************** import App routes file ***************************
require('./server/app/routes/Settings.routes.js')(app); // Settings Routes
require('./server/app/routes/Members.routes.js')(app); // Members Routes
require('./server/app/routes/Event.routes.js')(app); // Event Routes
require('./server/app/routes/Enquiry.routes.js')(app); // Enquiry Routes
require('./server/app/routes/Complaint.routes.js')(app); // Complaint Routes
require('./server/app/routes/Advertisement.routes.js')(app); // Advertisement Routes


// app.use(express.static(__dirname + '/view/dist/view/'));

// app.use(function(req, res) {
//    res.sendFile(path.join(__dirname, '/view/dist/view', 'index.html'));
// });

app.get('*', function(req, res){
   res.send('This is Server Side Page');
});

app.listen(port, function(){
 console.log('Listening on port ' + port);
});