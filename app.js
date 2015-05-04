var express = require('express');
var cls = require('continuation-local-storage');
var patcher = require('cls-bluebird');


var db = require('./models');
var number = 0;
var app = express();


app.configure(function() {

  app.use('/', function(req, res, next) {

    number++;
    var ns = cls.createNamespace('test');
    patcher(ns);
    ns.bindEmitter(req);
    ns.bindEmitter(res);
    ns.run(function() {

      ns.set('number', number);
      next();
    });
  });


  app.get('/user', function(req, res) {

    console.log('USER REQUEST');
    var user = {
      firstName: 'Rin'
    };
    db.User.create(user).then(function() {

      var ns = cls.getNamespace('test');
      console.log('************************** after Create (in then function) ********************************');
      var number = ns.get('number');
      console.log('number: ', number);
      console.log('************************** after Create (in then function) ********************************');
      console.log('END USER REQUEST\n');
      return res.send('done')
    });
  });


  app.get('/house', function(req, res) {

    console.log('HOUSE REQUEST');
    var house = {
      number: 25
    };
    db.House.create(house).then(function() {

      var ns = cls.getNamespace('test');
      console.log('************************** after Create (in then function) ********************************');
      var number = ns.get('number');
      console.log('number: ', number);
      console.log('************************** after Create (in then function) ********************************');
      console.log('END HOUSE REQUEST\n');
      return res.send('done');
    });
  });
});


app.listen(3004, function() {});
