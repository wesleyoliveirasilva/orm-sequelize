'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Turmas', [
			{
				data_inicio: "2020-02-01",
				nivel_id: 12,
				docente_id: 5012,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
			{
				data_inicio: "2020-02-01",
				nivel_id: 1012,
				docente_id: 4012,
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				data_inicio: "2020-02-01",
				nivel_id: 2012,
				docente_id: 5012,
				createdAt: new Date(),
				updatedAt: new Date()			
				},
			{
				data_inicio: "2020-07-01",
				nivel_id: 2012,
				docente_id: 5012,
				createdAt: new Date(),
				updatedAt: new Date()			
			}
		], {})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Turmas', null, {})
  }
}
