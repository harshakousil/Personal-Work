const db = require("../config/db.config.js");
const Sequelize = require("sequelize");


const database=db.define('user',{
    name:
    {
        type: Sequelize.STRING,
    }
},

{
    freezeTableName:true,
    tableName:"userdata"
})
module.exports=database



























// const dbase = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// const db = {};
// db.Sequelize = Sequelize;
// db.dbase = dbase;

// db.tutorials = require("./tutorial.model.js")(dbase, Sequelize);

// module.exports = db;