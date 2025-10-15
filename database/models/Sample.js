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
        sra_acession: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);

export default Sample;