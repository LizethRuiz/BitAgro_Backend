const db = require('../config/database');

const models = {
  User: require('./users'),
  Human_Resources: require('./human_resources'),
  Lots: require('./lots'),
  Cycles: require('./cycles'),
  Sowing: require('./sowing'),
  Finances: require('./finances'),
  Harvest: require('./harvest'),
  Binnacle: require('./binnacle'),
  Activities: require('./activities'),
  db: db
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
