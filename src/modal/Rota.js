const domain = "https://deep-analysis02.herokuapp.com";
const token = require('./Token')

exports.cadastrarRota = async (lt, rt, lb, rb, AsyncStorage) =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);
  
    var raw = JSON.stringify({
        "lt":{
            "type":"Point",
            "coordinates": lt
            },
        "rt":{
            "type":"Point",
            "coordinates": rt
            },
        "lb":{
            "type":"Point",
            "coordinates": lb
            },
        "rb":{
            "type":"Point",
            "coordinates":rb
            },
        "name":`Trajeto-${Math.round(Math.random() *100000)}`
    });
  
    var requestOptions = {
      method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
    };
  
    const response = await fetch(`${domain}/route/cadRoute`, requestOptions)
    
    const retorno = await response.json();
    return retorno;
}

/**
 * @description Função para selecionar uma ou todas as rotas já criadas
 * @param {*} AsyncStorage 
 * @param {*} id 
 * @returns Se id for vázio irá retornar todas as rotas, senão buscará uma em especifico
 */
exports.selecionarRota = async (AsyncStorage, id = "") =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);

    var requestOptions = {
      method: 'GET',    headers: myHeaders,      redirect: 'follow'
    };
    
    const response = await fetch(`${domain}/route/${id == "" ? "getAllRoutes" : id}`, requestOptions)
    const retorno = await response.json();
    return retorno;
}

