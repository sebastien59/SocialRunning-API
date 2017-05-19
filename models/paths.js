/*
  Model Paths
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Path = sequelize.define('path', {
  lat: Sequelize.FLOAT,
  lng: Sequelize.FLOAT,
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/

sequelize.sync();

module.exports = Path;
