/*
  Model Frequence
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var Frequence = sequelize.define('frequence', {
  name: Sequelize.STRING
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/

sequelize.sync().then(function(){
  Frequence.bulkCreate([
    { name: "Hebdomadaire" },
    { name: "Occasionnel" }
  ])
});

module.exports = Frequence;
