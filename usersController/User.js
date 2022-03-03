const Sequelize = require('sequelize');//IMPORTANDO SEQUELIZE PARA CRIAÇÃO DO MODEL
const connection = require('../database/database')//IMPORTANDO CONEXÃO COM BANCO DE DADOS
const User = connection.define('users',{

    email:{
        type:Sequelize.TEXT,
        allowNull:false
    },

    password:{
        type:Sequelize.TEXT,
        allowNull:false
    }

})

module.exports = User;

//User.sync({force:true})=>Sincronização com DB