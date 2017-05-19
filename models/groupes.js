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
  pointRdv: Sequelize.STRING(45),
  private: Sequelize.INTEGER,
  idFrequence: Sequelize.INTEGER,

});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/

sequelize.sync().then(function(){
  Groupe.create({
    name: "GroupeTest1",
    pointRdv: "13 Rue Jean Souvraz",
    private: 0,
    idFrequence: 1
  });
});

module.exports = Groupe;
