let User = require('../models/user.js');
let jwt = require('jsonwebtoken');

let config = require('../config/config.js')

/**
 * @api {post} /api/register Insert un utilisateur dans la table.
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

module.exports = {
  getUser:function(req, res){
      console.log("Accès getUser");
      let token = req.headers.authorization.replace("Bearer ", "");
      var verifiedJwt = jwt.verify(token,config.secret);

               if(verifiedJwt != null){
                 res.status(500).json(verifiedJwt);
               }else{
                 res.status(401).json({result: 0});
                 return;
               }
  }

}
