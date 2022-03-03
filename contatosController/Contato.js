const Sequelize = require('sequelize')//IMPORTANDO O SEQUELIZE PARA O MODEL DE CONTATOS
const connection = require('../database/database')//IMPORTANDO ARQUIVO DE CONEXÃO COM DATABASE
const Contato = connection.define('contatos',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },

    telefone:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },

    email:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = Contato;

//Contato.sync({force:true})
