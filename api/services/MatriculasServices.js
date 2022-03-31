const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: {... where } })
    }
}

module.exports = MatriculasServices