const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config.json');
 
const sequelize = new Sequelize(config.DATABASE,config.USERNAME,config.PASSWORD,{
    host: config.HOST,
    dialect: config.DIALECT,
    pool:{max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
    console.log("Connected");
})
.catch(err=>{
    console.log("Error"+err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync()
.then(()=>{
    console.log("yes re sync");
})
.catch(err=>{
    console.log("Error"+err);
});

db.news = require('./news')(sequelize, DataTypes);
module.exports = db;