// Fichier de configuration bdd

let Sequelize = require('sequelize');
let config = require('./config.js');

if(config.ENV == "production"){
  dbname = "heroku_e83e7e7f69984f5";
  user = "b0d74c73a05620";
  password = "7e3a590e";
  host = "eu-cdbr-west-01.cleardb.com";
}else{
  dbname = 'social';
  user = 'root';
  password = 'root';
  host = "localhost";
}


module.exports ={
  sequelize: new Sequelize("heroku_e83e7e7f69984f5", "b0d74c73a05620", "7e3a590e",
    {
        host: "eu-cdbr-west-01.cleardb.com", // Host : localhost si base en local, ip ou nom de domaine sinon
        dialect: 'mysql', // Type de base de données : 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'

        pool: {
          max:1000,
          min:0,
          idle:1000
        }
    }
  )
}
