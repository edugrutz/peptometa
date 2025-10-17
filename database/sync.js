import sequelize from './database.js';

import Sample from './models/Sample.js';
import Assembly from './models/Assembly.js';
import Contig from './models/Contig.js';
import Gene from './models/Gene.js';
import GeneAnnotation from './models/GeneAnnotation.js';
import TaxonomyAssignment from './models/TaxonomyAssignment.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();