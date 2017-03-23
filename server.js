let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
let expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

//configuration
let config = require("./config/config.js")

//Contollers
let controller = require('./controllers');
console.log(controller)
//Models
let User = require('./models/user.js');

// We are going to protect /api routes with JWT
//app.get('/api', expressJwt({secret: config.secret}));

app.use(expressJwt({secret: config.secret}).unless({path: ['/authenticate']}));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/register', controller.register);

app.post('/authenticate', controller.auth);

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.listen(3000, function () {
  console.log('listening on http://localhost:3000');
});
