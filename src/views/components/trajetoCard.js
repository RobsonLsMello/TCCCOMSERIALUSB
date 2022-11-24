import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import vars from '../css/vars';

export default function ResultadoCard(props) {
    var id_trajeto = props.id;
    return (
    <Pressable style={[styles.card, styles.colunas, id_trajeto == props.escolhido ? styles.btnEscolhido: null]} onPress={()=>{props.setarEscolhido(id_trajeto); ; props.setTrajetoSelecionado(props.trajeto); console.log(props.escolhido)}}>
      <View style={styles.pnlSimplificado}>
        <Text>Visualização</Text>
      </View>
      <View style={styles.pnlInfos}>
        <View style={styles.colunas}>
          <Text style={styles.lblSegundaInformacao}>{props.nome}</Text>
        </View>
        <View style={[styles.colunas, {marginTop: vars.height * (5/926)}]}>
          <Text style={styles.lblPrimeiraInformacao}>Vezes Utilizado: </Text>
          <Text style={styles.lblSegundaInformacao}>{props.vezes}</Text>
        </View>
        <Pressable style={styles.btnEditar} onPress={null}>
            <Text style={styles.lblEditar}>Editar</Text>
        </Pressable>
      </View>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  lblPrimeiraInformacao:{
    fontSize:vars.fontS
  },
  lblSegundaInformacao:{
    fontSize:vars.fontM
  },
  colunas:{
    flexWrap: 'wrap', 
    flexDirection:'row',  
  },
  btnEditar:{
    width: vars.width * (76/428),
    height: vars.height * (30/926),
    backgroundColor: vars.primaryColor,
    justifyContent:"center",
    alignItems: "center"
  },
  btnEscolhido:{
    borderColor: vars.primaryColor,
    borderWidth: 2
  },
  lblEditar:{
    color:vars.secondaryColor,
    fontSize: vars.fontM
  },
  card:{
    width: vars.width * (377/428),
    marginBottom: vars.height * (16/926),
    minHeight: vars.height * (86/926),
    backgroundColor: vars.secondaryColor,
    paddingHorizontal: vars.width * (8/428),
    paddingVertical: vars.height * (10/926),
    elevation: 4,    
    justifyContent:"space-between",
  },
  pnlSimplificado:{
    width: vars.width * (82/428),
    height: vars.height * (82/926),
    backgroundColor:"#C4C4C4"
  },
  pnlInfos:{
    width: vars.width * (273/428),

  },
});
