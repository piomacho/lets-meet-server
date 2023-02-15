const Sequelize = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("MeetEvents", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: false,
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      participants: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      latitude: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      longitude: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      place: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      ageFrom: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      ageTo: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      description: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      date: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      }
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("MeetEvents");
  },
};
