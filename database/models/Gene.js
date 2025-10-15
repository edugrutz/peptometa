import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Contig from './Contig.js';

const Gene = sequelize.define('Gene', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  software: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  software_parameters: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  start: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  end: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  strand: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    validate: {
      isIn: [['+', '-']]
    }
  },
  dna_sequence: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  protein_sequence: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// RELAÇÃO: Gene pertence a um Contig
Gene.belongsTo(Contig, { foreignKey: 'contig_id' });
Contig.hasMany(Gene, { foreignKey: 'contig_id' });

export default Gene;