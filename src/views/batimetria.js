import * as React from 'react';
import { useState, useEffect, Component  } from "react";
import { Text, View,Modal, Alert, Image, TouchableHighlight, BackHandler, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/main'
import DataCard from './components/dataCard';
import Navbar from './components/navbar';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heatmap } from 'react-native-maps';
import controller from './../controllers/batimetria'
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

function Batimetria({route, navigation}){
  const [bluetoothOnline, setBluetoothStatus] = useState(false);
  const [inBatimetria, setInBatimetria] = useState(false);
  const [region, setRegion] = useState(null);
  const [tempoBatimetria, setTempoBatimetria] = useState("00m00s");
  const [location, setLocation] = useState(null);
  const [pontos, setPontos] = useState([]);
  const [profundidades, setProfundidades] = useState({maximo: 0, minimo: 0});

  const [porcentagemBatimetria, setPorcentagemBatimetria] = useState(0);

  var atualizarVisaoMapa = async () =>{
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0080,
      longitudeDelta: 0.0080,
    })
  }

  var regiaoInicial = {
    latitude: -23.9660408,
    longitude: -46.3041324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };



  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let profundidadeMaximo;
      let profundidadeMinimo;
      let res = await controller.mostrarDeeps(AsyncStorage, route.params.bathyId)
      let pontos = res[0].deeps.map((deep, index) => {
        if(index == 0){
            profundidadeMaximo = deep.value
            profundidadeMinimo = deep.value
        }else{
            if(deep.value > profundidadeMaximo){
                profundidadeMaximo = deep.value;
            }
            if(deep.value < profundidadeMinimo){
                profundidadeMinimo = deep.value;
            }
        }
        return {
            "latitude": deep.coordinate.coordinates[1],
            "longitude": deep.coordinate.coordinates[0],
            "weight": deep.value
          }
      })
      setProfundidades({
        maximo: profundidadeMaximo, 
        minimo: profundidadeMinimo
      })
      let distancia = distanceBetween(pontos[0].latitude, pontos[0].longitude, pontos[pontos.length -1].latitude, pontos[pontos.length-1].longitude)
      
      setRegion({
        latitude:  pontos[Number(Number(pontos.length/2).toPrecision(2))].latitude,
        longitude:  pontos[Number(Number(pontos.length/2).toPrecision(2))].longitude,
        latitudeDelta: (distancia/1110000) *100,
        longitudeDelta: (distancia/1110000) *100,
      })
      setPontos(()=> pontos);
    })();
    
  }, []);



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
        {pontos.length > 0 ? 
            <Heatmap points={pontos} radius={30} gradient={{colors:['#BAEC2D', '#EC2D2D'], startPoints:[0,1]}} />
        
        :null}
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

        <View style={style.containerMain}>
          <View style={style.pnlControleBatimetria}>
            <View style={[style.pnlLegenda]}>
              <Text style={style.lblLegenda}>Legenda</Text>
              <Text style={style.lblProfundidade}>Profundidade</Text>
              <View style={style.pnlProfundidades}>
                <Text>{profundidades.minimo}m</Text>
                <Text>{profundidades.maximo}m</Text>
              </View>
              <LinearGradient
                // Background Linear Gradient
                end={[1,0]}
                start={[0,0]}
                colors={['#BAEC2D', '#EC2D2D']}
                style={style.pnlNivelProfundidade}
              />
            </View>
            <TouchableHighlight style={style.btnBatimentria} onPress={() =>{}}>
              <Text style={style.lblBatimetria}>Exportar</Text>
            </TouchableHighlight>
          </View>
        </View>
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Início" />
    </View>

  </View>
  )
}



export default Batimetria