const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');//IMPORTANDO BCRYPT PARA GERAR HASH DA SENHA
const { redirect } = require('express/lib/response');


//ROTA PARA DELEÇÃO DE USUÁRIOS
router.post("/users/delete",(req,res)=>{
    let id = req.body.id;
    User.destroy({where:{id:id}}).then(()=>{(res.redirect("/admin/users"))})
    .catch(err=>{
        res.redirect("/admin/users")
    })
})

//ROTA PARA ATUALIZAÇÃO DE USUÁRIOS
router.post("/users/update",(req,res)=>{
    let id = req.body.id;
    let email = req.body.email;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);//GERANDO SALT
    let hash = bcrypt.hashSync(password,salt)//GERANDO HASH DE SENHA

    User.update({email:email,password:hash},{where:{id:id}}).then(()=>{(res.redirect("/admin/users"))})

})

router.get("/login",(req,res)=>{
    res.render("admin/users/login")
})

router.post("/authenticate",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({where:{email:email}}).then(user=>{
        if(user!==undefined){
            let correct = bcrypt.compareSync(password,user.password)
            if(correct){
                req.session.user = {
                    id:user.id,
                    email:user.email
                }
                res.json(req.session.user)
            }else{
                res.redirect("/login") 
            }
        }else{
            res.redirect("/login")
        }
    })
})

//ROTA PARA LISTAGEM DE USUÁRIOS NA PÁGINA DE EDIÇÃO
router.get("/admin/users/edit/:id",(req,res)=>{
    let id = req.params.id;
    User.findByPk(id).then(user=>{
        res.render("admin/users/edit",{user:user})
    }).catch(error=>{
        res.redirect("/admin/users")
    })
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
})

router.get("/logout",(req,res)=>{
    req.session.user = undefined;
    res.redirect("/")
})

//ROTA DE LISTAGEM DE USUÁRIOS NO FRONT-END
router.get("/admin/users",(req,res)=>{
    User.findAll({}).then(users=>{
        res.render("admin/users/index",{users:users})
    })
})

//ROTA DE CRIAÇÃO DE USUÁRIOS => SALVA INFORMAÇÕES NO BACK-END
router.post("/admin/users/save", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);//GERANDO SALT
    let hash = bcrypt.hashSync(password,salt)//GERANDO HASH DE SENHA

    User.findOne({where:{email:email}}).then(user=>{
        if(user==undefined){
            User.create({
                email:email,
                password:hash//ATRIBUINDO HASH AO CAMPO DE PASSWORD NO DB
            }).then(()=>{
                res.redirect("/")
            }).catch(error=>{
                res.redirect("/")
            })
        }else{
            res.redirect("/admin/users/create")
        }
    })
})

module.exports = router;