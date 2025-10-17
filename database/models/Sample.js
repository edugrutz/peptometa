import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Sample = sequelize.define(
    'Sample',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sra_accession: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

export default Sample;