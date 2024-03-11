'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MusicianInstruments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      musicianId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Musicians',
          // key: 'musicianId' 
        },
        onDelete: 'CASCADE'
      },
      instrumentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Instruments',
          // key: 'instrumentId'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MusicianInstruments');
  }
};
