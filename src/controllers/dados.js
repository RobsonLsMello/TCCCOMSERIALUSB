const rota = require('../modal/Rota')


exports.mostrarTrajetos = async (AsyncStorage, localizacao) =>{  
    let retorno = await rota.selecionarRota(AsyncStorage);    
    return retorno.data
}