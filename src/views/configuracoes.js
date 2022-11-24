import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import style from './css/configuracoes'
import Navbar from './components/navbar';
import controller from './../controllers/finalizarCadastro';
import AsyncStorage from '@react-native-async-storage/async-storage';

let setarDados = async (setEmail, setTelefone, setNome) => {
  let email = await AsyncStorage.getItem("@email")
  let nome = await AsyncStorage.getItem("@nome")
  let telefone = await AsyncStorage.getItem("@telefone")
  setEmail(email);
  setTelefone(telefone);
  setNome(nome);
};

function Configuracao({navigation}){
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erros, setErros] = useState("");
  useEffect(() => {
    setarDados(setEmail, setTelefone, setNome);
  }, []);
  
    return(
  <View style={[]}> 
    <View style={[style.header]}> 
      <Text style={style.lblTitulo}>
        Configurações
      </Text>
    </View>
    <View style={[style.main, style.centerAll]}> 
      <View style={style.containerMain}>
        <Text style={style.lblSubTitulo}>Acesso</Text>
        <Text style={style.lblPropriedade}>Email</Text>
        <TextInput style={[style.txtPadrao,style.txtAcesso]} value={email} ></TextInput>
        <TouchableHighlight style={[style.btnAlterarDados, style.txtAcesso]}>
          <Text style={style.lblBtnAlterarDados}>Mudar Acesso</Text>
        </TouchableHighlight>

        <Text style={style.lblSubTitulo}>Dados Pessoais</Text>
        <Text style={style.lblPropriedade}>Nome</Text>
        <TextInput style={[style.txtPadrao,style.txtDadosPessoais]} onChangeText={setNome} defaultValue={nome}>
        </TextInput>
        <Text style={style.lblPropriedade}>Telefone</Text>
        <TextInput 
          style={[style.txtPadrao, style.txtDadosPessoais]}
          onChangeText={setTelefone}
          defaultValue={telefone}>
        </TextInput>
        <TouchableHighlight style={[style.btnAlterarDados, style.txtAcesso]} onPress={() => controller.atrelarNomeEmail(AsyncStorage, nome, telefone, navigation, setErros, false) ? Alert.alert("Sucesso", "Você atualizou seus dados com sucesso") : null}>
          <Text style={style.lblBtnAlterarDados}>Alterar Dados</Text>
        </TouchableHighlight>
        <Text style={[style.lblInfo, erros != "" ? style.lblErro : null]}>
        {erros}
      </Text>
      </View>
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Perfil" />
    </View>

  </View>
  )
}



export default Configuracao