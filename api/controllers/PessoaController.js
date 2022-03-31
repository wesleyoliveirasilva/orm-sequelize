// const database = require('../models')
// const Sequelize = require('sequelize')

const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {

    static async pegaPessoasAtivas(request, response) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return response.status(200).json(pessoasAtivas)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(request, response) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return response.status(200).json(todasAsPessoas)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(request, response) {
        try {
            const { id } = request.params
            const umaPessoas = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(umaPessoas)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaPessoa(req, res) {  
        const { id } = req.params
        try {
          const pessoa = await pessoasServices.pegaUmRegistro({ id })
          return res.status(200).json(pessoa)
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }

    static async criaPessoa(request, response) {
        try {
            const novaPessoa = request.body
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return response.status(200).json(novaPessoaCriada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(request, response) {
        try {
            const { id } = request.params
            const novasInfos = request.body
            await database.Pessoas.update(novasInfos, {
                where: {
                    id: Number(id)
                }
            })
            const novaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(novaPessoa)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async apagaPessoa(request, response) {
        try {
            const { id } = request.params
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({ mensagem: `Id ${id} deletado.`})
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async restauraPessoa(request, response) {
        try {
            const { id } = request.params
            await database.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({ mensagem: `Id ${id} restaurado.`})
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(request, response) {
        try {
            const { estudanteId, matriculaId } = request.params
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return response.status(200).json(umaMatricula)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async criaMatricula(request, response) {
        try {
            const { estudanteId } = request.params
            const novaMatricula = {... request.body, estudante_id: Number(estudanteId)}
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return response.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(request, response) {
        try {
            const { estudanteId, matriculaId } = request.params
            const novasInfos = request.body
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            })
            return response.status(200).json(matriculaAtualizada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async apagaMatricula(request, response) {
        try {
            const { estudanteId, matriculaId } = request.params
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return response.status(200).json({ mensagem: `MatriculaId ${matriculaId} deletado.`})
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async restauraMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params
        try {
          await database.Matriculas.restore({
            where: {
              id: Number(matriculaId),
              estudante_id: Number(estudanteId)
            }
          })
          return response.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return response.status(500).json(error.message)
        }
      }

    static async pegaMatriculas(request, response) {
        try {
            const { estudanteId } = request.params
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(estudanteId)
                }
            })
            const matriculas = await pessoa.getAulasMatriculadas()
            return response.status(200).json(matriculas)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(request, response) {
        const { turmaId } = request.params
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
            })
            return response.status(200).json(todasAsMatriculas)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(request, response) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                order: [['estudante_id', 'DESC']],
                having: Sequelize.literal(` count(turma_id) >= ${lotacaoTurma}`)
            })
            return response.status(200).json(turmasLotadas.count)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(request, response) {
        const { estudanteId } = request.params

        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return response.status(200).json(`Matrículas referente estudante ${estudanteId} canceladas.`)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController