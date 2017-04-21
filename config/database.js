// Fichier de configuration bdd

let Sequelize = require('sequelize');

module.exports ={
  sequelize: new Sequelize('heroku_e83e7e7f69984f5', 'b0d74c73a05620', '7e3a590e',
    {
        host: 'eu-cdbr-west-01.cleardb.com', // Host : localhost si base en local, ip ou nom de domaine sinon
        dialect: 'mysql', // Type de base de données : 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'

        pool: {
          max:10,
          min:0,
          idle:10
        }
    }
  )
}
