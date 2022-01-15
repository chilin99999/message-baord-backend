import {Sequelize, DataTypes} from 'sequelize';

class Database {
  constructor() {
    this.database = new Sequelize(
      'postgres',
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
      }
    );

    this.defineModels();
  }

  async authenticate() {
    try {
      await this.database.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  defineModels() {
    this.Messages = this.database.define('messages', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    this.Messages.sync({alter: true});
  }
}

export default Database;
