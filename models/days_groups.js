/*
  Model Days_Groups
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Days_groups = sequelize.define('days_groups', {
  idDays: Sequelize.INTEGER,
  idGroups: Sequelize.INTEGER
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/
sequelize.sync({force:true});

module.exports = Days_groups;
