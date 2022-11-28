import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import vars from '../css/vars';

export default function DataCardFlex(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.lblTitulo}>{props.titulo}</Text>
      {props.valor != ""? 
      <Text style={styles.lblValor}>{props.valor}</Text>

      :<ActivityIndicator size="small" key="ActivityIndicatorBatrimetria" color="#FFF" />}
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    minWidth: vars.width * (135/428),
    marginBottom: vars.height * (24/926),
    minHeight: vars.height * (72/926),
    backgroundColor: vars.primaryColor,
    paddingHorizontal: vars.width * (12/428),
    paddingVertical: vars.height * (8/926),
    elevation: 14,
  },
  lblTitulo:{
    fontSize:vars.fontM,
    color:vars.secondaryColor,
  },
  lblValor:{
    fontSize:vars.fontXXL,
    color:vars.secondaryColor,
    fontWeight:"bold"
  }
});
