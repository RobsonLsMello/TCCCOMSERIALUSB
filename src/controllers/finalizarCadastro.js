const usuario = require('../modal/Usuario')


exports.atrelarNomeEmail = async (AsyncStorage, nome, telefone, nav, setErros, primeiroLogin = true) =>{  
    let retorno = await usuario.informarDados(nome, telefone, AsyncStorage); 
    let erros = "";   
    await AsyncStorage.setItem("@nome", nome);
    await AsyncStorage.setItem("@telefone", telefone);
    if(retorno.message == "Nome e telefone atualizados."){
        if(primeiroLogin)
            nav.navigate("primeiroLogin")
        return true;
    }
    else{
        console.log(nome);
        console.log(telefone);
        
        console.log(retorno);
        erros += retorno.mensagem[0][0] != undefined && Array.isArray(retorno.mensagem[0]) ? `${retorno.mensagem[0][0]}\n` : "";
        erros += retorno.mensagem[0] != undefined && !Array.isArray(retorno.mensagem[0]) ? `${retorno.mensagem[0]}\n` : "";
        erros += retorno.mensagem[1] != undefined ? `${retorno.mensagem[1]}\n` : "";
        erros = erros.replace("nameUser", "Nome")
        setErros(erros);
        return false;
    }
    
    

}