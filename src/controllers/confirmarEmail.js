const usuario = require('../modal/Usuario')

 

exports.reenviar = async (email, alert, origin) =>{
    let mensagem = origin == "cadastrar" ? await usuario.cadastrarEmail(email) : await usuario.verificarEmail(email);
    console.log(mensagem);
    alert("Sucesso","Email reenviado com sucesso");
}

exports.confirmarEmail = async (email, code, setErros, nav, origin, storage) =>{
    let retorno =  await usuario.confirmarEmail(email, code)
    if(retorno.refreshToken != undefined && retorno.token != undefined){
        await storage.setItem("@refreshToken", retorno.refreshToken);
        await storage.setItem("@token", retorno.token);
        await storage.setItem("@nome", retorno.nameUser);
        await storage.setItem("@telefone", retorno.phone);
        await storage.setItem("@email", email);
        nav.navigate(origin == "cadastrar" ? "finalizarCadastro" :  "main", {
            "refreshToken"  : retorno.refreshToken,
            "token"         : retorno.token,
            "nome"          : retorno.nameUser,
            "telefone"      : retorno.phone,
            "email"         : email
        })
    }
    else{
        let mensagemErro = "";
        mensagemErro += retorno.message != undefined ? retorno.message : "";
        if(retorno.erros != undefined){
            let erros = JSON.parse(`[${JSON.stringify(retorno.erros).split("[").join("").split("]").join("")}]`)
            mensagemErro += erros.map(erro =>{
                return `${erro}\n`
            })
        }
        await setErros(mensagemErro)
    }
}