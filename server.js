let express = require('express');
let app = express();
var morgan = require('morgan');

app.use(morgan(':req[authorization]'));

let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
let expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
let multer  = require('multer');
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {

            var getFileExt = function(fileName){
                var fileExt = fileName.split(".");
                if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
                    return "";
                }
                return fileExt.pop();
            };
            cb(null, Date.now() + '.' + getFileExt(file.originalname));
        }
    });

//configuration
let config = require("./config/config.js");

//Contollers
let controller = require('./controllers');

//Models
let User = require('./models/user.js');

// We are going to protect /api routes with JWT
//app.get('/api', expressJwt({secret: config.secret}));

app.use(expressJwt({secret: config.secret}).unless({path: ['/authenticate', '/api/register', /^\/uploads\/.*/]}));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '8MB'
}));
app.use(bodyParser.json());

app.get("/uploads/:img", function(req, res){
    console.log(req.params.img);
    res.sendfile("uploads/"+req.params.img);
  });


app.post('/api/register', multer({ storage:storage,
  fileFilter: function (req, file, cb) {
    let extensionAuthorized = ["image/jpeg", "image/png"];
    console.log(extensionAuthorized.indexOf(file.mimetype));
    if (extensionAuthorized.indexOf(file.mimetype)<0) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
}).single('avatar'),controller.register);


app.post('/authenticate', controller.auth);
app.get('/api/getUser/:mail', controller.users.getUser);

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.listen(3001, function () {
  console.log('listening on http://localhost:3001');
});
