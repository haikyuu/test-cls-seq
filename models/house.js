var cls = require('continuation-local-storage');


module.exports = function(sequelize, DataTypes) {

  var House = sequelize.define('House', {
    number: DataTypes.INTEGER
  }, {
    hooks: {
      afterCreate: function(instance, options, next) {

        var ns = cls.getNamespace('test');
        console.log('##########################Hook afterCreate################################');
        var number = ns.get('number');
        console.log('number: ', number);
        console.log('##########################Hook afterCreate################################\n');
        console.log('');
        return next();
      }
    }
  });
  return House;
};
