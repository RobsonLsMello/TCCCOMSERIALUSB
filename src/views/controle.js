import * as React from 'react';
import { useState, useEffect  } from "react";
import { Text, View,TextInput, Dimensions, Image, TouchableHighlight} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/controle'
import styleLD from './css/controleLandscape'
import vars from './css/vars'
import DataCard from './components/dataCard';
import Navbar from './components/navbar';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SwitchFull } from 'react-native-switch-full-custom';
import { useSerial } from "../hooks/useSerial";
import { Marker } from 'react-native-maps';

function Controle({route, navigation}){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bluetoothOnline, setBluetoothStatus] = useState(false);
  const [conectandoSerial, setConectandoSerial] = useState(false);
  const [filaEscrita, setFila] = useState([]);
  const [serialLido, setSerialLido] = useState({});
  const [permissaoSerial, setPermissaoSerial] = useState(false);

  const [statusBat, setstatusBat] = useState(true);
  const [statusConexao, setStatusConexao] = useState(true);
  const [statusMotor, setstatusMotor] = useState(true);
  const [statusSonar, setStatusSonar] = useState(true);
  const [statusGPS, setStatusGPS] = useState(true);
  const [profundidade, setProfundidade] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [region, setRegion] = useState({
    latitude: -23.9660408,
    longitude: -46.3041324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [orientation, setOrientation] = useState(Dimensions.get('window').width < Dimensions.get('window').height? "portrait" : "landscape");
  const [isManual, setisManual] = useState(false);
  const [isVelocidade, setVelocidade] = useState(true);
  const [whichDirection, setWhichDirection] = useState(1);
  const trocarAuto = () => setisManual(previousState => !previousState);
  const trocarVelocidade = () => setVelocidade(previousState => !previousState);
  const [ultimoComando, setUltimoComando] = useState("");
  const [tentivaConexao, setTentivaConexao] = useState(true);
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
    console.log("Retorno Valor");
    console.log(res);
    setUltimoComando(comand => {
      console.log("Comando Acionado");
      console.log(comand);
      if(comand == null)
        return;
      let comando = comand.split(" ");
      switch(comando[0]){
        case "statusBat":
          status = res.split(" ")[0];
          setstatusBat(()=> status == "OK" ? true : false);
          break;
        case "statusLora":
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
          if(status == "OK"){
            let deep = res.split(" ")[1];
            setProfundidade(() => deep);
          }

          break;
        case "statusGPS":
          status = res.split(" ")[0];
          setStatusGPS(()=> status == "OK" ? true : false);

          if(status == "OK"){
            let lat = Number(res.split(" ")[1]);
            let lon = Number(res.split(" ")[2]);
            setLatitude(() => lat);
            setLongitude(() => lon);
            setRegion(()=>{return {
              latitude: lat,
              longitude:lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }})
            
          }
          break;
      }
    })
    setSerialLido(() => res)
    setEmEspera(() => false)
  }
  var conectar = async () =>{
    console.log("tentou chegar na tent")
    if(bluetoothOnline){
      setBluetoothStatus(false);
      close();
    }else{
        requestPermission(devices[0].deviceId)
        .then((data)=>{console.log(data);setPermissaoSerial(()=> true);})
        .catch((err)=>{console.log(err); setPermissaoSerial(()=> false);setTentivaConexao(true);})
        .finally(async ()=>{
          setConectandoSerial(()=> true)
          setTimeout(async() => {
            setConectandoSerial(()=>false)
            let retorno = await connect(devices[0].deviceId, onReadData);
            if(retorno != null){
              setBluetoothStatus(true);
            }else{
              setTentivaConexao(true);
            }
          }, 1000);
          
        });

      }
    }
  var regiaoInicial = {
    latitude: -23.9660408,
    longitude: -46.3041324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };


  const [loop, setLoop] = useState(null);
  const [emEspera, setEmEspera] = useState(false);
/*
  if(!bluetoothOnline && tentivaConexao){
    setTentivaConexao(false);
    console.log("Tentativa de conexão");
    (async () => {devices.length > 0 ? await conectar() : null})()
  }*/

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    Dimensions.addEventListener('change', ({window:{width,height}})=>{
        if (width>height) {
            (async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
            })();
            setOrientation("landscape")
        } 
        else{
            setOrientation("portrait")
        }
      })
  }, []);


  if (errorMsg) {
    console.log(errorMsg);
  } else if (location) {
    regiaoInicial = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  if(bluetoothOnline && loop == null){
    setFila(fila=>{fila.push("statusBat");return fila;})
    setFila(fila=>{fila.push("statusLora");return fila;})
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
                comandos.shift();

                }
                return status;
              })   
              
            }else{
              console.log("Comando inválido, passando para o próximo, aguarde")
            }
          }else{
            console.log("Aguardando novo comando");
          }
          if(leituras % 2 == 0){
            comandos.push("statusGPS");
          }
          if(leituras % 5 == 0){
            comandos.push("statusSonar");
            
          }
          if(leituras == 60){
            comandos.push("statusMotor");            
          }
          if(leituras >= 120){
            comandos.push("statusBat");
            comandos.push("statusLora");
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
    <View style={[orientation != "landscape" ? style.header : styleLD.header]}> 
      <View style={[orientation != "landscape" ? style.circle : styleLD.circle, bluetoothOnline ? {backgroundColor: "#2FCC66"}: null]}></View>
      <Text style={orientation != "landscape" ? style.lblAgora : styleLD.lblAgora}>Profundidade: {profundidade}cm</Text>
    </View>
    <View style={[orientation != "landscape" ? style.main : styleLD.main, orientation != "landscape" ? style.centerAll : styleLD.centerAll]}> 
      <MapView 
      style={orientation != "landscape" ? style.map : styleLD.map} 
      showsUserLocation={true}
      region={region}
      //onRegionChange={val => {onRegionChange(val); console.log(val)}}
      
      >

        <Marker
          coordinate={{ latitude: latitude, longitude: longitude}}
          image={require("../../assets/boat.png")}
        />  
      </MapView> 

    
    <View style={orientation != "landscape" ? style.containerMain : styleLD.containerMain}>
      <View  style={styleLD.switchManualHorizontal}>
      <TouchableHighlight style={style.btnBluetooth} onPress={conectar}>
            <Text style={{color:"#FFF"}}>{ !bluetoothOnline ? "Conectar" : "Desconectar"}</Text>
          </TouchableHighlight>
        <SwitchFull
            value={isManual}
            onValueChange={() => setisManual(modo =>{
              if(bluetoothOnline){
                modo = !modo;
                if(modo){
                  write("setModo m", setUltimoComando);
                }
                else{
                  write("setModo a", setUltimoComando);
                }
                console.log(modo ? "Manual" :"Automático");
              }
              return modo;
            })}
            disabled={false}
            activeText={'Manual'}
            inActiveText={'Automático'}
            circleSize={styleLD.switchManualObj.height}
            barHeight={styleLD.switchManualObj.height + 5}
            circleBorderWidth={0}
            backgroundActive={vars.secondaryColor}
            activeTextStyle={{color:vars.primaryColor}}
            inactiveTextStyle={{color:vars.primaryColor}}
            backgroundInactive={vars.secondaryColor}
            circleActiveColor={vars.primaryColor}
            circleInActiveColor={bluetoothOnline ? vars.primaryColor : "#717171"}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={true}
            renderInActiveText={true}
            switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={5} // multipled by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
        />

      </View>
      <View  style={styleLD.navegacaoInferior}>
        <View style={styleLD.direcao}>
          <TouchableHighlight 
            disabled={!isManual}  
            onPress={() => setWhichDirection( () =>{
              write("girar e", setUltimoComando);
              return 0;
            })} 
            style={[styleLD.direcional, !isManual ? {backgroundColor: "#717171"} : whichDirection == 0 ? {backgroundColor:vars.primaryColor}: {backgroundColor:vars.secondaryColor}]}
          >
            <Text style={[{fontWeight:"bold"},  !isManual ? {color: "#FFFFFF"} : whichDirection == 0 ? {color:vars.secondaryColor}: {color:vars.primaryColor}]}>{"◄"}</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            disabled={!isManual}  
            onPress={() => setWhichDirection( () =>{
              write("girar p", setUltimoComando);
              return 1;
            })} 
            style={[styleLD.direcional, {}, !isManual ? {backgroundColor: "#717171"} : whichDirection == 1 ? {backgroundColor:vars.primaryColor}: {backgroundColor:vars.secondaryColor}]}
          >
            <Text style={[{fontWeight:"bold"}, !isManual ? {color: "#FFFFFF"} : whichDirection == 1 ? {color:vars.secondaryColor}: {color:vars.primaryColor}]}>{"▲"}</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            disabled={!isManual} 
            onPress={() => setWhichDirection( () =>{
              write("girar d", setUltimoComando);
              return 2;
            })} 
            style={[styleLD.direcional, !isManual ? {backgroundColor: "#717171"} : whichDirection == 2 ? {backgroundColor:vars.primaryColor}: {backgroundColor:vars.secondaryColor}]}
          >
            <Text style={[{fontWeight:"bold"},  !isManual ? {color: "#FFFFFF"} :  whichDirection == 2 ? {color:vars.secondaryColor}: {color:vars.primaryColor}]} >{"►"}</Text>
          </TouchableHighlight>

        </View>
        <View style={styleLD.switchVertical}>
          <SwitchFull  
              value={isVelocidade}
              onValueChange={() => setVelocidade(modo =>{
                if(isManual){
                  modo = !modo;
                  if(!modo){
                    write("mover f", setUltimoComando);
                  }
                  else{
                    write("mover p", setUltimoComando);
                  }
                  console.log(modo ? "frente" :"parar");
                }
                return modo;
              })}
              disabled={false}
              activeText={'Parar'}
              inActiveText={'Frente'}
              circleSize={styleLD.switchManualObj.height}
              barHeight={styleLD.switchManualObj.height + 5}
              circleBorderWidth={0}
              backgroundActive={vars.secondaryColor}
              activeTextStyle={{color:vars.secondaryColor, transform:[{rotateZ: "-90deg"}], position: "absolute", zIndex: 3}}
              inactiveTextStyle={{color:vars.secondaryColor, transform:[{rotateZ: "-90deg"}], position: "absolute", zIndex: 3}}
              backgroundInactive={vars.secondaryColor}
              circleActiveColor={"#717171"}
              circleInActiveColor={vars.primaryColor}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{ alignItems: "center", justifyContent: "center"}} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={3} // multipled by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
        </View>
        
      </View>
    
    </View>
    
      
    </View>
    <View style={[orientation != "landscape" ? style.footer : styleLD.footer]}> 
      <Navbar nav={navigation} screen="Controle" orientation={orientation} />
    </View>
    {orientation != "landscape"?
        (
            <View style={orientation != "landscape" ? style.rotateScreenSplash : styleLD.rotateScreenSplash}>
                <Image
                    source={require("../../assets/rotate.gif")}
                />
            </View>
        )
        :
        null
    }
    
  </View>
  )
}



export default Controle