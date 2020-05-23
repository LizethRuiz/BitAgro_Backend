import db from '../config/database';
import models from '../models';

const seed = async () => {
  await db.sync({ force: true });
};

seed();
