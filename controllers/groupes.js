let Groupe = require('../models/groupes.js');
let Path = require('../models/paths.js');
let Path_groups = require('../models/path_groups.js');
let Days_Groups = require("../models/days_groups.js");
let Dates = require("../models/date.js");
let jwt = require('jsonwebtoken');
let moment = require('moment');
let config = require('../config/config.js')

/**
 * @api {post} /api/groupe Gestion des groupes
 * @apiName Groupe
 * @apiGroup Groupes
 *
 */

module.exports = {
  create:function(req, res){
    console.log("Accès getUser");
    let token = req.headers.authorization.replace("Bearer ", "");
    var verifiedJwt = jwt.verify(token,config.secret);

    if(verifiedJwt != null){
      console.log(req.body);

      Groupe.create({
        name: req.body.name,
        pointRdv: req.body.rdv,
        private: req.body.private,
        idFrequence: req.body.idFrequence
      }).then(function(group){
        let idgroup = group.get('id');

        points = [];
        req.body.points.forEach(function(value, index){
          tmp = JSON.parse(value);
          tmp.lat = parseFloat(tmp.lat);
          tmp.lng = parseFloat(tmp.lng);
          Path.create(tmp).then(function(point){
            Path_groups.create({
              idGroup: idgroup,
              idPath: point.get('id'),
              order: index,
            })
          });
        });

        req.body.days.forEach(function(value, index){
          if(req.body.idFrequence == 1 && typeof(value) == "INTEGER"){
            Days_Groups.create({
              idDays: value,
              idGroups: idgroup
            })
          }else{
            Dates.create({
              date: value,
              idGroupe: idgroup
            })
          }
        });
      });

      //  res.status(200).json(verifiedJwt);
    }else{
      res.status(401).json({result: 0});
      return;
    }
  },
  getAll: function(req, res){
    Groupe.findAll().then(function(groupes){
      res.status(200).json(groupes);
    });
  }

}
