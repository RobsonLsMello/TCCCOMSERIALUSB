const usuario = require('../modal/Usuario')

exports.cadastrarEmail = async (email, nav, setErros) =>{
    let mensagem =  await usuario.cadastrarEmail(email)
    console.log(mensagem);
    if(Array.isArray(mensagem.mensagem) || mensagem.error != undefined){
        let mensagemErro = "";
        if(mensagem.error == undefined){
            mensagemErro = mensagem.mensagem.map(element =>{
                return `${element}\n`;
            })
        }else{
            mensagemErro = mensagem.error;
        }
        await setErros(mensagemErro);
    }else{
        nav.navigate("confirmarEmail", {email: email, origin: "cadastrar"})
    }
}