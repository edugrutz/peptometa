import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('peptominer', 'eduardo', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;