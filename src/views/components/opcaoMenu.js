import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import vars from '../css/vars';
import AsyncStorage from '@react-native-async-storage/async-storage';

var limparAcesso = () =>{
  AsyncStorage.removeItem("@refreshToken")
  AsyncStorage.removeItem("@token")
  AsyncStorage.removeItem("@email")
}

export default function OpcaoMenu(props) {
  const nav = props.nav;
  const screen = props.screen;
  return (
    <TouchableHighlight style={styles.btnOpcao} onPress={() => {nav.navigate(screen); screen == "index" ? limparAcesso() : null}}>
      <View style={styles.pnlOpcao}>
        <Image style={styles.imgOpcao} source={props.imagem}/>
        <Text style={styles.lblOpcao}>{props.opcao}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({

  imgOpcao:{
    width:vars.width * (25/428),
    height:vars.height * (25/926),
    marginRight:vars.width * (20/428),
  },
  btnOpcao:{
    width:vars.width * (365/428),
    height:vars.height * (42/926),
    backgroundColor: vars.secondaryColor,
    justifyContent:"center",
    elevation: 5,
    paddingHorizontal:vars.width * (16/428),
    paddingVertical:vars.width * (8/428),
    marginBottom:vars.width * (28/428),
  },
  pnlOpcao:{
    flexWrap: 'wrap', 
    flexDirection:'row',  
  }
});
