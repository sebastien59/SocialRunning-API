/*
  Model Days
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;


// Initialisation du model
var Days = sequelize.define('day', {
  name: Sequelize.STRING
});

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/
sequelize.sync({force:true}).then(function(){
  Days.bulkCreate([
    {name:"Lundi"},
    {name:"Mardi"},
    {name:"Mercredi"},
    {name:"Jeudi"},
    {name:"Vendredi"},
    {name:"Samedi"},
    {name:"Dimanche"}
  ]);
});

module.exports = Days;
