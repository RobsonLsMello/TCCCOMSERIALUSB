const domain = "https://deep-analysis02.herokuapp.com";
const token = require('./Token')

exports.cadastrarDeep = async (deep = [0,0], rota_id, valor, AsyncStorage) =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);
  
    var raw = JSON.stringify({
        "coordinate":{
            "type":"Point",
            "coordinates": deep
        },
        "value": valor,
        "idRoute": rota_id
    });
  
    var requestOptions = {
      method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
    };

    const response = await fetch(`${domain}/deep/cadDeep`, requestOptions)
    console.log(response);
    const retorno = await response.json();
    return retorno;
}


exports.selecionarDeep = async (AsyncStorage, rota_id = "") =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);

    var requestOptions = {
      method: 'GET',    headers: myHeaders,      redirect: 'follow'
    };
  
    const response = await fetch(`${domain}/deep/${rota_id}`, requestOptions)
    const retorno = await response.json();
    return retorno;
}

