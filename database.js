import {Sequelize, DataTypes} from 'sequelize';
import getMessagesModel from './models/messages.js';

class Database {
  async initial() {
    this.database = new Sequelize(
      'postgres',
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
      },
    );

    await this.database.authenticate();
    this.defineModels();
  }

  async authenticate() {
    try {
      await this.database.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async defineModels() {
    const models = {
      Messages: getMessagesModel(this.database, DataTypes),
    };

    Object.keys(models).forEach((key) => {
      const model = models[key];
      this[key] = model;
      if ('associate' in model) {
        model.associate(models);
      }
    });
  }
}

export default new Database();
