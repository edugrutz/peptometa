import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Sample from './Sample.js';

const Assembly = sequelize.define('Assembly', {
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
  file_path: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  number_of_contigs: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gc_content: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  total_size: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  min_contig_size: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  max_contig_size: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  n50: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  l50: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// RELAÇÃO: Assembly pertence a uma Sample
Assembly.belongsTo(Sample, { foreignKey: 'sample_id' });
Sample.hasMany(Assembly, { foreignKey: 'sample_id' });

export default Assembly;