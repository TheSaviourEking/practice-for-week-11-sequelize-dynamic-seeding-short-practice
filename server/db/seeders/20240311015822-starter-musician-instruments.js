'use strict';

const { Musician, Instrument } = require('../models');

const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const musicianInstrument of musicianInstruments) {
      const { musician: musicianDetails, instruments: instrumentDetails } = musicianInstrument;
      const musician = await Musician.findOne({
        where: {
          firstName: musicianDetails.firstName,
          lastName: musicianDetails.lastName
        }
      });

      for (const instrumentDetail of instrumentDetails) {
        const instrument = await Instrument.findOne({
          where: { type: instrumentDetail.type }
        });
        // const methods = Object.keys(Object.getPrototypeOf(musician));
        // console.log(methods);

        if (instrument) musician.addInstrument(instrument);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (const musicianInstrument of musicianInstruments) {
      const { musician: musicianDetails, instruments: instrumentDetails } = musicianInstrument;
      const musician = await Musician.findOne({
        where: {
          firstName: musicianDetails.firstName,
          lastName: musicianDetails.lastName
        }
      });

      for (const instrumentDetail of instrumentDetails) {
        const instrument = await Instrument.findOne({
          where: { type: instrumentDetail.type }
        });

        await musician.removeInstrument(instrument)
      }
    }
  }
};
