import * as React from 'react';
import { useState } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';

import style from './css/login'
import controller from './../controllers/login'

function Login({navigation}){

  const [erros, setErros] = useState("");
  const [email, onChangeEmail] = useState("");

    return(
  <View style={[]}> 
    <View style={[style.main, style.centerAll]}> 
      <Image
        style={style.logo}
        source={require("../../assets/logo.png")}
      />
      <Text style={style.txtEntrar}>Entrar</Text>
      <TextInput style={style.txtEmail} placeholder="email@email.com" autoComplete="email" keyboardType="email-address" onChangeText={onChangeEmail}></TextInput>
      <Text style={style.lblInfo}>
      Ao clicar em “Entrar” iremos te enviar um email na sua caixa de entrada com o código de confirmação para validar seu acesso a plataforma.
      </Text>

      <TouchableHighlight style={style.btnEntrar}
        onPress={() => controller.verificarEmail(email, navigation, setErros)}>
        <Text style={style.txtEntrarBtnEntrar}>Entrar</Text>
      </TouchableHighlight>
      <Text style={[style.lblInfo, erros != "" ? style.lblErro : null]}>
        {erros}
      </Text>
    </View>
    <View style={[style.recuperarConta, style.centerAll]}>
      <Text style={style.lblTemConta}>Já tem conta?</Text>
      <Text style={style.lblRecuperarConta}>Recupere Agora</Text>
    </View>
  </View>
  )
}



export default Login