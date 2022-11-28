import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/perfil'
import Navbar from './components/navbar';
import DataCardFlex from './components/dataCardFlex';
import OpcaoMenu from './components/opcaoMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import controller from './../controllers/dados'

let setarDados = async (setNome) => {
  let nome = await AsyncStorage.getItem("@nome")
  setNome(nome);
};

function Perfil({navigation}){

  const [inBatimetria, setInBatimetria] = useState(false);
  const [nome, setNome] = useState("");
  const [batimetrias, setBatimetrias] = useState("");
  const [ultimaBatimetria, setUltimaBatimetria] = useState("");

  useEffect(() => {
    setarDados(setNome);
    (async ()=>{
      let bathys = await controller.mostrarBatimetrias(AsyncStorage);
      setBatimetrias(bathys.length);
      let datearr = bathys.map((o) => new Date(o.bathy.dateInit));
      let date = "";
      datearr.forEach((dia, index) =>{
        if(index == 0){
          date = dia;
        }else{
          if(Date.parse(dia) > Date.parse(date)){
            date = dia;
          }
        }
      })
      setUltimaBatimetria(`${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`)
      
    })()
  }, []);

  
    return(
  <View style={[]}> 
    <View style={[style.header]}> 
      <View style={style.pnlPerfil}>
        <Image
          style={style.imgPerfil}
          source={require("../../assets/menu/Perfil_Active.png")}
        />
      </View>
      <Text style={style.lblNomeUsuario}>
        {nome}
      </Text>
    </View>
    <View style={[style.main, style.centerAll]}> 
      <View style={style.containerMain}>
        <View style={style.pnlDados}>
          <DataCardFlex valor={batimetrias} titulo="Batimetrias Feitas:"></DataCardFlex>
          <DataCardFlex valor={ultimaBatimetria} titulo="Última Batimetria:"></DataCardFlex>
        </View>
        <OpcaoMenu opcao="Configurações" screen="configuracao" nav={navigation} imagem={require("../../assets/gear.png")}/>
        <OpcaoMenu opcao="Notificação" screen="notificacao" nav={navigation} imagem={require("../../assets/bell.png")}/>
        <OpcaoMenu opcao="Sair" screen="index" nav={navigation} imagem={require("../../assets/logout.png")}/>
      </View>
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Perfil" />
    </View>

  </View>
  )
}



export default Perfil