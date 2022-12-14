'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}

  Course.init(
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      estimatedTime: {
        type: Sequelize.STRING
      },
      materialsNeeded: {
        type: Sequelize.STRING
      }
    },
    {
      sequelize,
    }
  );
  
  /**
   * create Course associations
   * @param models {Sequelize.Model<User | Course>}
   */
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        field: 'userId',
        allowNull: true
      },
      constraints: false
    });
  };

  return Course;
};
