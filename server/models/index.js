import db from '../config/database';

const models = {
  User: db.import('./users'),
  Human_Resources: db.import('./human_resources'),
  Lots: db.import('./lots'),
  Cycles: db.import('./cycles'),
  Sowing: db.import('./sowing'),
  Finances: db.import('./finances'),
  Harvest: db.import('./harvest'),
  Binnacle: db.import('./binnacle'),
  Activities: db.import('./activities'),
  db: db
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
