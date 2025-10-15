import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Assembly from './Assembly.js';

const Contig = sequelize.define('Contig', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  size: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
});

Contig.belongsTo(Assembly, { foreignKey: 'assembly_id' });
Assembly.hasMany(Contig, { foreignKey: 'assembly_id' });

export default Contig;