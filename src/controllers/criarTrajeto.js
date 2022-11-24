const rota = require('../modal/Rota')


  exports.criarTrajeto = async (markers = [], nav, AsyncStorage, Alert) =>{
    let indiceLT = null;
    let indiceRT = null;
    let indiceLB = null;
    let indiceRB = null;
    let rt = null;
    let lb = null;
    let lt = null;
    let rb = null;

    if(markers[0].longitude >= markers[1].longitude && markers[0].latitude <= markers[1].latitude)
        indiceLT = 0
    else if(markers[1].longitude >= markers[0].longitude && markers[1].latitude <= markers[0].latitude)
        indiceLT = 1;
    if(markers[0].longitude >= markers[1].longitude && markers[0].latitude >= markers[1].latitude)
        indiceRT = 0
    else if(markers[1].longitude >= markers[0].longitude && markers[1].latitude >= markers[0].latitude)
        indiceRT = 1;
    if(markers[0].longitude <= markers[1].longitude && markers[0].latitude <= markers[1].latitude)
        indiceLB = 0
    else if(markers[1].longitude <= markers[0].longitude && markers[1].latitude <= markers[0].latitude)
        indiceLB = 1;
    if(markers[0].longitude <= markers[1].longitude && markers[0].latitude >= markers[1].latitude)
        indiceRB = 0
    else if(markers[1].longitude <= markers[0].longitude && markers[1].latitude >= markers[0].latitude)
        indiceRB = 1;

    if(indiceLT != null){
        lt = [markers[indiceLT].longitude, markers[indiceLT].latitude];
        rb = [markers[indiceRB].longitude, markers[indiceRB].latitude];
        rt = [lt[0], rb[1]];
        lb = [rb[0], lt[1]];
    }
    else{
        rt = [markers[indiceRT].longitude, markers[indiceRT].latitude];
        lb = [markers[indiceLB].longitude, markers[indiceLB].latitude];
        
        lt = [rt[0], lb[1]];
        rb = [lb[0], rt[1]];
    }
    let retorno = await rota.cadastrarRota(lt, rt, lb, rb, AsyncStorage);
    console.log(retorno)

    if(retorno.message == "Rota criada."){
        Alert.alert(
            "Sucesso",
            "Rota Criada com Sucesso",
            [
              { text: "OK", onPress: () => nav.navigate("main") }
            ]);
    }
    else{
        Alert.alert(
            "Erro",
            retorno.message,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
    }
    
  }