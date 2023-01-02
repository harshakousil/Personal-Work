const Sequelize=require('sequelize');

const db=  new  Sequelize( {
    dialect:'postgres' ,
    HOST: "localhost",
    USER: "kousillakkapragada",
    PASSWORD: "Goldtre9",
    DB: "example",

    operatorsliases:false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });
  module.exports=db;