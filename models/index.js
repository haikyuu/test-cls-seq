var config = require('./config.json');


var path = require('path');
var lodash = require('lodash');
var fs = require('fs');

var Sequelize = require('sequelize');


var sequelize = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PASSWORD, {
  logging: false,
  host: config.MYSQL_URI,
  port: config.MYSQL_PORT
});

var db = {};


sequelize.sync({
  force: false
}).then(function() {
  console.log('database sync.');
});

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (/\w+\.js$/.test(file)) && (file !== 'index.js')
  }).forEach(function(file) {
    console.log(file);
    var model = sequelize.import(path.join(__dirname, file));
    console.log(model.name);
    db[model.name] = model;

  });

Object.keys(db).forEach(function(modelName) {
  console.log(modelName);
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
