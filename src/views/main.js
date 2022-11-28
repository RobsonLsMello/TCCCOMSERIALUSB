import * as React from 'react';
import { useState, useEffect, Component  } from "react";
import { Text, View,Modal, Alert, Image, TouchableHighlight, BackHandler, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/main'
import DataCard from './components/dataCard';
import Navbar from './components/navbar';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import controller from './../controllers/main'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrajetoModal from './modal/selecionarTrajeto'
import { useSerial } from "../hooks/useSerial";
import { Polyline, Heatmap, Circle } from 'react-native-maps';


var index = 0;
var pontos = controller.simularPontos()
function Main({route, navigation}){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bluetoothOnline, setBluetoothStatus] = useState(false);
  const [conectandoSerial, setConectandoSerial] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mytime, setMytime] = useState(0);
  const [indice, setIndice] = useState(0);
  const [inBatimetria, setInBatimetria] = useState(false);
  const [region, setRegion] = useState(null);
  const [profundidade, setProfundidade] = useState(0);
  const [tempoBatimetria, setTempoBatimetria] = useState("00m00s");
  const [batimetriaFinalizada, setBatimetriaFinalizada] = useState(false);
  const [modalTrajetoAberto, setModalTrajeto] = useState(false);
  const [trajeto, setTrajeto] = useState(-1);
  const [trajetoSelecionado, setTrajetoSelecionado] = useState(null);
  const [permissaoSerial, setPermissaoSerial] = useState(false);
  const [visaoMapaSetada, setVisaoMapaSetada] = useState(true);

  const [pontosLidos, setPontos] = useState([]);
  const [quantidadePontosLidos, setQuantidadePontosLidos] = useState(0);
  const [indiceLeitura, setIndiceLeitura] = useState(0);
  const [porcentagemBatimetria, setPorcentagemBatimetria] = useState(0);
  const [serialLido, setSerialLido] = useState({});
  const [temporizador, setTemporizador] = useState(null);
  const [emEspera, setEmEspera] = useState(false);
  const [inicioLeitura, setInicioLeitura] = useState(false);
  const [leituraFinalizada, setLeituraFinalizada] = useState(false);
  const [gravacaoPontosFinalizada, setGravacaoPontosFinalizada] = useState(false);
  const [ultimoComando, setUltimoComando] = useState("");

  const [filaEscrita, setFila] = useState([]);
  const [loop, setLoop] = useState(null);

  const [statusBat, setstatusBat] = useState(true);
  const [statusConexao, setStatusConexao] = useState(true);
  const [statusMotor, setstatusMotor] = useState(true);
  const [statusSonar, setStatusSonar] = useState(true);
  const [statusGPS, setStatusGPS] = useState(true);
  const [statusInDownload, setStatusInDownload] = useState(false);

  const {
    devices,
    requestPermission,
    connect,
    close,
    write
  } = useSerial(onReadData);

  var onReadData = (data) => {
    let res = ""
    let status = "";
    for (var n = 0; n < data.data.length; n += 2) {
      res += String.fromCharCode(parseInt(data.data.substr(n, 2), 16));
    }
    res = res.trim();
    setUltimoComando(comand => {
      if(comand == null)
        return;
      let comando = comand.split(" ");
      switch(comando[0]){
        case "setVertice":{
          if(res = "Ok"){
            switch(comando[1]){
              case "0":                
                console.log("Vertice 1 setado")
                break;
              case "2":
                console.log("Vertice 2 setado")
              break;
            }
          }
          else{
            console.log(res)
          }          
        }
        break;
        case "iniciar":
          if(res = "Ok"){
            console.log("Iniciado")
            setInBatimetria(async () => {
              setVisaoMapaSetada(() => false) 
              return true
            });
            setInicioLeitura((status)=>{
              if(!status){
                let mili = 0;
                let leitura = setInterval( () => {
                  mili += 1;
                  setTempoBatimetria(`${Math.floor(mili/60)}m${Math.floor(mili % 60)}s`);
                  setFila(fila=>{
                    fila.push("statusNav");
                    return fila;
                  })
          
                  setBatimetriaFinalizada(bat =>{
                    if(bat)
                      clearInterval(leitura)
                    return bat;
                  })  
                }, 1000)
              }
              return true
            })

            let leituraPontos = setInterval(() => {
              setPorcentagemBatimetria(pct =>{
                setQuantidadePontosLidos(pontosMaximos=>{
                  setPontos(pontos =>{
                    let indiceAtual = pontos.length == 0 ? 0 : pontos.length - 1;
                    let indiceAdicionar = pontos.length;
                    let comando = "";
                    //garantir que todos os pontos estão com valor
                    if(pontos.length == 0){
                      //write(`getPonto 0`, setUltimoComando)
                      setFila(fila=>{fila.push("getPonto 0");return fila;})
                      return pontos;
                    }
                    if(pontos[indiceAtual].longitude == "ERR4"){
                      //write(`getPonto ${indiceAtual}`, setUltimoComando)
                      comando = `getPonto ${indiceAtual}`;
                    }else{
                      if(pct < 100 && indiceAdicionar <= pontosMaximos){
                        comando = `getPonto ${indiceAdicionar}`;
                        //write(`getPonto ${indiceAdicionar}`, setUltimoComando)
                      }
                      else if(pct >= 100 && indiceAdicionar <= pontosMaximos){
                        //write(`getPonto ${indiceAdicionar}`, setUltimoComando)
                        comando = `getPonto ${indiceAdicionar}`;
                      }
                      if (pct >= 100 && indiceAdicionar > pontosMaximos){
                        //console.log(pontos);
                        setLeituraFinalizada(()=>true);
                        clearInterval(leituraPontos);
                      }
                    }
                    setFila(fila=>{fila.push(comando);return fila;})
                    return pontos;
                  })
                  return pontosMaximos;
                });
                return pct;
              })
                        
            }, 3000);

          }
        break;
        case "statusNav":
          let retorno = {
            status: res.split(" ")[0],
            pontos: res.split(" ")[1],
            porcentagem: res.split(" ")[2],
          }
          if(retorno.porcentagem >= 100){
            setBatimetriaFinalizada(status => true)
            setQuantidadePontosLidos(()=>retorno.pontos);
            setPorcentagemBatimetria(()=>retorno.porcentagem);
          }
          break;
        case "getPonto":
          let deep = {
            latitude: res.split(" ")[1],
            longitude: res.split(" ")[0],
            profundidade: res.split(" ")[2],
          }
          setPorcentagemBatimetria(pct =>{
            setQuantidadePontosLidos(pontosMaximos=>{
              setPontos(pontos =>{
                if((deep.longitude != "ERR4" ) && comando[1] == pontos.length){
                  pontos.push(deep);
                }                
                if(pontos.length >= (pontosMaximos - 1) && pct >= 100){
                  setGravacaoPontosFinalizada(() => true)
                }                  
                return pontos;
              })
              return pontosMaximos;
            });
            return pct;
          }) 
          break;

        case "statusBat":
          status = res.split(" ")[0];
          setstatusBat(()=> status == "OK" ? true : false);
          break;
        case "statusConexão":
          status = res.split(" ")[0];
          setStatusConexao(()=> status == "OK" ? true : false);

          break;
        case "statusMotor":
          status = res.split(" ")[0];
          setstatusMotor(()=> status == "OK" ? true : false);

          break;
        case "statusSonar":
          status = res.split(" ")[0];
          setStatusSonar(()=> status == "OK" ? true : false);

          break;
        case "statusGPS":
          status = res.split(" ")[0];
          setStatusGPS(()=> status == "OK" ? true : false);

          break;
      }
    })
    setSerialLido(() => res)
    setEmEspera(() => false)
  }

  var requisitarPermissao = () =>{
    setTimeout(() => {
      if(devices.length > 0){
        console.log(devices);
        requestPermission(devices[0].deviceId);
      }  
      console.log("Varreu");
    }, 5000);
    
    
  }

  var conectar = async () =>{
    if(bluetoothOnline){
      setBluetoothStatus(false);
      close();
    }else{
      requestPermission(devices[0].deviceId)
      .then((data)=>{console.log(data);setPermissaoSerial(()=> true);})
      .catch((err)=>{console.log(err); setPermissaoSerial(()=> false);})
      .finally(async ()=>{
        setConectandoSerial(()=> true)
        setTimeout(async() => {
          setConectandoSerial(()=>false)
          let retorno = await connect(devices[0].deviceId, onReadData);
          if(retorno != null){
            setBluetoothStatus(true);
          }
        }, 5000);
        
      });

    }
  }



  var regiaoInicial = {
    latitude: -23.9660408,
    longitude: -46.3041324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };


  var setMarker = (latitude, longitude, profundidade,  index) =>{
      setMarkers(marks =>{
        marks.push((
          <Circle
            radius={5}
            center={{ latitude: latitude, longitude: longitude}}
            key={index}
            fillColor={`rgba(${255-(profundidade*30)},0,0,1)`}
            strokeColor="rgba(0,0,0,0.0)"
          />
        ))
        return marks;
      });
  }

  useEffect(() => {
    //requisitarPermissao();
    const myInterval = setInterval(() => {
      setIndice((indiceAnterior) => {
        let index = indiceAnterior;
        setAutorizado(auth =>{
          if(auth){
            if(index + 1 < pontos.length){
              index++;
              console.log(index);
              setMarker(pontos[index].latitude, pontos[index].longitude, pontos[index].weight, index);
            }
          }
          return auth;
        })
        return index;
      })
    }, 100);
    // clear out the interval using the id when unmounting the component
    return () => clearInterval(myInterval);
  }, []);

  useEffect(() => {

    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    return () => backHandler.remove();
    
  }, []);

  var atualizarVisaoMapa = async (comecouBatimetria) =>{
    console.log("atualizou o mapa");
    console.log(comecouBatimetria);

    comecouBatimetria?
    setRegion({
      latitude: trajetoSelecionado.coordinateRB.coordinates[1],
      longitude: trajetoSelecionado.coordinateRB.coordinates[0],
      latitudeDelta: 0.0080,
      longitudeDelta: 0.0080,
    })
    :setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0080,
      longitudeDelta: 0.0080,
    })
  }

  if(!visaoMapaSetada && inBatimetria){
    atualizarVisaoMapa(true);
    setVisaoMapaSetada(()=> true);
  }
  if(leituraFinalizada && gravacaoPontosFinalizada){
    setBatimetriaFinalizada(() => false);
    Alert.alert("Batimetria Finalizada", "A medição da batimetria foi finalizada com sucesso", [{
      text: "Concluir",
      onPress: () => {controller.salvarBatimetria(trajeto, AsyncStorage, setTempoBatimetria, setBatimetriaFinalizada, setInBatimetria, pontosLidos, setStatusInDownload);atualizarVisaoMapa(false)},
      style: "default",
    }
    ])
    setPorcentagemBatimetria(0);
    setQuantidadePontosLidos(0);
    setPontos([])
    setInicioLeitura(false);
    setLeituraFinalizada(false);
    setGravacaoPontosFinalizada(false);
    
  }
  if (errorMsg) {
    console.log(errorMsg);
  } else if(location && region == null){
    atualizarVisaoMapa(false)
  }

  if(bluetoothOnline && loop == null){
    setFila(fila=>{fila.push("statusBat");return fila;})
    setFila(fila=>{fila.push("statusConexão");return fila;})
    setFila(fila=>{fila.push("statusMotor");return fila;})
    setFila(fila=>{fila.push("statusSonar");return fila;})
    setFila(fila=>{fila.push("statusGPS");return fila;})
    setLoop(() => {
      let leituras = 0;
      let loop = setInterval(() => {
        setFila(comandos =>{          
          if(comandos.length != 0){
            let comandoExecutado = comandos[0];
            if(comandos[0] != ""){
              setEmEspera(emEspera =>{
                let status = emEspera;
                if(!emEspera){
                  
                  write(comandoExecutado, setUltimoComando);
                  status = true;
                }
                return status;
              })   
              
            }else{
              console.log("Comando inválido, passando para o próximo, aguarde")
            }
            comandos.shift();
          }else{
            console.log("Aguardando novo comando");
          }
          if(leituras == 60){
            comandos.push("statusMotor");
            comandos.push("statusSonar");
            comandos.push("statusGPS");
          }
          if(leituras >= 120){
            comandos.push("statusBat");
            comandos.push("statusConexão");
            leituras = 0;
          }
          else
            leituras++;
          return comandos;
        })

      }, 1000)
      return loop;
    })
  }
  else if(!bluetoothOnline && loop != null){
    clearInterval(loop);
    setLoop(null);
  }

    return(
  <View style={[]}> 
    <View style={[style.header]}> 
      <View style={style.circle}></View>
      <Text style={style.lblAgora}>Agora</Text>
      <Image
        style={style.logo}
        source={require("../../assets/logo.png")}

      />
    </View>
    <View style={[style.main, style.centerAll]}> 
      <MapView 
      style={style.map} 
      showsUserLocation={true}
      region={region}
      onRegionChangeComplete={val =>{regiaoInicial = val}}
      //onRegionChange={val => {onRegionChange(val); console.log(val)}}
      
      >
          {
            inBatimetria? 
            (
              <Polyline 
                coordinates={controller.rota({lat: trajetoSelecionado.coordinateLT.coordinates[1], lon:trajetoSelecionado.coordinateLT.coordinates[0]}, {lat:trajetoSelecionado.coordinateRB.coordinates[1], lon:trajetoSelecionado.coordinateRB.coordinates[0]})}
                strokeWidth={3}
                strokeColor="#654AB4"
              />
            )    
            : console.log("")
          }
      </MapView> 

        <View>
          <LinearGradient
            // Background Linear Gradient
            colors={['rgba(5,5,5,0.55)', 'transparent']}
            style={style.infoContainer}
          >
          
          {
            inBatimetria?
            (<DataCard valor={tempoBatimetria} titulo="Tempo Decorrido"></DataCard>):(null)
          }
          {
            inBatimetria?
            (<DataCard valor={ bluetoothOnline ? `${porcentagemBatimetria} %` : "-%"} titulo="Porcentagem"></DataCard>):(null)
          }
          </LinearGradient>
        </View>
        <View style={[style.statusContainerPai]}>
          <View style={[style.statusContainer, !bluetoothOnline ? {display:'none' }:{}]}>
            <Image
                style={style.imgStatus}
                source={statusBat ? require("../../assets/status/battery.png") : require("../../assets/status/no-battery.png")}
              />
              <Image
                style={style.imgStatus}
                source={statusConexao ? require("../../assets/status/wifi.png") : require("../../assets/status/no-wifi.png")}
              />
              <Image
                style={style.imgStatus}
                source={statusGPS ? require("../../assets/status/gps.png") : require("../../assets/status/no-gps.png")}
              />
              <Image
                style={style.imgStatus}
                source={statusSonar ? require("../../assets/status/sensor.png") : require("../../assets/status/no-sensor.png")}
              />
              <Image
                style={style.imgStatus}
                source={statusMotor ? require("../../assets/status/gear.png") : require("../../assets/status/no-gear.png")}
              />
              <Image
                style={style.imgStatus}
                source={statusInDownload ? require("../../assets/status/upload.png") : require("../../assets/status/check.png")}
              />
          </View>
        </View>
        <View style={style.containerMain}>
          <View style={style.pnlControleBatimetria}>
            <View style={[style.pnlLegenda, !inBatimetria ? {display:"none"} :  {display:"none"}]}>
              <Text style={style.lblLegenda}>Legenda</Text>
              <Text style={style.lblProfundidade}>Profundidade</Text>
              <View style={style.pnlProfundidades}>
                <Text>0m</Text>
                <Text>50m</Text>
              </View>
              <LinearGradient
                // Background Linear Gradient
                end={[1,0]}
                start={[0,0]}
                colors={['#BAEC2D', '#EC2D2D']}
                style={style.pnlNivelProfundidade}
              />
            </View>
            <TouchableHighlight style={[style.btnBluetooth, inBatimetria ? {display:"none"} : null]} onPress={conectar}>
              <Image
                style={style.imgBluetooth}
                source={require("../../assets/usb.png")}
              />
            </TouchableHighlight>
            <View style={[style.pnlDispositivo, inBatimetria ? {display:"none"} : null]}>
              <View>
                <Text style={style.lblDispositivo}>Dispositivo</Text>
                <Text style={bluetoothOnline ? style.lblOnline : style.lblOffline}>{conectandoSerial? "Conectando" : bluetoothOnline ? "Online" : "Offline"}</Text>
              </View>            
            </View>
            <TouchableHighlight style={style.btnBatimentria} onPress={() => 
              { 
                bluetoothOnline ? (
                  inBatimetria ? null 
                  : setModalTrajeto(true)
                ) : null
              }}>
              <Text style={style.lblBatimetria}>{ inBatimetria ?  "Aguarde" : "Iniciar Batimetria"}</Text>
            </TouchableHighlight>
          </View>
        </View>
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Início" />
    </View>
    <TrajetoModal modalVisible={modalTrajetoAberto} setModalTrajeto={setModalTrajeto} setTrajetoSelecionado={setTrajetoSelecionado} setEscolhido={setTrajeto} escolhido={trajeto} atualizarVisaoMapa={atualizarVisaoMapa} 
    pressionado={()=>{
      setTimeout(() => {
        write(`setVertice 0 ${trajetoSelecionado.coordinateLT.coordinates[1]} ${trajetoSelecionado.coordinateLT.coordinates[0]}`, setUltimoComando)
      }, 0);
      setTimeout(() => {
        write(`setVertice 2 ${trajetoSelecionado.coordinateRB.coordinates[1]} ${trajetoSelecionado.coordinateRB.coordinates[0]}`, setUltimoComando)
      }, 1000);
      setTimeout(() => {
        write(`iniciar ${trajetoSelecionado.coordinateRB.coordinates[1]} ${trajetoSelecionado.coordinateRB.coordinates[0]}`, setUltimoComando)
      }, 2000);
    }}
    />

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={batimetriaFinalizada}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22, backgroundColor:"#000000C5"}}>
            <View style={{    margin: 20,
                justifyContent:"space-evenly", backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, height: 200}}>
              <Text>Carregando e validando dados</Text>
              <Text>de {pontosLidos.length} até {quantidadePontosLidos}</Text>
              <ActivityIndicator size="large" color="#654AB4" />
            </View>
          </View>
        </Modal>
      </View>


  </View>
  )
}



export default Main