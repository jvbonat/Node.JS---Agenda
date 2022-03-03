const express = require('express');//IMPORTANDO EXPRESS
const { redirect } = require('express/lib/response');
const router = express.Router()
const Contato = require('./Contato')//IMPORTANDO O MODEL DE CONTATO
const adminAuth = require('../middlewares/adminAuth')//IMPORTANDO MIDDLEWARE DE AUTENTICAÇÃO DE SESSÃO

router.post("/contacts/delete",(req,res)=>{
    let id = req.body.id;
    if(id!==undefined){
        if(!isNaN(id)){
            Contato.destroy({
                where:{id:id}
            }).then(()=>{
                res.redirect("/")
            }).catch(error=>{
                res.redirect("/")
            })
        }
    }
})

router.post("/admin/contacts/update",(req,res)=>{
    let id = req.body.id;
    let nome = req.body.nome;
    let telefone = req.body.telefone;
    let email = req.body.email;

    Contato.update({id:id,nome:nome,telefone:telefone,email:email},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/articles")
    }).catch(err=>{
        res.redirect("/")
    })
})

router.get("/admin/contact/edit/:id",(req,res)=>{
    let id = req.params.id
    if(isNaN(id)){
        res.redirect("/")
    }
    Contato.findByPk(id).then(contato=>{
        if(id!==undefined){
            res.render("admin/contacts/edit",{contato:contato})
        }
        else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

router.get("/admin/contacts",(req,res)=>{
    res.render("admin/contacts/create");
})

router.post("/admin/contacts/create",(req,res)=>{
    let nome = req.body.nome;//SALVANDO O VALOR DO NOME ENVIADO PELO FORMULÁRIO NA VARIÁVEL NOME
    let telefone = req.body.telefone;//SALVANDO O VALOR DO TELEFONE ENVIADO PELO FORMULÁRIO NA VARIÁVEL TELEFONE
    let email = req.body.email;//SALVANDO O VALOR DO EMAIL ENVIADO PELO FORMULÁRIO NA VARIÁVEL EMAIL
    //Method create => INSERT => Insere dados na tabela do banco de dados
    Contato.create({
        nome:nome,
        telefone:telefone,
        email:email
    }).then(()=>{
        res.redirect("/")
    }).catch(error=>{
        res.redirect("/")
    })
})

module.exports = router;