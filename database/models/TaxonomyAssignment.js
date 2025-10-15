import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Sample from './Sample.js';
import Assembly from './Assembly.js';

const TaxonomyAssignment = sequelize.define('TaxonomyAssignment', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  input_type: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  software: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  software_parameters: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_path: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
});

TaxonomyAssignment.belongsTo(Sample, { foreignKey: 'sample_id' });
Sample.hasMany(TaxonomyAssignment, { foreignKey: 'sample_id' });

TaxonomyAssignment.belongsTo(Assembly, { foreignKey: 'assembly_id' });
Assembly.hasMany(TaxonomyAssignment, { foreignKey: 'assembly_id' });

export default TaxonomyAssignment;