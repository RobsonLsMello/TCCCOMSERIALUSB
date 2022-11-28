import * as React from 'react';
import { useState, useEffect, Component  } from "react";
import { Text, View,Modal, Alert, Image, TouchableHighlight, BackHandler, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/main'
import DataCard from './components/dataCard';
import Navbar from './components/navbar';
import Plot from './components/plot';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heatmap } from 'react-native-maps';
import controller from './../controllers/batimetria'
import Plotly from 'react-native-plotly';

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
  const [coordenadas, setCoordenadas] = useState({});
  const [profundidades, setProfundidades] = useState({maximo: 0, minimo: 0});

  const [porcentagemBatimetria, setPorcentagemBatimetria] = useState(0);
  const layout = {mapbox: {style: 'light', center: {lat: 20}}, width: 600, height: 400}; 
  const config = {mapboxAccessToken: "pk.eyJ1Ijoicm9ic29ubHNtZWxsbyIsImEiOiJjamRheGs5dTkzbjYxMnFxcnY4Y2V2cjdpIn0.DpOln_BahHo_3c4lFKSQYQ"};
  const data = [
    {type: "densitymapbox", lon: [10, 20, 30], lat: [15, 25, 35], z: [1, 3, 2],
     radius: 50, colorbar: {y: 1, yanchor: 'top', len: 0.45}},
    {type: 'densitymapbox', lon: [-10, -20, -30], lat: [15, 25, 35],
     radius: [50, 100, 10],  colorbar: {y: 0, yanchor: 'bottom', len: 0.45}
    }];


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
      
      //let res = await controller.mostrarDeeps(AsyncStorage, "0fa87379-208d-46ae-bcc8-62feb74edc48")
      let res = await controller.mostrarDeeps(AsyncStorage, route.params.bathyId)
      let x = [];
      let y = [];
      let z = [];
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
        x.push(deep.coordinate.coordinates[1])
        y.push(deep.coordinate.coordinates[0])
        z.push(deep.value)
        return {
            "latitude": deep.coordinate.coordinates[1],
            "longitude": deep.coordinate.coordinates[0],
            "weight": deep.value
            }
        })
     
        let coordenadas = {
            "x": x,
            "y": y,
            "z": z,
            type: 'scatter',
        }
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
        setCoordenadas(()=>coordenadas);
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
      style={[style.map, {display:"none"}]} 
      showsUserLocation={true}
      region={region}
      onRegionChangeComplete={val =>{regiaoInicial = val}}
      //onRegionChange={val => {onRegionChange(val); console.log(val)}}
      
      >
        {/* {pontos.length > 0 ?  */ 1==0 ? 
            <Heatmap points={pontos} radius={30} gradient={{colors:['#BAEC2D', '#EC2D2D'], startPoints:[0,1]}} />
        
        :null}
      </MapView> 

        <View>
            {
                pontos.length > 0 ?
                <Plot dados={coordenadas} style={style.map}/>:
                <ActivityIndicator size="large" color="#654AB4" />
            }
            
        </View>
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="" />
    </View>

  </View>
  )
}



export default Batimetria