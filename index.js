//ROTAS/EXPRESS
const express = require('express');//IMPORTANDO O MÓDULO DO EXPRESS PARA DENTRO DA APLICAÇÃO
const app = express();//USANDO E INICIALIZANDO O EXPRESS ATRAVÉS DA VARIÁVEL app
const usersController = require('./usersController/usersController')//CARREGANDO OS CONTROLLERS DE USUÁRIOS
const contatosController = require('./contatosController/contatosController')//CARREGANDO OS CONTROLLERS DE CONTATOS
//BODY-PARSER(TRANSFORMA OS DADOS DE FORMULÁRIOS EM UMA ESTRUTURA JAVASCRIPT INTERPRETÁVEL PELO BACK-END)
const bodyParser = require('body-parser');//IMPORTANDO O BODY-PARSER PARA DENTRO DA APLICAÇÃO
app.use(bodyParser.urlencoded({extended:false}));//USANDO E INICIALIZANDO BODY-PARSER
app.use(bodyParser.json());//BODY-PARSER PARA API'S
//VIEW ENGINE
app.set('view engine','ejs');//SETANDO EJS COMO VIEW ENGINE
//PUBLIC
app.use(express.static('public'));//SETANDO A PASTA DE ARQUIVOS ESTÁTICOS COMO PUBLIC

//SESSIONS
const session = require('express-session');
app.use(session({
    secret:'qualquercoisa',cookie:{maxAge:300000}
}))

//CONEXÃO COM DATABASE
const connection = require('./database/database');//IMPORTANDO ARQUIVO DE BANCO DE DADOS
const User = require('./usersController/User');//IMPORTANDO O MODEL DE USER
const Contato = require('./contatosController/Contato')//IMPORTANDO O MODEL DE CONTATO

//AUTENTICAÇÃO DA CONEXÃO COM BANCO DE DADOS VIA ESTRUTURA PROMISE
connection
.authenticate()
.then(()=>{
    console.log('Sucessful connection with DB');
}).catch(error=>{
    console.log(error);
})

app.use("/",usersController)//INICIALIZANDO OS CONTROLLERS DE USUÁRIO
app.use("/",contatosController)//INICIALIZANDO OS CONTROLLERS DE CONTATOS


app.get("/session",(req,res)=>{

})

app.get("/leitura",(req,res)=>{

})

//ROTA(/)=> ROTA INICIAL DA APLICAÇÃO
app.get("/",(req,res)=>{
    Contato.findAll({}).then((contatos)=>{
        res.render("index",{contatos:contatos})
    }).catch(error=>{
        res.redirect("/")
    })
})

//INICIALIZANDO O SERVIDOR NA PORTA 1500
app.listen(1500,()=>{
    console.log('Server Working!');
})