function adminAuth(req,res,next){
    if(req.session.user!==undefined){//CASO USUÁRIO ESTEJA LOGADO
        next()//PERMITE USUÁRIO CONTINUAR NO SISTEMA
    }else{
        res.redirect("/login")
    }
}

module.exports = adminAuth;