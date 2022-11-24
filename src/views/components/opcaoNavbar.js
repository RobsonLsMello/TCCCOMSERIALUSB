import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import vars from '../css/vars';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function opcaoNavbar(props) {
  const nav = props.nav;
  const screen = props.screen;
  var changeScreen = () =>{
    if(screen == "controle"){
      (async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
      })();
    }else{
      (async () => {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      })();
    }
    nav.navigate(screen);
  }
  return (
      <Pressable onPress={changeScreen}>
        <View style={styles.opcao}>
          <Image
            style={styles.imgOpcao}
            source={props.image}
          />
          <Text style={[styles.lblOpcao, props.ativo ? {color: vars.primaryColor} : null]}>{props.opcao}</Text>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  opcao:{
    alignItems:"center"
  },
  imgOpcao:{
    width: vars.height * (32/926),
    height: vars.height * (32/926),
  },
  lblOpcao:{
    color: "#929292",
    fontSize:vars.fontS,
    fontWeight:"bold"
  }
});
