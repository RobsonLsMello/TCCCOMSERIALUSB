import * as React from 'react';
import { useState } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from './css/notificacao'
import Navbar from './components/navbar';
import NotificacaoOpcao from './components/notificacaoOpcao';

function Notificacao({navigation}){
    return(
  <View style={[]}> 
    <View style={[style.header]}> 
      <Text style={style.lblTitulo}>
        Notificações
      </Text>
    </View>
    <View style={[style.main, style.centerAll]}> 
      <View style={style.containerMain}>
        <Text style={style.lblDisclaimer}>
          Iremos enviar uma notificação no seu celular para indicar os status conforme for marcado abaixo:
        </Text>
        <NotificacaoOpcao nomeNotificacao="Inicio da Batimetria"/>
        <NotificacaoOpcao nomeNotificacao="Fim da Batimetria" estadoInicial = {true}/>
        <NotificacaoOpcao nomeNotificacao="Obstáculo no Trajeto"/>
      </View>
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Perfil" />
    </View>
  </View>
  )
}



export default Notificacao