const Sequelize = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("UserDetails", {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: false,
        },
        user_id: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
        },
        name: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
        },
        surname: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
        },
        date_of_birth: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
        },
        gender: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
        },
        age: {
            allowNull: false,
            type: Sequelize.DataTypes.SMALLINT,
        }
    });
    
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("UserDetails");
  },
};
