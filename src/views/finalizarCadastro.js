import * as React from 'react';
import { useState } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';

import style from './css/cadastro';
import controller from './../controllers/finalizarCadastro';
import AsyncStorage from '@react-native-async-storage/async-storage';



function FinalizarCadastro({navigation}){

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erros, setErros] = useState("");

    return(
  <View style={[]}> 
    <View style={[style.main, style.centerAll]}> 

      <Text style={style.txtEntrar}>Se Identifique</Text>

      <Text style={style.lblInfo}>
        Esse processo nos ajuda a personalizar seu uso na plataforma.
      </Text>

      <TextInput style={style.txtPadrao} placeholder="Nome" onChangeText={setNome} autoComplete="name" keyboardType='name-phone-pad'></TextInput>
      
      <TextInput style={style.txtPadrao} placeholder="Telefone" onChangeText={setTelefone} autoComplete="tel" keyboardType='phone-pad' maxLength={14}></TextInput>

      <TouchableHighlight style={style.btnCadastrar}
        onPress={() => controller.atrelarNomeEmail(AsyncStorage, nome, telefone, navigation, setErros)}>
        <Text style={style.txtEntrarBtnCadastrar}>Finalizar Cadastro</Text>
      </TouchableHighlight>
      <Text style={[style.lblInfo, erros != "" ? style.lblErro : null]}>
        {erros}
      </Text>
    </View>

  </View>
  )
}



export default FinalizarCadastro