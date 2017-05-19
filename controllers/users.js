let User = require('../models/user.js');
let jwt = require('jsonwebtoken');

let config = require('../config/config.js')

/**
 * @api {post} /api/user Permet de gérer des utilisateurs
 * @apiName user
 * @apiGroup User
 */

module.exports = {
  getUser:function(req, res){
    console.log("Accès getUser");
    let token = req.headers.authorization.replace("Bearer ", "");
    var verifiedJwt = jwt.verify(token,config.secret);

    if(verifiedJwt != null){
      res.status(200).json(verifiedJwt);
    }else{
      res.status(401).json({result: 0});
      return;
    }
  },
  update: function(req, res){

           console.log(req.body.email , req.body.password);
    User.findOne({
       where: {email:req.body.email, password:req.body.password}
     }).then(function(user){

       if(user != null){

         if(req.body.newpassword == req.body.passwordConf){
           let profile = {
             firstname: user.get('firstname'),
             lastname: user.get('lastname'),
             email: user.get('email'),
             birthday: user.get('birthday'),
             zone: req.body.zone,
             profilPicture: user.get("profilPicture")
           };

           // We are sending the profile inside the token
           let token = jwt.sign(profile, config.secret, {expiresIn: "2 days"});

           User.update({
              zone: req.body.zone,
              password: req.body.newpassword
            },
            {
              where:{ email:req.body.email}
            }).then(function(user){
               profile.token = token;
               res.status(200).json(profile);
             });
         }
       }else{
         res.status(401).json({result: 0});
         return;
       }
     });
  }
}
