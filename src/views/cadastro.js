import * as React from 'react';
import { useState } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';

import style from './css/cadastro'
import controller from './../controllers/cadastrar'


function Cadastro({navigation}){

  const [email, onChangeEmail] = useState("");
  const [erros, setErros] = useState("");


    return(
  <View style={[]}> 
    <View style={[style.main, style.centerAll]}> 

      <Text style={style.txtEntrar}>Insira seu endereço de E-mail</Text>
      <TextInput style={style.txtPadrao} placeholder="email@email.com" onChangeText={onChangeEmail} autoComplete="email" keyboardType="email-address"></TextInput>
      <Text style={style.lblInfo}>
        Iremos te enviar um email na sua caixa de entrada com o código de confirmação. O seu endereço de email será utilizavél para entrar na plataforma do Deep Analytics.
      </Text>

      <TouchableHighlight style={style.btnCadastrar}
        onPress={() => controller.cadastrarEmail(email, navigation, setErros)}>
        <Text style={style.txtEntrarBtnCadastrar}>Continuar</Text>
      </TouchableHighlight>
      <Text style={[style.lblInfo, erros != "" ? style.lblErro : null]}>
        {erros}
      </Text>
    </View>

  </View>
  )
}



export default Cadastro