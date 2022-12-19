const domain = "http://192.168.15.10:8080";
const token = require('./Token')
const bathymetry = require('./Bathymetry')

exports.cadastrarDeep = async (deeps = [], rota_id, AsyncStorage) =>{
    let batimetria_id = await bathymetry.cadastrarBathy(rota_id, AsyncStorage);
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);
  
    var raw = JSON.stringify({
        "deeps":deeps,
        "idBathy": batimetria_id
    });
  
    var requestOptions = {
      method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
    };
   
    const response = await fetch(`${domain}/deep/cadDeep`, requestOptions)
    
    const retorno = await response.json();
    
    return retorno;
}


exports.selecionarDeep = async (AsyncStorage, bathy_id = "") =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);

    var requestOptions = {
      method: 'GET',    headers: myHeaders,      redirect: 'follow'
    };
  
    const response = await fetch(`${domain}/deep/getDeeps/${bathy_id}`, requestOptions)
    const retorno = await response.json();
    return retorno;
}

