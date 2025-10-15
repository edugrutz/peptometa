import sequelize from './database.js';
import Sample from './models/Sample.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();