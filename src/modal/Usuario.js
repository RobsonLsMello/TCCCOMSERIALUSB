
const domain = "https://deep-analysis02.herokuapp.com";
const token = require('./Token')

exports.cadastrarEmail = async (email) =>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": email
  });

  var requestOptions = {
    method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
  };

  const response = await fetch(`${domain}/user/cadEmail`, requestOptions)
  const retorno = await response.json();
  return retorno;
}

exports.confirmarEmail = async (email, code) =>{  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email" : email,
    "code"  : code
  });

  var requestOptions = {
    method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
  };

  const response = await fetch(`${domain}/user/verifyCode`, requestOptions)
  const retorno = await response.json();
  return retorno;
}

exports.verificarEmail = async (email) =>{  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email" : email
  });

  var requestOptions = {
    method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
  };

  const response = await fetch(`${domain}/user/sendVerifCode`, requestOptions)
  const retorno = await response.json();
  return retorno;
}

exports.informarDados = async (nome, telefone, AsyncStorage) =>{
  let token_id = await token.refreshToken(AsyncStorage);
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token_id}`);

  var raw = JSON.stringify({
    "nameUser": nome,
    "phone"   : telefone

  });

  var requestOptions = {
    method: 'PATCH',    headers: myHeaders,    body: raw,    redirect: 'follow'
  };

  const response = await fetch(`${domain}/user/nameAndPhone`, requestOptions)
  const retorno = await response.json();
  return retorno;
}

exports.atualizarNotificacoes = async (notifyInitBathymetry, notifyEndBathymetry, notifyObstacle, storage) =>{
  let token_id = await token.refreshToken(storage);
  var myHeaders = new Headers();
  
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token_id}`);

  var raw = JSON.stringify({
    "notifyInitBathymetry": notifyInitBathymetry,
    "notifyEndBathymetry" : notifyEndBathymetry,
    "notifyObstacle"      : notifyObstacle

  });

  var requestOptions = {
    method: 'PATCH',    headers: myHeaders,    body: raw,    redirect: 'follow'
  };

  const response = await fetch(`${domain}/user/cadUserEspec`, requestOptions)
  const retorno = await response.json();
  return retorno;
}