/*
  Model Path_groups
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Path_groups = sequelize.define('path_groups', {
  idGroup: Sequelize.INTEGER,
  idPath: Sequelize.INTEGER,
  order: Sequelize.INTEGER,
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/
sequelize.sync({force:true});

module.exports = Path_groups;
