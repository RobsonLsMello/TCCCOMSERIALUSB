const deep = require('../modal/Deep')
var dadosSalvos = []

//longitude y
//latitude x

var rotas = (pontoA = {lat: 0, lon:0}, pontoC = {lat: 0, lon:0}) =>{
    /*
    A          B
    ____________
    |          | 
    |__________|
    D           C
    */
    let pontoB = {lat: pontoC.lat, lon: pontoA.lon}
    let pontoD = {lat: pontoA.lat, lon: pontoC.lon}
    let distanciaPercorridaMetros = distanceBetween(pontoA.lat, pontoA.lon, pontoD.lat, pontoD.lon);
    let distanciaPercorridaAbsoluto = pontoA.lon - pontoD.lon;
    let metroAbsoluto = distanciaPercorridaAbsoluto/distanciaPercorridaMetros;
    let decida = true;
    let gapMetros = 10;
    let gap = Math.abs(metroAbsoluto * gapMetros); //tamanho a cada busca
    let rota = [];
    for(let x = pontoA.lat; x <= pontoB.lat; x+=gap){{
        let index = 0;
        if(decida){
            for(let y = pontoD.lon; y >= pontoA.lon; y -=gap){
                rota.push({latitude: x, longitude: y, weight: Math.random() *5})
                index++
            }            
        }
        else{
            for(let y = pontoA.lon; y <= pontoD.lon; y +=gap){
                rota.push({latitude: x, longitude: y, weight: Math.random() *5})
                index++
            }
        }
        decida = !decida;
    }}
    return rota;
  
}

exports.rota = (pontoA = {lat: 0, lon:0}, pontoC = {lat: 0, lon:0}) =>{
    /*
    A          B
    ____________
    |          | 
    |__________|
    D           C
    */
    let pontoB = {lat: pontoC.lat, lon: pontoA.lon}
    let pontoD = {lat: pontoA.lat, lon: pontoC.lon}
    let distanciaPercorridaMetros = distanceBetween(pontoA.lat, pontoA.lon, pontoD.lat, pontoD.lon);
    let distanciaPercorridaAbsoluto = pontoA.lon - pontoD.lon;
    let metroAbsoluto = distanciaPercorridaAbsoluto/distanciaPercorridaMetros;
    let decida = true;
    let gapMetros = 10;
    let gap = Math.abs(metroAbsoluto * gapMetros); //tamanho a cada busca
    let rota = [];
    for(let x = pontoA.lat; x <= pontoB.lat; x+=gap){{
        if(decida){
            rota.push({latitude: x, longitude: pontoD.lon, weight: Math.random() *5})
            rota.push({latitude: x, longitude: pontoA.lon, weight: Math.random() *5})      
        }
        else{
            rota.push({latitude: x, longitude: pontoA.lon, weight: Math.random() *5})
            rota.push({latitude: x, longitude: pontoD.lon, weight: Math.random() *5})   
        }
        decida = !decida;
    }}
    return rota;
  
}

var profundidade = (x) =>  (5*(Math.sin((x/2) +(3*(Math.PI/2))) +1))

var radians = (num) => num * 0.017453292519943295769236907684886;

var distanceBetween = (lat1,long1,lat2,long2) =>
{
  // returns distance in meters between two positions, both specified
  // as signed decimal-degrees latitude and longitude. Uses great-circle
  // distance computation for hypothetical sphere of radius 6372795 meters.
  // Because Earth is no exact sphere, rounding errors may be up to 0.5%.
  // Courtesy of Maarten Lamers
  let delta = radians(long1-long2);
  let sdlong = Math.sin(delta);
  let cdlong = Math.cos(delta);
  lat1 = radians(lat1);
  lat2 = radians(lat2);
  let slat1 = Math.sin(lat1);
  let clat1 = Math.cos(lat1);
  let slat2 = Math.sin(lat2);
  let clat2 = Math.cos(lat2);
  delta = (clat1 * slat2) - (slat1 * clat2 * cdlong);
  delta = delta*delta;
  delta += (clat2 * sdlong)*(clat2 * sdlong);
  delta = Math.sqrt(delta);
  let denom = (slat1 * slat2) + (clat1 * clat2 * cdlong);
  delta = Math.atan2(delta, denom);
  return delta * 6372795;
}



exports.simularPontos = () =>{
    return rotas({lat:-23.9625243,lon:-46.4074338}, {lat:-23.9615243,lon:-46.4064338});
}

exports.executarBatimetria = async (bluetoothDevice,  setInBatimetria, setProfundidade, setTempoBatimetria, setBatimetriaFinalizada,atualizarVisaoMapa, writeSerial) =>{  
    dadosSalvos = [];
    setInBatimetria(batimetria => {
        atualizarVisaoMapa(true); 
        return true
    });
    
    /* Simulação */
    let z=0,y=0,x=0;
    let mili = 0;
    let simulacao = setInterval( () => {
        mili += 0.1;
        setTempoBatimetria(`${Math.floor(mili/60)}m${Math.floor(mili % 60)}s`);

        y = 0;
        x = 0;
        z = 0;
        setProfundidade(y);
        
        dadosSalvos.push(
            {latitude:z, longitude:x, profundidade: y, unidade:"metros"}
        );
        
        /*
        clearInterval(simulacao)  
        setBatimetriaFinalizada(true);
        */
        
    }, 100);
    
}

exports.salvarBatimetria = async (trajeto, AsyncStorage, setTempoBatimetria, setBatimetriaFinalizada, setInBatimetria, dadosSalvos = [], setInDownload) =>{
    setInDownload(true);
    let deeps = dadosSalvos.map(dado =>{
        try {
            return {
                "coordinate":{
                    "type":"Point",
                    "coordinates": [Number(dado.latitude), Number(dado.longitude)]
                },
                "value": Number(dado.profundidade),
            }
        } catch (error) {
            return {}
        }
    })
    await deep.cadastrarDeep(deeps, trajeto, AsyncStorage);
    setInDownload(false);
    /*let lenght = dadosSalvos.length;
    let indice = 0;
    let loop = setInterval(() => {
        deep.cadastrarDeep([dadosSalvos[indice].latitude, dadosSalvos[indice].longitude], trajeto, dadosSalvos[indice].profundidade, AsyncStorage);
        if(indice <= lenght){
            indice++;
        }
        else{
            clearInterval(loop);
        }
    }, 500);*/
 
    setTempoBatimetria("0m0s");
    setBatimetriaFinalizada(false);
    setInBatimetria(false);
}