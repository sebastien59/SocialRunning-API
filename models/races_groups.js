/*
  Model Race_groups
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Races_groups = sequelize.define('race_groups', {
  idRace: Sequelize.INTEGER,
  idGroup: Sequelize.INTEGER
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/

sequelize.sync();

module.exports = Races_groups;
