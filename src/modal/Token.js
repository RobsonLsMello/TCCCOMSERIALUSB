const domain = "https://deep-analysis02.herokuapp.com";


exports.refreshToken = async (AsyncStorage) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
        "refreshToken": await AsyncStorage.getItem("@refreshToken")
    });
  
    var requestOptions = {
      method: 'POST',    headers: myHeaders,    body: raw,    redirect: 'follow'
    };
  
    const response = await fetch(`${domain}/user/auth/refreshToken`, requestOptions)

    const retorno = await response.json();
    await AsyncStorage.setItem("@refreshToken", retorno.refreshToken);
    await AsyncStorage.setItem("@token", retorno.token);
    return retorno.token;
}