import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, Alert, Image, TouchableHighlight } from 'react-native';
import style from './css/criarTrajeto'
import Navbar from './components/navbar';
import TrajetoCriado from './modal/trajetoCriado'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import controller from './../controllers/criarTrajeto'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main({navigation}){

  var regiao = {
    latitude: -23.9660408,
    longitude: -46.3041324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  }, []);


  if (errorMsg) {
    console.log(errorMsg);
  } else if (location) {
    regiao = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }
  const [inBatimetria, setInBatimetria] = useState(false);

  const [pontoIndex, changePontoIndex] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [markersCoordinates, setMarkersCoordinates] = useState([]);
  const [txtBtnCriarPonto, setTxtBtnCriarPonto] = useState("Colocar primeiro ponto");
  const nomesPonto = ["primeiro", "segundo", "terceiro", "quarto"];
  var setMarker = () =>{
    if(pontoIndex < 2){
      changePontoIndex(pontoIndex + 1);
      let marks = markers;    
      let marksCdnts = markersCoordinates;    
      marksCdnts.push(regiao);
      marks.push((
        <Marker
          coordinate={{ latitude: regiao.latitude, longitude: regiao.longitude}}
          image={require("../../assets/map64px.png")}
        />
      ));
      setMarkers(marks);
      setMarkersCoordinates(marksCdnts);
      pontoIndex + 1 < 2 ? setTxtBtnCriarPonto(`Colocar ${nomesPonto[pontoIndex+1]} ponto`) : setTxtBtnCriarPonto("Cadastrar Trajeto")
    }
    else{
      controller.criarTrajeto(markersCoordinates, navigation, AsyncStorage, Alert)
    }
  }
  var removeLastMarker = () =>{
    if(pontoIndex >= 0){
      changePontoIndex(pontoIndex - 1);
      let marks = markers;    
      let marksCdnts = markersCoordinates;    
      marks.pop();
      marksCdnts.pop();
      setMarkersCoordinates(marksCdnts);
      setMarkers(marks);
      pontoIndex -1 >= 0 ? setTxtBtnCriarPonto(`Colocar ${nomesPonto[pontoIndex-1]} ponto`) : null
    }
    
  }
    return(
  <View style={[]}> 
    <TrajetoCriado/>
    <View style={[style.header]}> 
      <View style={style.circle}></View>
      <Text style={style.lblAgora}>Agora</Text>
    </View>
    <View style={[style.main, style.centerAll]}> 
    
    <MapView 
      style={style.map} 
      region={regiao}
      onRegionChangeComplete={val =>{regiao = val}}
      > 
      {markers[0]}
      {markers[1]}
      {markers[2]}
      {markers[3]}
      </MapView>
      <View style={[style.containerMarker, style.map]}>
        <Image
            style={style.marker}
            source={require("../../assets/map.png")}
          />
      </View>
      <View>
        <TextInput 
          style={style.txtPesquisar} 
          placeholder="Ex: Porto de Santos"
          value="">
        </TextInput>
      </View>
      <Text style={style.disclaimerTrajeto}>
          Escolha dois pontos no mapa para fazer a batimetria, basta clicar no mapa 
      </Text>
      <View style={style.containerMain}>
        <View style={style.pnlControleBatimetria}>
          <TouchableHighlight style={[style.btnBatimentria, pontoIndex == 0 ? style.btnDisabled: null]} onPress={removeLastMarker}>
            <Text style={style.lblBatimetria}>Remover ponto atual</Text>
          </TouchableHighlight>
          <TouchableHighlight style={style.btnBatimentria} onPress={setMarker}>
            <Text style={style.lblBatimetria}>{txtBtnCriarPonto}</Text>
          </TouchableHighlight>
        </View>
        
      </View>

    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Dados" />
    </View>

  </View>
  )
}



export default Main