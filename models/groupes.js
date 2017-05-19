/*
  Model Groupes
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Groupe = sequelize.define('groupe', {
  name: Sequelize.STRING(45),
  pointRdv: Sequelize.STRING(250),
  private: Sequelize.INTEGER,
  idFrequence: Sequelize.INTEGER,

});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/

sequelize.sync({force:true}).then(function(){
  Groupe.create({
    name: "GroupeTest1",
    pointRdv: "{\"lat\":50.439574, \"lng\":2.820703}",
    private: 0,
    idFrequence: 1
  });
  Groupe.create({
    name: "GroupeTest2",
    pointRdv: "{\"lat\":50.436241, \"lng\":2.825957}",
    private: 0,
    idFrequence: 1
  });
  Groupe.create({
    name: "GroupeTest3",
    pointRdv: "{\"lat\":50.432702, \"lng\":2.822619 }",
    private: 0,
    idFrequence: 1
  });
});

module.exports = Groupe;
