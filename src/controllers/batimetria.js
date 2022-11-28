const deep = require('../modal/Deep')


exports.mostrarDeeps = async (AsyncStorage, bathyId) =>{  
    let retorno = await deep.selecionarDeep(AsyncStorage, bathyId);    
    return retorno.data
}