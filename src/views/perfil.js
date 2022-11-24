import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/perfil'
import Navbar from './components/navbar';
import DataCardFlex from './components/dataCardFlex';
import OpcaoMenu from './components/opcaoMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          <DataCardFlex valor="2" titulo="Batimetrias Feitas:"></DataCardFlex>
          <DataCardFlex valor="01/02/2022" titulo="Última Batimetria:"></DataCardFlex>
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