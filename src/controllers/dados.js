const rota = require('../modal/Rota')
const batimetrias = require('../modal/Bathymetry')


exports.mostrarTrajetos = async (AsyncStorage, localizacao) =>{  
    let retorno = await rota.selecionarRota(AsyncStorage);    
    return retorno.data
}

exports.mostrarBatimetrias = async (AsyncStorage, localizacao) =>{  
    let retorno = await batimetrias.selecionarBathy(AsyncStorage);    
    return retorno
}