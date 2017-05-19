/*
  Model Path_races
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Path_races = sequelize.define('path_races', {
  idRace: Sequelize.INTEGER,
  idPath: Sequelize.INTEGER,
  order: Sequelize.INTEGER,
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/

sequelize.sync();

module.exports = Path_races;
