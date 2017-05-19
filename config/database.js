// Fichier de configuration bdd

let Sequelize = require('sequelize');
let config = require('./config.js');

dbname="";
user="";
password = "";
host = "";

if(config.ENV == "production"){
  dbname = "SocialRunning";
  user = "root";
  password = "130494";
  host = "merchez.com";
}else{
  dbname = 'social';
  user = 'root';
  password = 'root';
  host = "localhost";
}


module.exports ={
  sequelize: new Sequelize(dbname, user, password,
    {
        host: host, // Host : localhost si base en local, ip ou nom de domaine sinon
        dialect: 'mysql', // Type de base de données : 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'

        pool: {
          max:1000,
          min:0,
          idle:1
        }
    }
  )
}
