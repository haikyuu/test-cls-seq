var cls = require('continuation-local-storage');


module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    firstName: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(instance, options, next) {

        var ns = cls.getNamespace('test');
        console.log('##########################beforeCreate################################');
        var number = ns.get('number');
        console.log('number: ', number);
        console.log('##########################beforeCreate################################\n');
        return next();
      }
    }
  });
  return User;
};
