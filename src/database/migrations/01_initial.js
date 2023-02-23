const Sequelize = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("Users", {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: false,
        },
        firebase_id: {
            allowNull: true,
            unique: true,
            type: Sequelize.DataTypes.STRING,
        },
        apple_id: {
            allowNull: true,
            unique: true,
            type: Sequelize.DataTypes.STRING,
        },
        google_id: {
            allowNull: true,
            unique: true,
            type: Sequelize.DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
        },
    });
    
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("Users");
  },
};
