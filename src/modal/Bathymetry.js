const domain = "https://deep-analysis02.herokuapp.com";
const token = require('./Token')
const rota = require('./Rota')

exports.cadastrarBathy = async (rota_id, AsyncStorage) =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);
  
    var raw = JSON.stringify({
        "idRoute": rota_id
    });
  
    var requestOptions = {
      method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
    };

    const response = await fetch(`${domain}/bathymetry/cadBathy`, requestOptions)
    const retorno = await response.json();
    return retorno.message._id;
}


exports.selecionarBathy = async (AsyncStorage, bathymetry_id = "") =>{
    let token_id = await token.refreshToken(AsyncStorage);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token_id}`);

    var requestOptions = {
      method: 'GET',    headers: myHeaders,      redirect: 'follow'
    };
  
    const response = await fetch(`${domain}/bathymetry/getBathy/${bathymetry_id}`, requestOptions)
    var retorno = await response.json();
    var rotas = await rota.selecionarRota(AsyncStorage, "");
    var res = []
    retorno.data.forEach(bathy =>{
      let routeEncontrada ="";
      for(let i = 0; i < rotas.data.length; i++){
        if(bathy.idRoute == rotas.data[i]._id){
          routeEncontrada = rotas.data[i];
          break;
        }
      }
      res.push({
        bathy: bathy,
        route: routeEncontrada
      })
    })
    return res;
}

