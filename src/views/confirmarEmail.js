import * as React from 'react';
import { useState } from "react";
import { Text, View,TextInput, TouchableHighlight, Alert } from 'react-native';

import style from './css/cadastro'
import AsyncStorage from '@react-native-async-storage/async-storage';
import controller from './../controllers/confirmarEmail'


function ConfirmarEmail({route, navigation}){
  const [code, onChangeCode] = useState("");
  const [erros, setErros] = useState("");
  const {email, origin} = route.params == undefined ? {email:"", origin:""} : route.params;


    return(
  <View style={[]}> 
    <View style={[style.main, style.centerAll]}> 

      <Text style={style.txtEntrar}>Insira o código</Text>
      <Text style={style.lblInfo}>
        Insira o código que enviamos para o e-mail: {email}
      </Text>
      <View style={[]}>
        <TouchableHighlight style={style.btnReenviar}
          onPress={() => controller.reenviar(email, Alert.alert, origin)}>
          <Text style={style.txtReenviar}>Reenviar</Text>
        </TouchableHighlight>
      </View>
      
      <TextInput style={style.txtSms} placeholder="000000" maxLength={6} autoComplete='cc-number' keyboardType='number-pad' onChangeText={onChangeCode}></TextInput>
      
      <View style={[]}>
        <TouchableHighlight style={style.btnReenviar}
          onPress={() => navigation.goBack()}>
          <Text style={style.lblMudarContato}>Mudar Contato</Text>
        </TouchableHighlight>
      </View>

      <TouchableHighlight style={style.btnCadastrar}
        onPress={() => controller.confirmarEmail(email, code, setErros, navigation, origin, AsyncStorage)}>
        <Text style={style.txtEntrarBtnCadastrar}>Confirmar Código</Text>
      </TouchableHighlight>
      <Text style={[style.lblInfo, erros != "" ? style.lblErro : null]}>
        {erros}
      </Text>
    </View>

  </View>
  )
}



export default ConfirmarEmail