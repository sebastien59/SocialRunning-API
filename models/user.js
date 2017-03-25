/*
  Model User
*/

// Initialisation des modules
let Sequelize = require('sequelize');
let database = require('../config/database.js');
let sequelize = database.sequelize;

// Initialisation du model
var User = sequelize.define('user', {
  firstname: Sequelize.STRING(45),
  lastname: Sequelize.STRING(45),
  email: {type: Sequelize.STRING(100), unique:true},
  birthday: Sequelize.DATE,
  password: Sequelize.STRING(40),
  zone: Sequelize.INTEGER,
}/*, {
    classMethods: {
      associate: function(Statut) {
        User.belongsTo(Statut);
      }
    }
  }*/);

/*
  On force la suppression afin de créer la table à chaque lancement de l'application. Utile en dev uniquement.
*/
sequelize.sync({force:true}).then(function(){
  User.create({
    firstname: "Sebastien",
    lastname: "Merchez",
    email: "merchez.sebastien@gmail.com",
    birthday: "1994-04-13",
    password: "test",
    zone: 10
  })
});

module.exports = User
