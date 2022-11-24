import * as React from 'react';
import { useState, useEffect, Component  } from "react";
import { Text, View,TextInput, Alert, Image, TouchableHighlight, BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/main'
import DataCard from './components/dataCard';
import Navbar from './components/navbar';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import controller from './../controllers/main'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrajetoModal from './modal/selecionarTrajeto'
import { Polyline, Heatmap, Circle } from 'react-native-maps';
var index = 0;
var pontos = controller.simularPontos()
function Main({route, navigation}){

  var regiaoInicial = {
    latitude: -23.9660408,
    longitude: -46.3041324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bluetoothOnline, setBluetoothStatus] = useState(false);
  const [pontosLidos, setPontos] = useState([]);
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

  
  if (errorMsg) {
    console.log(errorMsg);
  } else if(location && region == null){
    atualizarVisaoMapa(false)
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
            : console.log("ainda não")
          }
      </MapView> 

        <View>
          <LinearGradient
            // Background Linear Gradient
            colors={['rgba(5,5,5,0.55)', 'transparent']}
            style={style.infoContainer}
          >
          <DataCard valor={ bluetoothOnline ? "21ºC" : "-ºC"} titulo="Temperatura"></DataCard>
          <DataCard valor={ bluetoothOnline ? `${profundidade}m` : "-m"} titulo="Profundidade"></DataCard>
          {
            inBatimetria?
            (<DataCard valor={tempoBatimetria} titulo="Tempo Decorrido"></DataCard>):(null)
          }
          </LinearGradient>
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
            <TouchableHighlight style={[style.btnBluetooth, inBatimetria ? {display:"none"} : null]} onPress={()=> setBluetoothStatus(!bluetoothOnline)}>
              <Image
                style={style.imgBluetooth}
                source={require("../../assets/usb.png")}
              />
            </TouchableHighlight>
            <View style={[style.pnlDispositivo, inBatimetria ? {display:"none"} : null]}>
              <View>
                <Text style={style.lblDispositivo}>Dispositivo</Text>
                <Text style={bluetoothOnline ? style.lblOnline : style.lblOffline}>{bluetoothOnline ? "Online" : "Offline"}</Text>
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
    <TrajetoModal modalVisible={modalTrajetoAberto} setModalTrajeto={setModalTrajeto} setTrajetoSelecionado={setTrajetoSelecionado} setEscolhido={setTrajeto} escolhido={trajeto} atualizarVisaoMapa={atualizarVisaoMapa} pressionado={()=>controller.executarBatimetria(null,  setInBatimetria, setProfundidade, setTempoBatimetria, setBatimetriaFinalizada, atualizarVisaoMapa)}/>
    {batimetriaFinalizada ? (
      Alert.alert("Batimetria Finalizada", "A medição da batimetria foi finalizada com sucesso", [{
        text: "Concluir",
        onPress: () => {controller.salvarBatimetria(trajeto, AsyncStorage, setTempoBatimetria, setBatimetriaFinalizada, setInBatimetria);atualizarVisaoMapa(false)},
        style: "default",
      },
      {
        text: "Cancelar",
        cancelable: true,
        onPress: () => null,
        style: "cancel",
      }
      ]))
      : (null)}
  </View>
  )
}



export default Main