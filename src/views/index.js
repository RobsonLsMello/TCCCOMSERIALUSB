import * as React from 'react';
import { useState } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';

import style from './css/index'
import IndexLoginModal from './modal/indexLogin'

import AsyncStorage from '@react-native-async-storage/async-storage';

let recuperarAcesso = async (nav) => {
  let result = await AsyncStorage.getItem("@email")
  result != undefined ? nav.navigate("main") : null
};

function Tela({navigation}){

  const [isVar, setVar] = useState(false);
  recuperarAcesso(navigation)

    return(
  <View style={[]}> 
    <View style={[style.main, style.centerAll]}> 
      <Image
        style={style.logo}
        source={require("../../assets/logobranco.png")}
      />
      <Text style={style.logoMarca}>Deep Analytics</Text>
    </View>
    <TouchableHighlight style={[style.entrar,style.centerAll]}
      onPress={() => {console.log("clicado"); setVar(true)}}>
      <Text style={style.txtEntrar}>Iniciar</Text>
    </TouchableHighlight>

    <IndexLoginModal visibleModal={isVar} setModal={setVar} nav={navigation}></IndexLoginModal>
  </View>
  )
}



export default Tela