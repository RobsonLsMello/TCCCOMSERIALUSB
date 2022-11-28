import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import vars from '../css/vars';

export default function ResultadoCard(props) {
  return (
    <View style={[styles.card, styles.colunas]}>
      <View style={styles.pnlSimplificado}>
      <Image
        style={styles.pnlSimplificado}
        source={require("../../../assets/topographic.png")}

      />
      </View>
      <View style={styles.pnlInfos}>
        <View style={styles.colunas}>
          <Text style={styles.lblPrimeiraInformacao}>Leitura feita em: </Text>
          <Text style={styles.lblSegundaInformacao}>{props.data}</Text>
        </View>
        <View style={styles.colunas}>
          <Text style={styles.lblPrimeiraInformacao}>Tempo de Leitura: </Text>
          <Text style={styles.lblSegundaInformacao}>{props.tempo}</Text>
        </View>
        <Text style={styles.lblPrimeiraInformacao}>Local Realizado:</Text>
        <Text style={styles.lblSegundaInformacao}>{props.lugar}</Text>
      </View>
      
    </View>
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
  },
  pnlInfos:{
    width: vars.width * (273/428),

  },
});
