'use strict';

const Sequelize = require('sequelize');


/**
 * set up the Course Model
 * @param sequelize
 * @returns {Course}
 */

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  
  Course.init(
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Title is required',
          },
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Description is required',
          }
        }
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
   * create Course association to User
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
