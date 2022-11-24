import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import vars from '../css/vars';
import OpcaoNavbar from './opcaoNavbar';
export default function Navbar(props) {
  const nav = props.nav;
  const screen = props.screen;
  const orientation = props.orientation;
  return (
    <View style={orientation != 'landscape' ? styles.navbar : styles.navbarLandscape}>
      <OpcaoNavbar 
        image={screen == "Controle" ? require('../../../assets/menu/controle_active.png') : require('../../../assets/menu/controle.png')} 
        ativo={screen == "Controle"} 
        screen="controle"
        opcao="Controle"
        nav={nav}
        />
      <OpcaoNavbar 
        image={screen == "Início" ? require('../../../assets/menu/Casa_Active.png') : require('../../../assets/menu/Casa.png')} 
        ativo={screen == "Início"} 
        screen="main"
        opcao="Início"
        nav={nav}
        />
      <OpcaoNavbar 
        image={screen == "Dados" ? require('../../../assets/menu/Dados_Active.png') : require('../../../assets/menu/dados.png')} 
        ativo={screen == "Dados"} 
        opcao="Dados"
        screen="dados"
        nav={nav}
        />
      <OpcaoNavbar 
        image={screen == "Perfil" ? require('../../../assets/menu/Perfil_Active.png') : require('../../../assets/menu/perfil.png')} 
        ativo={screen == "Perfil"} 
        opcao="Perfil"
        screen="perfil"
        nav={nav}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar:{
    width: vars.width,
    height: vars.height * (60/926),
    backgroundColor: vars.secondaryColor,
    paddingHorizontal: vars.width * (28/428),
    paddingVertical: vars.height * (4/926),
    elevation: 14,
    flexWrap: 'wrap', 
    flexDirection:'row',
    justifyContent:'space-between'
  },
  navbarLandscape:{
    width: vars.height * (70/926),
    height: vars.width,
    backgroundColor: vars.secondaryColor,
    paddingHorizontal: vars.height * (4/926),
    paddingVertical: vars.width * (28/428),
    elevation: 14,
    flexWrap: 'wrap', 
    flexDirection:'column',
    justifyContent:'space-between',
    position: "absolute",
    bottom: 0 ,
    left: 0,

  },
});
