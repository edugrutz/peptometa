import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Gene from './Gene.js';

const GeneAnnotation = sequelize.define('GeneAnnotation', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  software: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  software_parameters: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  field: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});

GeneAnnotation.belongsTo(Gene, { foreignKey: 'gene_id' });
Gene.hasMany(GeneAnnotation, { foreignKey: 'gene_id' });

export default GeneAnnotation;