// Fichier de configuration bdd

let Sequelize = require('sequelize');

module.exports ={
  sequelize: new Sequelize('socialrunning', 'socialrunning', 'azerty',
    {
        host: 'merchez.com', // Host : localhost si base en local, ip ou nom de domaine sinon
        dialect: 'mysql', // Type de base de données : 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'

        pool: {
          max:1000,
          min:0,
          idle:10000
        }
    }
  )
}
