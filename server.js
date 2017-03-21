let express = require('express');
let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
let expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

//configuration
let config = require("./config/config.js")

//Contollers
let authController = require('./controllers/auth.js');

//Models
let User = require('./models/user.js');


let app = express();



// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: config.secret}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/'));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

app.post('/authenticate', authController);

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.listen(3000, function () {
  console.log('listening on http://localhost:8080');
});
