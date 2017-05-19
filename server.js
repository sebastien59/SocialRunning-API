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
let database = require("./config/database.js");
//Contollers
let controller = require('./controllers');

//Models


let User = require('./models/user.js');
let Days = require('./models/days.js');
let Days_groups = require('./models/days_groups.js');
let Frequences = require('./models/frequences.js');
let Groupes = require('./models/groupes.js');
let Path_groupes = require('./models/path_groups.js');
let Path_races = require('./models/path_races.js');
let Paths = require('./models/paths.js');
let Race = require('./models/race.js');
let Races_groups = require('./models/races_groups.js');
let User_groups = require('./models/users_groups.js');
let User_races = require('./models/users_races.js');
let Dates = require('./models/date.js');


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
    if (extensionAuthorized.indexOf(file.mimetype)<0) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
}).single('avatar'),controller.register);


app.post('/authenticate', controller.auth);

app.get('/api/getUser/:mail', controller.users.getUser);
app.post('/api/groupe/create', controller.groupes.create);
app.get('/api/groupe/getAll', controller.groupes.getAll);

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.listen((process.env.PORT || 3001), function () {
  console.log('listening on http://localhost:3001');
});
