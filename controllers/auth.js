let User = require('../models/user.js');
let jwt = require('jsonwebtoken');

let config = require('../config/config.js')

module.exports = (req,res)=>{

  User.findOne({
     where: {email:req.body.email, password:req.body.password}
   }).then(function(user){
     if(user != null){
       
       let profile = {
         firstname: user.get('firstname'),
         lastname: user.get('lastname'),
         email: user.get('email'),
         birthday: user.get('birthday'),
         zone: user.get('zone'),
         profilPicture: user.get("profilPicture")
       };

       // We are sending the profile inside the token
       let token = jwt.sign(profile, config.secret, {expiresIn: "2 days"});

       res.status(200).json({ token: token });
     }else{
       res.status(401).json({result: 0});
       return;
     }
   });
  return;
}
