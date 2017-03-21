let User = require('../models/user.js');
let jwt = require('jsonwebtoken');

let config = require('../config/config.js')

module.exports = (req,res)=>{
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  console.log(req.body)

  User.findOne({
   where: {email:req.body.email, password:req.body.password}
 }).then(function(user){
   if(user != null){
     let profile = {
       first_name: user.get('firstname'),
       last_name: user.get('lastname'),
       email: user.get('email'),
       zone: user.get('zone')
     };

     // We are sending the profile inside the token
     let token = jwt.sign(profile, config.secret, {expiresIn: "2 days"});

     res.json({ token: token });
   }else{
     res.status(401).send('Wrong user or password');
     return;
   }
 });
  /*if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  let profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  let token = jwt.sign(profile, secret, {expiresIn: "2 days"});

  res.json({ token: token });*/
  return;
}
