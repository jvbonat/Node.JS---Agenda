const Sequelize = require('sequelize')//IMPORTANDO SEQUELIZE PARA CRIAR CONEXÃO COM DB
//CRIANDO CONEXÃO
const connection = new Sequelize('agenda','root','Gremiogaia@1234',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
})

module.exports = connection;//EXPORTANDO CONEXÃO