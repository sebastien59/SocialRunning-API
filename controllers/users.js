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
  }

}
