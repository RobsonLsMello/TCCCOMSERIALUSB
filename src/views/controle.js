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

function Controle({route, navigation}){
  const {
    devices,
    requestPermission,
    connect,
    close,
    write
  } = useSerial(onReadData);
  var onReadData = (data) => {
    let res = ""
    for (var n = 0; n < data.data.length; n += 2) {
      res += String.fromCharCode(parseInt(data.data.substr(n, 2), 16));
    }
    res = res.trim();
    console.log(res);
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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bluetoothOnline, setBluetoothStatus] = useState(false);
  const [conectandoSerial, setConectandoSerial] = useState(false);

  const [orientation, setOrientation] = useState(Dimensions.get('window').width < Dimensions.get('window').height? "portrait" : "landscape");
  const [isManual, setisManual] = useState(false);
  const [isVelocidade, setVelocidade] = useState(true);
  const [whichDirection, setWhichDirection] = useState(1);
  const trocarAuto = () => setisManual(previousState => !previousState);
  const trocarVelocidade = () => setVelocidade(previousState => !previousState);
  const [ultimoComando, setUltimoComando] = useState("");

  if(!bluetoothOnline){
    (async () => {devices.length > 0 ? await conectar() : ""})()
  }

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

    return(
  <View style={[]}> 
    <View style={[orientation != "landscape" ? style.header : styleLD.header]}> 
      <View style={orientation != "landscape" ? style.circle : styleLD.circle}></View>
      <Text style={orientation != "landscape" ? style.lblAgora : styleLD.lblAgora}>Agora</Text>
    </View>
    <View style={[orientation != "landscape" ? style.main : styleLD.main, orientation != "landscape" ? style.centerAll : styleLD.centerAll]}> 
      <MapView 
      style={orientation != "landscape" ? style.map : styleLD.map} 
      showsUserLocation={true}
      region={regiaoInicial}
      //onRegionChange={val => {onRegionChange(val); console.log(val)}}
      
      /> 

    
    <View style={orientation != "landscape" ? style.containerMain : styleLD.containerMain}>
      <View  style={styleLD.switchManualHorizontal}>
        <SwitchFull
            value={isManual}
            onValueChange={() => setisManual(modo =>{
              modo = !modo;
              if(modo){
                write("setModo m", setUltimoComando);
              }
              else{
                write("setModo a", setUltimoComando);
              }
              console.log(modo ? "Manual" :"Automático");
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
            circleInActiveColor={vars.primaryColor}
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
            style={[styleLD.direcional, whichDirection == 0 ? {backgroundColor:vars.primaryColor}: {backgroundColor:vars.secondaryColor}]}
          >
            <Text style={[{fontWeight:"bold"}, whichDirection == 0 ? {color:vars.secondaryColor}: {color:vars.primaryColor}]}>{"◄"}</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            disabled={!isManual}  
            onPress={() => setWhichDirection( () =>{
              write("girar p", setUltimoComando);
              return 1;
            })} 
            style={[styleLD.direcional, {},whichDirection == 1 ? {backgroundColor:vars.primaryColor}: {backgroundColor:vars.secondaryColor}]}
          >
            <Text style={[{fontWeight:"bold"}, whichDirection == 1 ? {color:vars.secondaryColor}: {color:vars.primaryColor}]}>{"▲"}</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            disabled={!isManual} 
            onPress={() => setWhichDirection( () =>{
              write("girar d", setUltimoComando);
              return 2;
            })} 
            style={[styleLD.direcional, whichDirection == 2 ? {backgroundColor:vars.primaryColor}: {backgroundColor:vars.secondaryColor}]}
          >
            <Text style={[{fontWeight:"bold"}, whichDirection == 2 ? {color:vars.secondaryColor}: {color:vars.primaryColor}]} >{"►"}</Text>
          </TouchableHighlight>

        </View>
        <View style={styleLD.switchVertical}>
          <SwitchFull  
              value={isVelocidade}
              onValueChange={() => setVelocidade(modo =>{
                if(isManual){
                  modo = !modo;
                  if(modo){
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
              circleActiveColor={vars.primaryColor}
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