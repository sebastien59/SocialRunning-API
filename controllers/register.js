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

module.exports = (req,res)=>{
  console.log(req.file);
  console.log(req.body);

  req.body.profilPicture = req.file.filename;
  User.create(req.body)
      .then(function(){
        res.status(200).json({result: 1});
      })
      .catch(function (err) {
        res.status(401).json({result: 0});
    });

  return;
}
